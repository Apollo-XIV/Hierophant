import * as server from '../entries/pages/posts/_blog_/_page.server.js';

export const index = 5;
export const component = async () => (await import('../entries/pages/posts/_blog_/_page.svelte.js')).default;
export const file = '_app/immutable/entry/posts-_blog_-page.svelte.ccce2bef.js';
export { server };
export const server_id = "src/routes/posts/[blog]/+page.server.js";
export const imports = ["_app/immutable/entry/posts-_blog_-page.svelte.ccce2bef.js","_app/immutable/chunks/index.f83ddb96.js","_app/immutable/chunks/index.f5fef78a.js"];
export const stylesheets = ["_app/immutable/assets/_page.8147fea7.css"];
export const fonts = [];
