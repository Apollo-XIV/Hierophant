import { g as getContext, c as create_ssr_component, a as subscribe, v as validate_component, m as missing_component, b as each, d as spread, f as escape_object, i as is_void, e as escape, s as setContext } from "../../../../chunks/index2.js";
import { w as writable } from "../../../../chunks/index.js";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
const componentsContextKey = {};
const getComponentsContext = () => getContext(componentsContextKey);
const createComponentsContextValue = (init) => {
  const { set, subscribe: subscribe2 } = writable(init);
  return { set, subscribe: subscribe2 };
};
const Renderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $components, $$unsubscribe_components;
  let { astNode } = $$props;
  let { __index = 0 } = $$props;
  let { type = void 0 } = $$props;
  let { position = void 0 } = $$props;
  const components = getComponentsContext();
  $$unsubscribe_components = subscribe(components, (value) => $components = value);
  if ($$props.astNode === void 0 && $$bindings.astNode && astNode !== void 0)
    $$bindings.astNode(astNode);
  if ($$props.__index === void 0 && $$bindings.__index && __index !== void 0)
    $$bindings.__index(__index);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  $$unsubscribe_components();
  return `${astNode.type === "root" ? `${validate_component(Children, "Children").$$render($$result, Object.assign({}, astNode), {}, {})}` : `${astNode.type === "element" ? `${validate_component($components[astNode.tagName] || missing_component, "svelte:component").$$render($$result, Object.assign({}, astNode, { __index }), {}, {})}` : `${$components[astNode.type] !== void 0 ? `${validate_component($components[astNode.type] || missing_component, "svelte:component").$$render($$result, Object.assign({}, astNode, { __index }), {}, {})}` : ``}`}`}`;
});
const Children = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { children } = $$props;
  let { type = void 0 } = $$props;
  let { position = void 0 } = $$props;
  let { __index = void 0 } = $$props;
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.__index === void 0 && $$bindings.__index && __index !== void 0)
    $$bindings.__index(__index);
  return `${each(children, (child, __index2) => {
    return `${validate_component(Renderer, "Renderer").$$render($$result, { astNode: child, __index: __index2 }, {}, {})}`;
  })}`;
});
const Default = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tagName } = $$props;
  let { children } = $$props;
  let { properties } = $$props;
  let { type = void 0 } = $$props;
  let { position = void 0 } = $$props;
  let { __index = void 0 } = $$props;
  if ($$props.tagName === void 0 && $$bindings.tagName && tagName !== void 0)
    $$bindings.tagName(tagName);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.properties === void 0 && $$bindings.properties && properties !== void 0)
    $$bindings.properties(properties);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.__index === void 0 && $$bindings.__index && __index !== void 0)
    $$bindings.__index(__index);
  return `${Array.isArray(children) && children.length !== 0 ? `
	${((tag) => {
    return tag ? `<${tagName}${spread([escape_object(properties)], {})}>${is_void(tag) ? "" : `${validate_component(Children, "Children").$$render($$result, { children }, {}, {})}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(tagName)}` : `
	${((tag) => {
    return tag ? `<${tagName}${spread([escape_object(properties)], {})}>${is_void(tag) ? "" : ``}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(tagName)}`}`;
});
const defaultTags = [
  // Content sectioning
  "address",
  "article",
  "aside",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "main",
  "nav",
  "section",
  // Text content
  "blockquote",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "hr",
  "li",
  "menu",
  "ol",
  "p",
  "pre",
  "ul",
  // Inline text semantics
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "br",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "kbd",
  "mark",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr",
  // Image and multimedia
  "area",
  "audio",
  "img",
  "map",
  "track",
  "video",
  // Embedded content
  "embed",
  "iframe",
  "object",
  "param",
  "picture",
  "portal",
  "source",
  // SVG and MathML
  "svg",
  "math",
  // Demarcating edits
  "del",
  "ins",
  // Table content
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  // Forms
  "button",
  "datalist",
  "fieldset",
  "form",
  "input",
  "label",
  "legend",
  "meter",
  "optgroup",
  "option",
  "output",
  "progress",
  "select",
  "textarea",
  // Interactive elements
  "details",
  "dialog",
  "summary"
];
const htmlComponents = defaultTags.reduce((acc, tag) => ({ ...acc, [tag]: Default }), {});
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  let { type = void 0 } = $$props;
  let { position = void 0 } = $$props;
  let { __index = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.__index === void 0 && $$bindings.__index && __index !== void 0)
    $$bindings.__index(__index);
  return `${escape(value)}`;
});
const defaultComponents = {
  ...htmlComponents,
  text: Text,
  raw: Text
};
const nonNullable = (value) => value != null;
const transform = (node) => {
  if (node.type !== "element" || node.properties === void 0 || !Array.isArray(node.properties.className))
    return;
  node.properties.class = node.properties.className.join(" ");
  delete node.properties.className;
};
const visit = (visitor, node) => {
  visitor(node);
  if (node.type === "comemnt" || node.type === "doctype" || node.type === "text")
    return;
  node.children?.forEach((child) => visit(visitor, child));
};
const rehypeReactClassNameToSvelteClass = () => {
  return (node, _file, done) => {
    try {
      visit(transform, node);
      done();
    } catch (e) {
      if (e instanceof Error)
        return done(e);
      return done(new Error(String(e)));
    }
  };
};
const createParser = (plugins) => {
  const processor = unified().use(remarkParse).use(plugins.map((plugin) => plugin.remarkPlugin).filter(nonNullable)).use(remarkRehype, { allowDangerousHtml: true }).use(plugins.map((plugin) => plugin.rehypePlugin).filter(nonNullable)).use(rehypeReactClassNameToSvelteClass);
  return (md) => processor.runSync(processor.parse(md), md);
};
const ExtensibleSvelteMarkdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { md } = $$props;
  let { plugins = [] } = $$props;
  let parse;
  const componentsContextValue = createComponentsContextValue({});
  setContext(componentsContextKey, componentsContextValue);
  let result;
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  parse = createParser(plugins);
  {
    componentsContextValue.set({
      ...defaultComponents,
      ...plugins.map((plugin) => plugin.renderer).filter(nonNullable).reduce((acc, cur) => ({ ...acc, ...cur }), {})
    });
  }
  result = parse(md);
  return `${validate_component(Renderer, "Renderer").$$render($$result, { astNode: result }, {}, {})}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.cdnfonts.com/css/futura-std-4');@import url('https://fonts.cdnfonts.com/css/ibm-plex-sans-kr');@import url('https://fonts.cdnfonts.com/css/monosphere-personal-use');.content-styling.svelte-hak5xo{color:white;padding-left:300px;padding-right:300px}.content-styling.svelte-hak5xo p{font-family:'Futura Std'}.content-styling.svelte-hak5xo h1{font-family:'Monosphere Personal Use';text-align:center;padding-top:100px}.content-styling.svelte-hak5xo h2,h3,h4{font-family:'IBM Plex Sans Kr'}.content-styling.svelte-hak5xo img{max-width:100%;max-height:50vh;margin-left:auto;margin-right:auto;align-self:center;display:block;border-radius:30px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let md = data.content;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="content-styling svelte-hak5xo">${validate_component(ExtensibleSvelteMarkdown, "Markdown").$$render($$result, { md }, {}, {})}
</div>`;
});
export {
  Page as default
};
