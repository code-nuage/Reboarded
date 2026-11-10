import Mustache from "mustache";

import template_view_not_found from "../../templates/views/not_found.html?raw";

import { ComponentHeader } from "../components/header.ts";
import { ComponentNotFound } from "../components/not_found.ts";
import { ComponentFooter } from "../components/footer.ts";

export class ViewNotFound {
	render() {
		const header = new ComponentHeader().render();
		const not_found  = new ComponentNotFound().render();
		const footer = new ComponentFooter().render();
		
    return Mustache.render(template_view_not_found, {
    	header: header,
    	not_found: not_found,
    	footer: footer
    });
  }
}
