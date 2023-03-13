export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Logo.png","Logofaint.png","bgimage.png","demo2.md","demoblog.md","favicon.png"]),
	mimeTypes: {".png":"image/png",".md":"text/markdown"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.c456be7e.js","imports":["_app/immutable/entry/start.c456be7e.js","_app/immutable/chunks/index.f83ddb96.js","_app/immutable/chunks/singletons.5516ebc3.js","_app/immutable/chunks/index.f5fef78a.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.8e2d3b0d.js","imports":["_app/immutable/entry/app.8e2d3b0d.js","_app/immutable/chunks/index.f83ddb96.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/posts",
				pattern: /^\/posts\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/posts/[blog]",
				pattern: /^\/posts\/([^/]+?)\/?$/,
				params: [{"name":"blog","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export const prerendered = new Set([]);
