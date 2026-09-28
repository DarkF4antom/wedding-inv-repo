import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.fjzOQfnn.js","_app/immutable/chunks/mKwaQThb.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BUrXVp72.js"];
export const stylesheets = ["_app/immutable/assets/0.Cd2Cspym.css"];
export const fonts = [];
