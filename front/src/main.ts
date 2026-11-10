import { Router } from "./router";

import { ControllerHome } from "./scripts/controllers/home.ts";
import { ControllerNotFound } from "./scripts/controllers/not_found.ts";

import "./assets/styles/simpliestui.css";
import "./assets/styles/main.css";

new Router("Reboarded")
  .route("/", "Reboarded • Home", () => new ControllerHome())
  .route_not_found("Reboarded • 404", () => new ControllerNotFound())
  .start();
