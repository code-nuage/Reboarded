export type Params = Record<string, string>

export interface Controller {
  render(params: Params): string | Promise<string>
  mount?(root: HTMLElement, params: Params): void | Promise<void>
  unmount?(): void
}

type ControllerFactory = () => Controller

interface Route {
  pattern: RegExp
  title: string
  keys: string[]
  factory: ControllerFactory
}

export class Router {
  private routes: Route[] = [];
  private title: string;
  private not_found: ControllerFactory;
  private not_found_title: string;
  private current: Controller | null = null;
  private renderId = 0;

  constructor(title: string) {
    this.title = title;
  }

  route(path: string, title: string, factory: ControllerFactory): this {
    const keys: string[] = [];
    const pattern = new RegExp(
      '^' + path.replace(/:(\w+)/g, (_, key) => {
        keys.push(key)
        return '([^/]+)'
      }) + '$'
    );
    this.routes.push({ pattern, title, keys, factory });
    return this;
  }

  route_not_found(title: string, factory: ControllerFactory): this {
    this.not_found_title = title;
    this.not_found = factory;
    return this;
  }

  async render() {
    const id = ++this.renderId;
    const app = document.querySelector<HTMLElement>('#app')!;

    this.current?.unmount?.();
    this.current = null;

    for (const r of this.routes) {
      const match = location.pathname.match(r.pattern);
      if (!match) continue;

      const params: Params = Object.fromEntries(
        r.keys.map((k, i) => [k, decodeURIComponent(match[i + 1])])
      );
      const controller = r.factory();
      const html = await controller.render(params);
      const title = r.title;
      if (id !== this.renderId) return;

      document.title = title ? title : this.title;
      app.innerHTML = html;
      this.current = controller;
      await controller.mount?.(app, params);
      return;
    }

    const controller = this.not_found ? this.not_found() : null;
    const html = controller ? await controller.render() : "<h1>404</h1>";
    const title = this.not_found_title ? this.not_found_title : "404";

    document.title = title;
    app.innerHTML = html;
  }

  navigate(path: string) {
    history.pushState({}, '', path);
    this.render();
  }

  start() {
    document.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('a[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href')!);
      }
    })

    window.addEventListener('popstate', () => this.render());
    this.render();
  }
}
