import type { Controller, Params } from '../router'

export abstract class BaseController implements Controller {
  protected root!: HTMLElement
  private abort = new AbortController()

  protected get signal() {
    return this.abort.signal
  }

  abstract render(params: Params): string | Promise<string>

  async mount(root: HTMLElement, params: Params) {
    this.root = root
    await this.onMount(params)
  }

  unmount() {
    this.abort.abort()
    this.onUnmount()
  }

  protected onMount(_params: Params): void | Promise<void> {}
  protected onUnmount(): void {}

  protected $<T extends HTMLElement>(selector: string): T {
    return this.root.querySelector<T>(selector)!
  }

  protected on<K extends keyof HTMLElementEventMap>(
    type: K,
    selector: string,
    handler: (e: HTMLElementEventMap[K], target: HTMLElement) => void
  ) {
    this.root.addEventListener(
      type,
      (e) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>(selector)
        if (target && this.root.contains(target)) handler(e as HTMLElementEventMap[K], target)
      },
      { signal: this.abort.signal }
    )
  }
}
