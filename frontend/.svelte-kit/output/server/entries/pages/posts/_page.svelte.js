import { c as create_ssr_component, b as each, e as escape } from "../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.cdnfonts.com/css/futura-std-4');@import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');@import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');body{color:white}.posts.svelte-1biujmq.svelte-1biujmq{padding-left:300px;padding-right:300px}.post.svelte-1biujmq.svelte-1biujmq{background-color:transparent;padding:10px}h1.svelte-1biujmq.svelte-1biujmq{text-align:center;font-family:'Monosphere Personal Use';padding-top:50px}.post.svelte-1biujmq h2.svelte-1biujmq,a.svelte-1biujmq.svelte-1biujmq{font-family:'IBM Plex Sans Kr';text-decoration:none;color:white}.post.svelte-1biujmq.svelte-1biujmq:hover{background-color:rgba(255, 255, 255, 0.073)}p.svelte-1biujmq.svelte-1biujmq{font-family:'Futura Std';margin-top:-20px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<h1 class="svelte-1biujmq">Posts</h1>
<div class="posts svelte-1biujmq">${each(data.summaries, ({ slug, title, abstract }) => {
    return `<div class="post svelte-1biujmq"><h2 class="svelte-1biujmq"><a href="${"posts/" + escape(slug, true)}" class="svelte-1biujmq">${escape(title)}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"></path><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"></path></svg></a></h2>
        <p class="svelte-1biujmq">${escape(abstract)}</p>
    </div>`;
  })}
</div>`;
});
export {
  Page as default
};
