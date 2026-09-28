import { c as slot, o as head } from "../../chunks/server.js";
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	head("12qhfyh", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Krishna &amp; Nidhun — Wedding Invitation</title>`);
		});
		$$renderer.push(`<meta name="description" content="Wedding invitation for Krishna and Nidhun — 12 December 2026."/> <meta name="theme-color" content="#f5ead8"/>`);
	});
	$$renderer.push(`<!--[-->`);
	slot($$renderer, $$props, "default", {}, null);
	$$renderer.push(`<!--]-->`);
}
//#endregion
export { _layout as default };
