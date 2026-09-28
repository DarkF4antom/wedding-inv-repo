export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","images/floral.png","images/ganapathi.png","music/PUT-MUSIC-HERE.txt"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.D5hzHt_8.js",app:"_app/immutable/entry/app.C3k5jl8m.js",imports:["_app/immutable/entry/start.D5hzHt_8.js","_app/immutable/chunks/D0jfVvBF.js","_app/immutable/chunks/mKwaQThb.js","_app/immutable/entry/app.C3k5jl8m.js","_app/immutable/chunks/mKwaQThb.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
