import Mustache from "mustache";

import template_view_home from "../../templates/views/home.html?raw";

import { ComponentHeader } from "../components/header.ts";
import { ComponentHero } from "../components/hero.ts";
import { ComponentFooter } from "../components/footer.ts";

export class ViewHome {
	render() {
		const header = new ComponentHeader().render();
		const hero = new ComponentHero().render();
		const footer = new ComponentFooter().render();
		
    return Mustache.render(template_view_home, {
    	header: header,
    	hero: hero,
    	footer: footer
    });
  }
}
