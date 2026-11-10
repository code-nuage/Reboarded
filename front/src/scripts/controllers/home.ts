import { BaseController } from "./base.ts";

import { ViewHome } from "../views/home.ts";

export class ControllerHome implements BaseController {
  render() {
    const view = new ViewHome();
    
    return view.render();
  }
}
