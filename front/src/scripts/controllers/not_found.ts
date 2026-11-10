import { BaseController } from "./base.ts";

import { ViewNotFound } from "../views/not_found.ts";

export class ControllerNotFound implements BaseController {
  render() {
    const view = new ViewNotFound();

    return view.render();
  }
}
