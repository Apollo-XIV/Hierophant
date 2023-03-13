import { c as create_ssr_component, v as validate_component } from "../../chunks/index2.js";
const header_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "@import url('https://fonts.cdnfonts.com/css/grozery');@import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');ul#menu.svelte-19jf35t.svelte-19jf35t{background-color:black;padding:10px;margin:0;padding-left:50px}ul#menu.svelte-19jf35t li.svelte-19jf35t{display:inline;padding:10px;height:100%}ul#menu.svelte-19jf35t a.svelte-19jf35t{color:white;text-decoration:none;transition:ease-in-out 200ms}ul#menu.svelte-19jf35t a.svelte-19jf35t:hover{opacity:0.6;transform:translate(300px, 0)}ul#menu.svelte-19jf35t li:not(#logo) a.svelte-19jf35t{font-family:'Monosphere Personal Use', sans-serif;font-size:large;transform:translate(-50px 50px)}header.svelte-19jf35t.svelte-19jf35t{position:fixed;top:0;width:100%}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<header class="svelte-19jf35t"><nav><ul id="menu" class="svelte-19jf35t"><li style="font-family: 'Grozery', 'D050000L'; font-size: 20px; margin-right: 10px;" id="logo" class="svelte-19jf35t"><a href="/" class="svelte-19jf35t">Hierophant</a></li>
            <li class="svelte-19jf35t"><a href="/" class="svelte-19jf35t">About</a></li>
            <li class="svelte-19jf35t"><a href="/posts" class="svelte-19jf35t">Posts</a></li></ul></nav>
</header>`;
});
const footer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "@import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');@import url('https://fonts.cdnfonts.com/css/futura-std-4');body{background-color:black}footer.svelte-1hhz7up{font-family:'Monosphere Personal Use';background-color:rgb(223, 223, 223);text-align:center;color:grey;padding:10px;height:100px}a.svelte-1hhz7up{text-decoration:none;color:rgb(66, 66, 66);font-size:small;transform:translate(20px,0px);font-family:'Futura Std'}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<footer class="svelte-1hhz7up"><p>End of Page</p>
    <a href="#top" class="svelte-1hhz7up">return to top 🡹</a>
</footer>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "body{margin:0;margin-top:50px;padding:0}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

<main>${slots.default ? slots.default({}) : ``}</main>
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
