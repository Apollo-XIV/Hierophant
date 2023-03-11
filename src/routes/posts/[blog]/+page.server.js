import { sveltekit } from "@sveltejs/kit/vite";

export const load = async ({fetch, params}) => {
    let res = await fetch('/demoblog.md');
    let content = await res.text();
    return {content};
}
