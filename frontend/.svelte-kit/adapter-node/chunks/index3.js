import fs, { existsSync, readFileSync, writeFileSync } from "node:fs";
import path, { join, dirname } from "node:path";
import "@sveltejs/vite-plugin-svelte";
import colors from "kleur";
import "vite";
import * as url from "node:url";
import { fileURLToPath, pathToFileURL } from "node:url";
import "mime";
import "magic-string";
import "sirv";
import { r as resolve, o as get_route_segments, p as decode_uri, q as is_root_relative, a as escape_html_attr, l as validate_server_exports, v as validate_common_exports, k as validate_page_server_exports, g as get_option } from "./exports.js";
import { ReadableStream, TransformStream, WritableStream } from "node:stream/web";
import buffer from "node:buffer";
import { webcrypto } from "node:crypto";
import { File as File$1, fetch, Response, Request as Request$1, Headers, FormData } from "undici";
import child_process from "node:child_process";
function mkdirp(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    if (e.code === "EEXIST") {
      if (!fs.statSync(dir).isDirectory()) {
        throw new Error(`Cannot create directory ${dir}, a file already exists at this position`);
      }
      return;
    }
    throw e;
  }
}
function walk(cwd, dirs = false) {
  const all_files = [];
  function walk_dir(dir) {
    const files = fs.readdirSync(path.join(cwd, dir));
    for (const file of files) {
      const joined = path.join(dir, file);
      const stats = fs.statSync(path.join(cwd, joined));
      if (stats.isDirectory()) {
        if (dirs)
          all_files.push(joined);
        walk_dir(joined);
      } else {
        all_files.push(joined);
      }
    }
  }
  return walk_dir(""), all_files;
}
function posixify(str) {
  return str.replace(/\\/g, "/");
}
function to_fs(str) {
  str = posixify(str);
  return `/@fs${// Windows/Linux separation - Windows starts with a drive letter, we need a / in front there
  str.startsWith("/") ? "" : "/"}${str}`;
}
const runtime_directory = posixify(fileURLToPath(new URL("../runtime", import.meta.url)));
runtime_directory.startsWith(process.cwd()) ? `/${path.relative(".", runtime_directory)}` : to_fs(runtime_directory);
function noop() {
}
function logger({ verbose }) {
  const log = (msg) => console.log(msg.replace(/^/gm, "  "));
  const err = (msg) => console.error(msg.replace(/^/gm, "  "));
  log.success = (msg) => log(colors.green(`✔ ${msg}`));
  log.error = (msg) => err(colors.bold().red(msg));
  log.warn = (msg) => log(colors.bold().yellow(msg));
  log.minor = verbose ? (msg) => log(colors.grey(msg)) : noop;
  log.info = verbose ? log : noop;
  return log;
}
let ts = void 0;
try {
  ts = (await import("typescript")).default;
} catch {
}
process.cwd();
fileURLToPath(new URL("../../../types/synthetic", import.meta.url));
const directives = object({
  "child-src": string_array(),
  "default-src": string_array(),
  "frame-src": string_array(),
  "worker-src": string_array(),
  "connect-src": string_array(),
  "font-src": string_array(),
  "img-src": string_array(),
  "manifest-src": string_array(),
  "media-src": string_array(),
  "object-src": string_array(),
  "prefetch-src": string_array(),
  "script-src": string_array(),
  "script-src-elem": string_array(),
  "script-src-attr": string_array(),
  "style-src": string_array(),
  "style-src-elem": string_array(),
  "style-src-attr": string_array(),
  "base-uri": string_array(),
  sandbox: string_array(),
  "form-action": string_array(),
  "frame-ancestors": string_array(),
  "navigate-to": string_array(),
  "report-uri": string_array(),
  "report-to": string_array(),
  "require-trusted-types-for": string_array(),
  "trusted-types": string_array(),
  "upgrade-insecure-requests": boolean(false),
  "require-sri-for": string_array(),
  "block-all-mixed-content": boolean(false),
  "plugin-types": string_array(),
  referrer: string_array()
});
const options = object(
  {
    extensions: validate([".svelte"], (input, keypath) => {
      if (!Array.isArray(input) || !input.every((page) => typeof page === "string")) {
        throw new Error(`${keypath} must be an array of strings`);
      }
      input.forEach((extension) => {
        if (extension[0] !== ".") {
          throw new Error(`Each member of ${keypath} must start with '.' — saw '${extension}'`);
        }
        if (!/^(\.[a-z0-9]+)+$/i.test(extension)) {
          throw new Error(`File extensions must be alphanumeric — saw '${extension}'`);
        }
      });
      return input;
    }),
    kit: object({
      adapter: validate(null, (input, keypath) => {
        if (typeof input !== "object" || !input.adapt) {
          let message = `${keypath} should be an object with an "adapt" method`;
          if (Array.isArray(input) || typeof input === "string") {
            message += ", rather than the name of an adapter";
          }
          throw new Error(`${message}. See https://kit.svelte.dev/docs/adapters`);
        }
        return input;
      }),
      alias: validate({}, (input, keypath) => {
        if (typeof input !== "object") {
          throw new Error(`${keypath} should be an object`);
        }
        for (const key in input) {
          assert_string(input[key], `${keypath}.${key}`);
        }
        return input;
      }),
      appDir: validate("_app", (input, keypath) => {
        assert_string(input, keypath);
        if (input) {
          if (input.startsWith("/") || input.endsWith("/")) {
            throw new Error(
              "config.kit.appDir cannot start or end with '/'. See https://kit.svelte.dev/docs/configuration"
            );
          }
        } else {
          throw new Error(`${keypath} cannot be empty`);
        }
        return input;
      }),
      csp: object({
        mode: list(["auto", "hash", "nonce"]),
        directives,
        reportOnly: directives
      }),
      csrf: object({
        checkOrigin: boolean(true)
      }),
      embedded: boolean(false),
      env: object({
        dir: string(process.cwd()),
        publicPrefix: string("PUBLIC_")
      }),
      files: object({
        assets: string("static"),
        hooks: object({
          client: string(join("src", "hooks.client")),
          server: string(join("src", "hooks.server"))
        }),
        lib: string(join("src", "lib")),
        params: string(join("src", "params")),
        routes: string(join("src", "routes")),
        serviceWorker: string(join("src", "service-worker")),
        appTemplate: string(join("src", "app.html")),
        errorTemplate: string(join("src", "error.html"))
      }),
      inlineStyleThreshold: number(0),
      moduleExtensions: string_array([".js", ".ts"]),
      outDir: string(".svelte-kit"),
      output: object({
        preloadStrategy: list(["modulepreload", "preload-js", "preload-mjs"], "modulepreload")
      }),
      paths: object({
        base: validate("", (input, keypath) => {
          assert_string(input, keypath);
          if (input !== "" && (input.endsWith("/") || !input.startsWith("/"))) {
            throw new Error(
              `${keypath} option must either be the empty string or a root-relative path that starts but doesn't end with '/'. See https://kit.svelte.dev/docs/configuration#paths`
            );
          }
          return input;
        }),
        assets: validate("", (input, keypath) => {
          assert_string(input, keypath);
          if (input) {
            if (!/^[a-z]+:\/\//.test(input)) {
              throw new Error(
                `${keypath} option must be an absolute path, if specified. See https://kit.svelte.dev/docs/configuration#paths`
              );
            }
            if (input.endsWith("/")) {
              throw new Error(
                `${keypath} option must not end with '/'. See https://kit.svelte.dev/docs/configuration#paths`
              );
            }
          }
          return input;
        }),
        relative: validate(void 0, (input, keypath) => {
          if (typeof input !== "boolean") {
            throw new Error(`${keypath} option must be a boolean or undefined`);
          }
          return input;
        })
      }),
      prerender: object({
        concurrency: number(1),
        crawl: boolean(true),
        entries: validate(["*"], (input, keypath) => {
          if (!Array.isArray(input) || !input.every((page) => typeof page === "string")) {
            throw new Error(`${keypath} must be an array of strings`);
          }
          input.forEach((page) => {
            if (page !== "*" && page[0] !== "/") {
              throw new Error(
                `Each member of ${keypath} must be either '*' or an absolute path beginning with '/' — saw '${page}'`
              );
            }
          });
          return input;
        }),
        handleHttpError: validate("fail", (input, keypath) => {
          if (typeof input === "function")
            return input;
          if (["fail", "warn", "ignore"].includes(input))
            return input;
          throw new Error(`${keypath} should be "fail", "warn", "ignore" or a custom function`);
        }),
        handleMissingId: validate("fail", (input, keypath) => {
          if (typeof input === "function")
            return input;
          if (["fail", "warn", "ignore"].includes(input))
            return input;
          throw new Error(`${keypath} should be "fail", "warn", "ignore" or a custom function`);
        }),
        origin: validate("http://sveltekit-prerender", (input, keypath) => {
          assert_string(input, keypath);
          let origin;
          try {
            origin = new URL(input).origin;
          } catch (e) {
            throw new Error(`${keypath} must be a valid origin`);
          }
          if (input !== origin) {
            throw new Error(`${keypath} must be a valid origin (${origin} rather than ${input})`);
          }
          return origin;
        })
      }),
      serviceWorker: object({
        register: boolean(true),
        files: fun((filename) => !/\.DS_Store/.test(filename))
      }),
      typescript: object({
        config: fun((config) => config)
      }),
      version: object({
        name: string(Date.now().toString()),
        pollInterval: number(0)
      })
    })
  },
  true
);
function object(children, allow_unknown = false) {
  return (input, keypath) => {
    const output = {};
    if (input && typeof input !== "object" || Array.isArray(input)) {
      throw new Error(`${keypath} should be an object`);
    }
    for (const key in input) {
      if (!(key in children)) {
        if (allow_unknown) {
          output[key] = input[key];
        } else {
          let message = `Unexpected option ${keypath}.${key}`;
          if (keypath === "config.kit" && key in options) {
            message += ` (did you mean config.${key}?)`;
          }
          throw new Error(message);
        }
      }
    }
    for (const key in children) {
      const validator = children[key];
      output[key] = validator(input && input[key], `${keypath}.${key}`);
    }
    return output;
  };
}
function validate(fallback, fn) {
  return (input, keypath) => {
    return input === void 0 ? fallback : fn(input, keypath);
  };
}
function string(fallback, allow_empty = true) {
  return validate(fallback, (input, keypath) => {
    assert_string(input, keypath);
    if (!allow_empty && input === "") {
      throw new Error(`${keypath} cannot be empty`);
    }
    return input;
  });
}
function string_array(fallback) {
  return validate(fallback, (input, keypath) => {
    if (!Array.isArray(input) || input.some((value) => typeof value !== "string")) {
      throw new Error(`${keypath} must be an array of strings, if specified`);
    }
    return input;
  });
}
function number(fallback) {
  return validate(fallback, (input, keypath) => {
    if (typeof input !== "number") {
      throw new Error(`${keypath} should be a number, if specified`);
    }
    return input;
  });
}
function boolean(fallback) {
  return validate(fallback, (input, keypath) => {
    if (typeof input !== "boolean") {
      throw new Error(`${keypath} should be true or false, if specified`);
    }
    return input;
  });
}
function list(options2, fallback = options2[0]) {
  return validate(fallback, (input, keypath) => {
    if (!options2.includes(input)) {
      const msg = options2.length > 2 ? `${keypath} should be one of ${options2.slice(0, -1).map((input2) => `"${input2}"`).join(", ")} or "${options2[options2.length - 1]}"` : `${keypath} should be either "${options2[0]}" or "${options2[1]}"`;
      throw new Error(msg);
    }
    return input;
  });
}
function fun(fallback) {
  return validate(fallback, (input, keypath) => {
    if (typeof input !== "function") {
      throw new Error(`${keypath} should be a function, if specified`);
    }
    return input;
  });
}
function assert_string(input, keypath) {
  if (typeof input !== "string") {
    throw new Error(`${keypath} should be a string, if specified`);
  }
}
async function load_config({ cwd = process.cwd() } = {}) {
  const config_file = path.join(cwd, "svelte.config.js");
  if (!fs.existsSync(config_file)) {
    return process_config({}, { cwd });
  }
  const config = await import(`${url.pathToFileURL(config_file).href}?ts=${Date.now()}`);
  return process_config(config.default, { cwd });
}
function process_config(config, { cwd = process.cwd() } = {}) {
  const validated = validate_config(config);
  validated.kit.outDir = path.resolve(cwd, validated.kit.outDir);
  for (const key in validated.kit.files) {
    if (key === "hooks") {
      validated.kit.files.hooks.client = path.resolve(cwd, validated.kit.files.hooks.client);
      validated.kit.files.hooks.server = path.resolve(cwd, validated.kit.files.hooks.server);
    } else {
      validated.kit.files[key] = path.resolve(cwd, validated.kit.files[key]);
    }
  }
  return validated;
}
function validate_config(config) {
  if (typeof config !== "object") {
    throw new Error(
      "svelte.config.js must have a configuration object as its default export. See https://kit.svelte.dev/docs/configuration"
    );
  }
  return options(config, "config");
}
const File = buffer.File ?? File$1;
const globals = {
  crypto: webcrypto,
  fetch,
  Response,
  Request: Request$1,
  Headers,
  ReadableStream,
  TransformStream,
  WritableStream,
  FormData,
  File
};
function installPolyfills() {
  for (const name in globals) {
    Object.defineProperty(globalThis, name, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: globals[name]
    });
  }
}
const should_polyfill = typeof Deno === "undefined" && typeof Bun === "undefined";
process.cwd();
function queue(concurrency) {
  const tasks = [];
  let current = 0;
  let fulfil;
  let reject;
  let closed = false;
  const done = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  done.catch(() => {
  });
  function dequeue() {
    if (current < concurrency) {
      const task = tasks.shift();
      if (task) {
        current += 1;
        const promise = Promise.resolve(task.fn());
        promise.then(task.fulfil, (err) => {
          task.reject(err);
          reject(err);
        }).then(() => {
          current -= 1;
          dequeue();
        });
      } else if (current === 0) {
        closed = true;
        fulfil();
      }
    }
  }
  return {
    /** @param {() => any} fn */
    add: (fn) => {
      if (closed)
        throw new Error("Cannot add tasks to a queue that has ended");
      const promise = new Promise((fulfil2, reject2) => {
        tasks.push({ fn, fulfil: fulfil2, reject: reject2 });
      });
      dequeue();
      return promise;
    },
    done: () => {
      if (current === 0) {
        closed = true;
        fulfil();
      }
      return done;
    }
  };
}
const entities = {
  AElig: "Æ",
  "AElig;": "Æ",
  AMP: "&",
  "AMP;": "&",
  Aacute: "Á",
  "Aacute;": "Á",
  "Abreve;": "Ă",
  Acirc: "Â",
  "Acirc;": "Â",
  "Acy;": "А",
  "Afr;": "𝔄",
  Agrave: "À",
  "Agrave;": "À",
  "Alpha;": "Α",
  "Amacr;": "Ā",
  "And;": "⩓",
  "Aogon;": "Ą",
  "Aopf;": "𝔸",
  "ApplyFunction;": "⁡",
  Aring: "Å",
  "Aring;": "Å",
  "Ascr;": "𝒜",
  "Assign;": "≔",
  Atilde: "Ã",
  "Atilde;": "Ã",
  Auml: "Ä",
  "Auml;": "Ä",
  "Backslash;": "∖",
  "Barv;": "⫧",
  "Barwed;": "⌆",
  "Bcy;": "Б",
  "Because;": "∵",
  "Bernoullis;": "ℬ",
  "Beta;": "Β",
  "Bfr;": "𝔅",
  "Bopf;": "𝔹",
  "Breve;": "˘",
  "Bscr;": "ℬ",
  "Bumpeq;": "≎",
  "CHcy;": "Ч",
  COPY: "©",
  "COPY;": "©",
  "Cacute;": "Ć",
  "Cap;": "⋒",
  "CapitalDifferentialD;": "ⅅ",
  "Cayleys;": "ℭ",
  "Ccaron;": "Č",
  Ccedil: "Ç",
  "Ccedil;": "Ç",
  "Ccirc;": "Ĉ",
  "Cconint;": "∰",
  "Cdot;": "Ċ",
  "Cedilla;": "¸",
  "CenterDot;": "·",
  "Cfr;": "ℭ",
  "Chi;": "Χ",
  "CircleDot;": "⊙",
  "CircleMinus;": "⊖",
  "CirclePlus;": "⊕",
  "CircleTimes;": "⊗",
  "ClockwiseContourIntegral;": "∲",
  "CloseCurlyDoubleQuote;": "”",
  "CloseCurlyQuote;": "’",
  "Colon;": "∷",
  "Colone;": "⩴",
  "Congruent;": "≡",
  "Conint;": "∯",
  "ContourIntegral;": "∮",
  "Copf;": "ℂ",
  "Coproduct;": "∐",
  "CounterClockwiseContourIntegral;": "∳",
  "Cross;": "⨯",
  "Cscr;": "𝒞",
  "Cup;": "⋓",
  "CupCap;": "≍",
  "DD;": "ⅅ",
  "DDotrahd;": "⤑",
  "DJcy;": "Ђ",
  "DScy;": "Ѕ",
  "DZcy;": "Џ",
  "Dagger;": "‡",
  "Darr;": "↡",
  "Dashv;": "⫤",
  "Dcaron;": "Ď",
  "Dcy;": "Д",
  "Del;": "∇",
  "Delta;": "Δ",
  "Dfr;": "𝔇",
  "DiacriticalAcute;": "´",
  "DiacriticalDot;": "˙",
  "DiacriticalDoubleAcute;": "˝",
  "DiacriticalGrave;": "`",
  "DiacriticalTilde;": "˜",
  "Diamond;": "⋄",
  "DifferentialD;": "ⅆ",
  "Dopf;": "𝔻",
  "Dot;": "¨",
  "DotDot;": "⃜",
  "DotEqual;": "≐",
  "DoubleContourIntegral;": "∯",
  "DoubleDot;": "¨",
  "DoubleDownArrow;": "⇓",
  "DoubleLeftArrow;": "⇐",
  "DoubleLeftRightArrow;": "⇔",
  "DoubleLeftTee;": "⫤",
  "DoubleLongLeftArrow;": "⟸",
  "DoubleLongLeftRightArrow;": "⟺",
  "DoubleLongRightArrow;": "⟹",
  "DoubleRightArrow;": "⇒",
  "DoubleRightTee;": "⊨",
  "DoubleUpArrow;": "⇑",
  "DoubleUpDownArrow;": "⇕",
  "DoubleVerticalBar;": "∥",
  "DownArrow;": "↓",
  "DownArrowBar;": "⤓",
  "DownArrowUpArrow;": "⇵",
  "DownBreve;": "̑",
  "DownLeftRightVector;": "⥐",
  "DownLeftTeeVector;": "⥞",
  "DownLeftVector;": "↽",
  "DownLeftVectorBar;": "⥖",
  "DownRightTeeVector;": "⥟",
  "DownRightVector;": "⇁",
  "DownRightVectorBar;": "⥗",
  "DownTee;": "⊤",
  "DownTeeArrow;": "↧",
  "Downarrow;": "⇓",
  "Dscr;": "𝒟",
  "Dstrok;": "Đ",
  "ENG;": "Ŋ",
  ETH: "Ð",
  "ETH;": "Ð",
  Eacute: "É",
  "Eacute;": "É",
  "Ecaron;": "Ě",
  Ecirc: "Ê",
  "Ecirc;": "Ê",
  "Ecy;": "Э",
  "Edot;": "Ė",
  "Efr;": "𝔈",
  Egrave: "È",
  "Egrave;": "È",
  "Element;": "∈",
  "Emacr;": "Ē",
  "EmptySmallSquare;": "◻",
  "EmptyVerySmallSquare;": "▫",
  "Eogon;": "Ę",
  "Eopf;": "𝔼",
  "Epsilon;": "Ε",
  "Equal;": "⩵",
  "EqualTilde;": "≂",
  "Equilibrium;": "⇌",
  "Escr;": "ℰ",
  "Esim;": "⩳",
  "Eta;": "Η",
  Euml: "Ë",
  "Euml;": "Ë",
  "Exists;": "∃",
  "ExponentialE;": "ⅇ",
  "Fcy;": "Ф",
  "Ffr;": "𝔉",
  "FilledSmallSquare;": "◼",
  "FilledVerySmallSquare;": "▪",
  "Fopf;": "𝔽",
  "ForAll;": "∀",
  "Fouriertrf;": "ℱ",
  "Fscr;": "ℱ",
  "GJcy;": "Ѓ",
  GT: ">",
  "GT;": ">",
  "Gamma;": "Γ",
  "Gammad;": "Ϝ",
  "Gbreve;": "Ğ",
  "Gcedil;": "Ģ",
  "Gcirc;": "Ĝ",
  "Gcy;": "Г",
  "Gdot;": "Ġ",
  "Gfr;": "𝔊",
  "Gg;": "⋙",
  "Gopf;": "𝔾",
  "GreaterEqual;": "≥",
  "GreaterEqualLess;": "⋛",
  "GreaterFullEqual;": "≧",
  "GreaterGreater;": "⪢",
  "GreaterLess;": "≷",
  "GreaterSlantEqual;": "⩾",
  "GreaterTilde;": "≳",
  "Gscr;": "𝒢",
  "Gt;": "≫",
  "HARDcy;": "Ъ",
  "Hacek;": "ˇ",
  "Hat;": "^",
  "Hcirc;": "Ĥ",
  "Hfr;": "ℌ",
  "HilbertSpace;": "ℋ",
  "Hopf;": "ℍ",
  "HorizontalLine;": "─",
  "Hscr;": "ℋ",
  "Hstrok;": "Ħ",
  "HumpDownHump;": "≎",
  "HumpEqual;": "≏",
  "IEcy;": "Е",
  "IJlig;": "Ĳ",
  "IOcy;": "Ё",
  Iacute: "Í",
  "Iacute;": "Í",
  Icirc: "Î",
  "Icirc;": "Î",
  "Icy;": "И",
  "Idot;": "İ",
  "Ifr;": "ℑ",
  Igrave: "Ì",
  "Igrave;": "Ì",
  "Im;": "ℑ",
  "Imacr;": "Ī",
  "ImaginaryI;": "ⅈ",
  "Implies;": "⇒",
  "Int;": "∬",
  "Integral;": "∫",
  "Intersection;": "⋂",
  "InvisibleComma;": "⁣",
  "InvisibleTimes;": "⁢",
  "Iogon;": "Į",
  "Iopf;": "𝕀",
  "Iota;": "Ι",
  "Iscr;": "ℐ",
  "Itilde;": "Ĩ",
  "Iukcy;": "І",
  Iuml: "Ï",
  "Iuml;": "Ï",
  "Jcirc;": "Ĵ",
  "Jcy;": "Й",
  "Jfr;": "𝔍",
  "Jopf;": "𝕁",
  "Jscr;": "𝒥",
  "Jsercy;": "Ј",
  "Jukcy;": "Є",
  "KHcy;": "Х",
  "KJcy;": "Ќ",
  "Kappa;": "Κ",
  "Kcedil;": "Ķ",
  "Kcy;": "К",
  "Kfr;": "𝔎",
  "Kopf;": "𝕂",
  "Kscr;": "𝒦",
  "LJcy;": "Љ",
  LT: "<",
  "LT;": "<",
  "Lacute;": "Ĺ",
  "Lambda;": "Λ",
  "Lang;": "⟪",
  "Laplacetrf;": "ℒ",
  "Larr;": "↞",
  "Lcaron;": "Ľ",
  "Lcedil;": "Ļ",
  "Lcy;": "Л",
  "LeftAngleBracket;": "⟨",
  "LeftArrow;": "←",
  "LeftArrowBar;": "⇤",
  "LeftArrowRightArrow;": "⇆",
  "LeftCeiling;": "⌈",
  "LeftDoubleBracket;": "⟦",
  "LeftDownTeeVector;": "⥡",
  "LeftDownVector;": "⇃",
  "LeftDownVectorBar;": "⥙",
  "LeftFloor;": "⌊",
  "LeftRightArrow;": "↔",
  "LeftRightVector;": "⥎",
  "LeftTee;": "⊣",
  "LeftTeeArrow;": "↤",
  "LeftTeeVector;": "⥚",
  "LeftTriangle;": "⊲",
  "LeftTriangleBar;": "⧏",
  "LeftTriangleEqual;": "⊴",
  "LeftUpDownVector;": "⥑",
  "LeftUpTeeVector;": "⥠",
  "LeftUpVector;": "↿",
  "LeftUpVectorBar;": "⥘",
  "LeftVector;": "↼",
  "LeftVectorBar;": "⥒",
  "Leftarrow;": "⇐",
  "Leftrightarrow;": "⇔",
  "LessEqualGreater;": "⋚",
  "LessFullEqual;": "≦",
  "LessGreater;": "≶",
  "LessLess;": "⪡",
  "LessSlantEqual;": "⩽",
  "LessTilde;": "≲",
  "Lfr;": "𝔏",
  "Ll;": "⋘",
  "Lleftarrow;": "⇚",
  "Lmidot;": "Ŀ",
  "LongLeftArrow;": "⟵",
  "LongLeftRightArrow;": "⟷",
  "LongRightArrow;": "⟶",
  "Longleftarrow;": "⟸",
  "Longleftrightarrow;": "⟺",
  "Longrightarrow;": "⟹",
  "Lopf;": "𝕃",
  "LowerLeftArrow;": "↙",
  "LowerRightArrow;": "↘",
  "Lscr;": "ℒ",
  "Lsh;": "↰",
  "Lstrok;": "Ł",
  "Lt;": "≪",
  "Map;": "⤅",
  "Mcy;": "М",
  "MediumSpace;": " ",
  "Mellintrf;": "ℳ",
  "Mfr;": "𝔐",
  "MinusPlus;": "∓",
  "Mopf;": "𝕄",
  "Mscr;": "ℳ",
  "Mu;": "Μ",
  "NJcy;": "Њ",
  "Nacute;": "Ń",
  "Ncaron;": "Ň",
  "Ncedil;": "Ņ",
  "Ncy;": "Н",
  "NegativeMediumSpace;": "​",
  "NegativeThickSpace;": "​",
  "NegativeThinSpace;": "​",
  "NegativeVeryThinSpace;": "​",
  "NestedGreaterGreater;": "≫",
  "NestedLessLess;": "≪",
  "NewLine;": "\n",
  "Nfr;": "𝔑",
  "NoBreak;": "⁠",
  "NonBreakingSpace;": " ",
  "Nopf;": "ℕ",
  "Not;": "⫬",
  "NotCongruent;": "≢",
  "NotCupCap;": "≭",
  "NotDoubleVerticalBar;": "∦",
  "NotElement;": "∉",
  "NotEqual;": "≠",
  "NotEqualTilde;": "≂̸",
  "NotExists;": "∄",
  "NotGreater;": "≯",
  "NotGreaterEqual;": "≱",
  "NotGreaterFullEqual;": "≧̸",
  "NotGreaterGreater;": "≫̸",
  "NotGreaterLess;": "≹",
  "NotGreaterSlantEqual;": "⩾̸",
  "NotGreaterTilde;": "≵",
  "NotHumpDownHump;": "≎̸",
  "NotHumpEqual;": "≏̸",
  "NotLeftTriangle;": "⋪",
  "NotLeftTriangleBar;": "⧏̸",
  "NotLeftTriangleEqual;": "⋬",
  "NotLess;": "≮",
  "NotLessEqual;": "≰",
  "NotLessGreater;": "≸",
  "NotLessLess;": "≪̸",
  "NotLessSlantEqual;": "⩽̸",
  "NotLessTilde;": "≴",
  "NotNestedGreaterGreater;": "⪢̸",
  "NotNestedLessLess;": "⪡̸",
  "NotPrecedes;": "⊀",
  "NotPrecedesEqual;": "⪯̸",
  "NotPrecedesSlantEqual;": "⋠",
  "NotReverseElement;": "∌",
  "NotRightTriangle;": "⋫",
  "NotRightTriangleBar;": "⧐̸",
  "NotRightTriangleEqual;": "⋭",
  "NotSquareSubset;": "⊏̸",
  "NotSquareSubsetEqual;": "⋢",
  "NotSquareSuperset;": "⊐̸",
  "NotSquareSupersetEqual;": "⋣",
  "NotSubset;": "⊂⃒",
  "NotSubsetEqual;": "⊈",
  "NotSucceeds;": "⊁",
  "NotSucceedsEqual;": "⪰̸",
  "NotSucceedsSlantEqual;": "⋡",
  "NotSucceedsTilde;": "≿̸",
  "NotSuperset;": "⊃⃒",
  "NotSupersetEqual;": "⊉",
  "NotTilde;": "≁",
  "NotTildeEqual;": "≄",
  "NotTildeFullEqual;": "≇",
  "NotTildeTilde;": "≉",
  "NotVerticalBar;": "∤",
  "Nscr;": "𝒩",
  Ntilde: "Ñ",
  "Ntilde;": "Ñ",
  "Nu;": "Ν",
  "OElig;": "Œ",
  Oacute: "Ó",
  "Oacute;": "Ó",
  Ocirc: "Ô",
  "Ocirc;": "Ô",
  "Ocy;": "О",
  "Odblac;": "Ő",
  "Ofr;": "𝔒",
  Ograve: "Ò",
  "Ograve;": "Ò",
  "Omacr;": "Ō",
  "Omega;": "Ω",
  "Omicron;": "Ο",
  "Oopf;": "𝕆",
  "OpenCurlyDoubleQuote;": "“",
  "OpenCurlyQuote;": "‘",
  "Or;": "⩔",
  "Oscr;": "𝒪",
  Oslash: "Ø",
  "Oslash;": "Ø",
  Otilde: "Õ",
  "Otilde;": "Õ",
  "Otimes;": "⨷",
  Ouml: "Ö",
  "Ouml;": "Ö",
  "OverBar;": "‾",
  "OverBrace;": "⏞",
  "OverBracket;": "⎴",
  "OverParenthesis;": "⏜",
  "PartialD;": "∂",
  "Pcy;": "П",
  "Pfr;": "𝔓",
  "Phi;": "Φ",
  "Pi;": "Π",
  "PlusMinus;": "±",
  "Poincareplane;": "ℌ",
  "Popf;": "ℙ",
  "Pr;": "⪻",
  "Precedes;": "≺",
  "PrecedesEqual;": "⪯",
  "PrecedesSlantEqual;": "≼",
  "PrecedesTilde;": "≾",
  "Prime;": "″",
  "Product;": "∏",
  "Proportion;": "∷",
  "Proportional;": "∝",
  "Pscr;": "𝒫",
  "Psi;": "Ψ",
  QUOT: '"',
  "QUOT;": '"',
  "Qfr;": "𝔔",
  "Qopf;": "ℚ",
  "Qscr;": "𝒬",
  "RBarr;": "⤐",
  REG: "®",
  "REG;": "®",
  "Racute;": "Ŕ",
  "Rang;": "⟫",
  "Rarr;": "↠",
  "Rarrtl;": "⤖",
  "Rcaron;": "Ř",
  "Rcedil;": "Ŗ",
  "Rcy;": "Р",
  "Re;": "ℜ",
  "ReverseElement;": "∋",
  "ReverseEquilibrium;": "⇋",
  "ReverseUpEquilibrium;": "⥯",
  "Rfr;": "ℜ",
  "Rho;": "Ρ",
  "RightAngleBracket;": "⟩",
  "RightArrow;": "→",
  "RightArrowBar;": "⇥",
  "RightArrowLeftArrow;": "⇄",
  "RightCeiling;": "⌉",
  "RightDoubleBracket;": "⟧",
  "RightDownTeeVector;": "⥝",
  "RightDownVector;": "⇂",
  "RightDownVectorBar;": "⥕",
  "RightFloor;": "⌋",
  "RightTee;": "⊢",
  "RightTeeArrow;": "↦",
  "RightTeeVector;": "⥛",
  "RightTriangle;": "⊳",
  "RightTriangleBar;": "⧐",
  "RightTriangleEqual;": "⊵",
  "RightUpDownVector;": "⥏",
  "RightUpTeeVector;": "⥜",
  "RightUpVector;": "↾",
  "RightUpVectorBar;": "⥔",
  "RightVector;": "⇀",
  "RightVectorBar;": "⥓",
  "Rightarrow;": "⇒",
  "Ropf;": "ℝ",
  "RoundImplies;": "⥰",
  "Rrightarrow;": "⇛",
  "Rscr;": "ℛ",
  "Rsh;": "↱",
  "RuleDelayed;": "⧴",
  "SHCHcy;": "Щ",
  "SHcy;": "Ш",
  "SOFTcy;": "Ь",
  "Sacute;": "Ś",
  "Sc;": "⪼",
  "Scaron;": "Š",
  "Scedil;": "Ş",
  "Scirc;": "Ŝ",
  "Scy;": "С",
  "Sfr;": "𝔖",
  "ShortDownArrow;": "↓",
  "ShortLeftArrow;": "←",
  "ShortRightArrow;": "→",
  "ShortUpArrow;": "↑",
  "Sigma;": "Σ",
  "SmallCircle;": "∘",
  "Sopf;": "𝕊",
  "Sqrt;": "√",
  "Square;": "□",
  "SquareIntersection;": "⊓",
  "SquareSubset;": "⊏",
  "SquareSubsetEqual;": "⊑",
  "SquareSuperset;": "⊐",
  "SquareSupersetEqual;": "⊒",
  "SquareUnion;": "⊔",
  "Sscr;": "𝒮",
  "Star;": "⋆",
  "Sub;": "⋐",
  "Subset;": "⋐",
  "SubsetEqual;": "⊆",
  "Succeeds;": "≻",
  "SucceedsEqual;": "⪰",
  "SucceedsSlantEqual;": "≽",
  "SucceedsTilde;": "≿",
  "SuchThat;": "∋",
  "Sum;": "∑",
  "Sup;": "⋑",
  "Superset;": "⊃",
  "SupersetEqual;": "⊇",
  "Supset;": "⋑",
  THORN: "Þ",
  "THORN;": "Þ",
  "TRADE;": "™",
  "TSHcy;": "Ћ",
  "TScy;": "Ц",
  "Tab;": "	",
  "Tau;": "Τ",
  "Tcaron;": "Ť",
  "Tcedil;": "Ţ",
  "Tcy;": "Т",
  "Tfr;": "𝔗",
  "Therefore;": "∴",
  "Theta;": "Θ",
  "ThickSpace;": "  ",
  "ThinSpace;": " ",
  "Tilde;": "∼",
  "TildeEqual;": "≃",
  "TildeFullEqual;": "≅",
  "TildeTilde;": "≈",
  "Topf;": "𝕋",
  "TripleDot;": "⃛",
  "Tscr;": "𝒯",
  "Tstrok;": "Ŧ",
  Uacute: "Ú",
  "Uacute;": "Ú",
  "Uarr;": "↟",
  "Uarrocir;": "⥉",
  "Ubrcy;": "Ў",
  "Ubreve;": "Ŭ",
  Ucirc: "Û",
  "Ucirc;": "Û",
  "Ucy;": "У",
  "Udblac;": "Ű",
  "Ufr;": "𝔘",
  Ugrave: "Ù",
  "Ugrave;": "Ù",
  "Umacr;": "Ū",
  "UnderBar;": "_",
  "UnderBrace;": "⏟",
  "UnderBracket;": "⎵",
  "UnderParenthesis;": "⏝",
  "Union;": "⋃",
  "UnionPlus;": "⊎",
  "Uogon;": "Ų",
  "Uopf;": "𝕌",
  "UpArrow;": "↑",
  "UpArrowBar;": "⤒",
  "UpArrowDownArrow;": "⇅",
  "UpDownArrow;": "↕",
  "UpEquilibrium;": "⥮",
  "UpTee;": "⊥",
  "UpTeeArrow;": "↥",
  "Uparrow;": "⇑",
  "Updownarrow;": "⇕",
  "UpperLeftArrow;": "↖",
  "UpperRightArrow;": "↗",
  "Upsi;": "ϒ",
  "Upsilon;": "Υ",
  "Uring;": "Ů",
  "Uscr;": "𝒰",
  "Utilde;": "Ũ",
  Uuml: "Ü",
  "Uuml;": "Ü",
  "VDash;": "⊫",
  "Vbar;": "⫫",
  "Vcy;": "В",
  "Vdash;": "⊩",
  "Vdashl;": "⫦",
  "Vee;": "⋁",
  "Verbar;": "‖",
  "Vert;": "‖",
  "VerticalBar;": "∣",
  "VerticalLine;": "|",
  "VerticalSeparator;": "❘",
  "VerticalTilde;": "≀",
  "VeryThinSpace;": " ",
  "Vfr;": "𝔙",
  "Vopf;": "𝕍",
  "Vscr;": "𝒱",
  "Vvdash;": "⊪",
  "Wcirc;": "Ŵ",
  "Wedge;": "⋀",
  "Wfr;": "𝔚",
  "Wopf;": "𝕎",
  "Wscr;": "𝒲",
  "Xfr;": "𝔛",
  "Xi;": "Ξ",
  "Xopf;": "𝕏",
  "Xscr;": "𝒳",
  "YAcy;": "Я",
  "YIcy;": "Ї",
  "YUcy;": "Ю",
  Yacute: "Ý",
  "Yacute;": "Ý",
  "Ycirc;": "Ŷ",
  "Ycy;": "Ы",
  "Yfr;": "𝔜",
  "Yopf;": "𝕐",
  "Yscr;": "𝒴",
  "Yuml;": "Ÿ",
  "ZHcy;": "Ж",
  "Zacute;": "Ź",
  "Zcaron;": "Ž",
  "Zcy;": "З",
  "Zdot;": "Ż",
  "ZeroWidthSpace;": "​",
  "Zeta;": "Ζ",
  "Zfr;": "ℨ",
  "Zopf;": "ℤ",
  "Zscr;": "𝒵",
  aacute: "á",
  "aacute;": "á",
  "abreve;": "ă",
  "ac;": "∾",
  "acE;": "∾̳",
  "acd;": "∿",
  acirc: "â",
  "acirc;": "â",
  acute: "´",
  "acute;": "´",
  "acy;": "а",
  aelig: "æ",
  "aelig;": "æ",
  "af;": "⁡",
  "afr;": "𝔞",
  agrave: "à",
  "agrave;": "à",
  "alefsym;": "ℵ",
  "aleph;": "ℵ",
  "alpha;": "α",
  "amacr;": "ā",
  "amalg;": "⨿",
  amp: "&",
  "amp;": "&",
  "and;": "∧",
  "andand;": "⩕",
  "andd;": "⩜",
  "andslope;": "⩘",
  "andv;": "⩚",
  "ang;": "∠",
  "ange;": "⦤",
  "angle;": "∠",
  "angmsd;": "∡",
  "angmsdaa;": "⦨",
  "angmsdab;": "⦩",
  "angmsdac;": "⦪",
  "angmsdad;": "⦫",
  "angmsdae;": "⦬",
  "angmsdaf;": "⦭",
  "angmsdag;": "⦮",
  "angmsdah;": "⦯",
  "angrt;": "∟",
  "angrtvb;": "⊾",
  "angrtvbd;": "⦝",
  "angsph;": "∢",
  "angst;": "Å",
  "angzarr;": "⍼",
  "aogon;": "ą",
  "aopf;": "𝕒",
  "ap;": "≈",
  "apE;": "⩰",
  "apacir;": "⩯",
  "ape;": "≊",
  "apid;": "≋",
  "apos;": "'",
  "approx;": "≈",
  "approxeq;": "≊",
  aring: "å",
  "aring;": "å",
  "ascr;": "𝒶",
  "ast;": "*",
  "asymp;": "≈",
  "asympeq;": "≍",
  atilde: "ã",
  "atilde;": "ã",
  auml: "ä",
  "auml;": "ä",
  "awconint;": "∳",
  "awint;": "⨑",
  "bNot;": "⫭",
  "backcong;": "≌",
  "backepsilon;": "϶",
  "backprime;": "‵",
  "backsim;": "∽",
  "backsimeq;": "⋍",
  "barvee;": "⊽",
  "barwed;": "⌅",
  "barwedge;": "⌅",
  "bbrk;": "⎵",
  "bbrktbrk;": "⎶",
  "bcong;": "≌",
  "bcy;": "б",
  "bdquo;": "„",
  "becaus;": "∵",
  "because;": "∵",
  "bemptyv;": "⦰",
  "bepsi;": "϶",
  "bernou;": "ℬ",
  "beta;": "β",
  "beth;": "ℶ",
  "between;": "≬",
  "bfr;": "𝔟",
  "bigcap;": "⋂",
  "bigcirc;": "◯",
  "bigcup;": "⋃",
  "bigodot;": "⨀",
  "bigoplus;": "⨁",
  "bigotimes;": "⨂",
  "bigsqcup;": "⨆",
  "bigstar;": "★",
  "bigtriangledown;": "▽",
  "bigtriangleup;": "△",
  "biguplus;": "⨄",
  "bigvee;": "⋁",
  "bigwedge;": "⋀",
  "bkarow;": "⤍",
  "blacklozenge;": "⧫",
  "blacksquare;": "▪",
  "blacktriangle;": "▴",
  "blacktriangledown;": "▾",
  "blacktriangleleft;": "◂",
  "blacktriangleright;": "▸",
  "blank;": "␣",
  "blk12;": "▒",
  "blk14;": "░",
  "blk34;": "▓",
  "block;": "█",
  "bne;": "=⃥",
  "bnequiv;": "≡⃥",
  "bnot;": "⌐",
  "bopf;": "𝕓",
  "bot;": "⊥",
  "bottom;": "⊥",
  "bowtie;": "⋈",
  "boxDL;": "╗",
  "boxDR;": "╔",
  "boxDl;": "╖",
  "boxDr;": "╓",
  "boxH;": "═",
  "boxHD;": "╦",
  "boxHU;": "╩",
  "boxHd;": "╤",
  "boxHu;": "╧",
  "boxUL;": "╝",
  "boxUR;": "╚",
  "boxUl;": "╜",
  "boxUr;": "╙",
  "boxV;": "║",
  "boxVH;": "╬",
  "boxVL;": "╣",
  "boxVR;": "╠",
  "boxVh;": "╫",
  "boxVl;": "╢",
  "boxVr;": "╟",
  "boxbox;": "⧉",
  "boxdL;": "╕",
  "boxdR;": "╒",
  "boxdl;": "┐",
  "boxdr;": "┌",
  "boxh;": "─",
  "boxhD;": "╥",
  "boxhU;": "╨",
  "boxhd;": "┬",
  "boxhu;": "┴",
  "boxminus;": "⊟",
  "boxplus;": "⊞",
  "boxtimes;": "⊠",
  "boxuL;": "╛",
  "boxuR;": "╘",
  "boxul;": "┘",
  "boxur;": "└",
  "boxv;": "│",
  "boxvH;": "╪",
  "boxvL;": "╡",
  "boxvR;": "╞",
  "boxvh;": "┼",
  "boxvl;": "┤",
  "boxvr;": "├",
  "bprime;": "‵",
  "breve;": "˘",
  brvbar: "¦",
  "brvbar;": "¦",
  "bscr;": "𝒷",
  "bsemi;": "⁏",
  "bsim;": "∽",
  "bsime;": "⋍",
  "bsol;": "\\",
  "bsolb;": "⧅",
  "bsolhsub;": "⟈",
  "bull;": "•",
  "bullet;": "•",
  "bump;": "≎",
  "bumpE;": "⪮",
  "bumpe;": "≏",
  "bumpeq;": "≏",
  "cacute;": "ć",
  "cap;": "∩",
  "capand;": "⩄",
  "capbrcup;": "⩉",
  "capcap;": "⩋",
  "capcup;": "⩇",
  "capdot;": "⩀",
  "caps;": "∩︀",
  "caret;": "⁁",
  "caron;": "ˇ",
  "ccaps;": "⩍",
  "ccaron;": "č",
  ccedil: "ç",
  "ccedil;": "ç",
  "ccirc;": "ĉ",
  "ccups;": "⩌",
  "ccupssm;": "⩐",
  "cdot;": "ċ",
  cedil: "¸",
  "cedil;": "¸",
  "cemptyv;": "⦲",
  cent: "¢",
  "cent;": "¢",
  "centerdot;": "·",
  "cfr;": "𝔠",
  "chcy;": "ч",
  "check;": "✓",
  "checkmark;": "✓",
  "chi;": "χ",
  "cir;": "○",
  "cirE;": "⧃",
  "circ;": "ˆ",
  "circeq;": "≗",
  "circlearrowleft;": "↺",
  "circlearrowright;": "↻",
  "circledR;": "®",
  "circledS;": "Ⓢ",
  "circledast;": "⊛",
  "circledcirc;": "⊚",
  "circleddash;": "⊝",
  "cire;": "≗",
  "cirfnint;": "⨐",
  "cirmid;": "⫯",
  "cirscir;": "⧂",
  "clubs;": "♣",
  "clubsuit;": "♣",
  "colon;": ":",
  "colone;": "≔",
  "coloneq;": "≔",
  "comma;": ",",
  "commat;": "@",
  "comp;": "∁",
  "compfn;": "∘",
  "complement;": "∁",
  "complexes;": "ℂ",
  "cong;": "≅",
  "congdot;": "⩭",
  "conint;": "∮",
  "copf;": "𝕔",
  "coprod;": "∐",
  copy: "©",
  "copy;": "©",
  "copysr;": "℗",
  "crarr;": "↵",
  "cross;": "✗",
  "cscr;": "𝒸",
  "csub;": "⫏",
  "csube;": "⫑",
  "csup;": "⫐",
  "csupe;": "⫒",
  "ctdot;": "⋯",
  "cudarrl;": "⤸",
  "cudarrr;": "⤵",
  "cuepr;": "⋞",
  "cuesc;": "⋟",
  "cularr;": "↶",
  "cularrp;": "⤽",
  "cup;": "∪",
  "cupbrcap;": "⩈",
  "cupcap;": "⩆",
  "cupcup;": "⩊",
  "cupdot;": "⊍",
  "cupor;": "⩅",
  "cups;": "∪︀",
  "curarr;": "↷",
  "curarrm;": "⤼",
  "curlyeqprec;": "⋞",
  "curlyeqsucc;": "⋟",
  "curlyvee;": "⋎",
  "curlywedge;": "⋏",
  curren: "¤",
  "curren;": "¤",
  "curvearrowleft;": "↶",
  "curvearrowright;": "↷",
  "cuvee;": "⋎",
  "cuwed;": "⋏",
  "cwconint;": "∲",
  "cwint;": "∱",
  "cylcty;": "⌭",
  "dArr;": "⇓",
  "dHar;": "⥥",
  "dagger;": "†",
  "daleth;": "ℸ",
  "darr;": "↓",
  "dash;": "‐",
  "dashv;": "⊣",
  "dbkarow;": "⤏",
  "dblac;": "˝",
  "dcaron;": "ď",
  "dcy;": "д",
  "dd;": "ⅆ",
  "ddagger;": "‡",
  "ddarr;": "⇊",
  "ddotseq;": "⩷",
  deg: "°",
  "deg;": "°",
  "delta;": "δ",
  "demptyv;": "⦱",
  "dfisht;": "⥿",
  "dfr;": "𝔡",
  "dharl;": "⇃",
  "dharr;": "⇂",
  "diam;": "⋄",
  "diamond;": "⋄",
  "diamondsuit;": "♦",
  "diams;": "♦",
  "die;": "¨",
  "digamma;": "ϝ",
  "disin;": "⋲",
  "div;": "÷",
  divide: "÷",
  "divide;": "÷",
  "divideontimes;": "⋇",
  "divonx;": "⋇",
  "djcy;": "ђ",
  "dlcorn;": "⌞",
  "dlcrop;": "⌍",
  "dollar;": "$",
  "dopf;": "𝕕",
  "dot;": "˙",
  "doteq;": "≐",
  "doteqdot;": "≑",
  "dotminus;": "∸",
  "dotplus;": "∔",
  "dotsquare;": "⊡",
  "doublebarwedge;": "⌆",
  "downarrow;": "↓",
  "downdownarrows;": "⇊",
  "downharpoonleft;": "⇃",
  "downharpoonright;": "⇂",
  "drbkarow;": "⤐",
  "drcorn;": "⌟",
  "drcrop;": "⌌",
  "dscr;": "𝒹",
  "dscy;": "ѕ",
  "dsol;": "⧶",
  "dstrok;": "đ",
  "dtdot;": "⋱",
  "dtri;": "▿",
  "dtrif;": "▾",
  "duarr;": "⇵",
  "duhar;": "⥯",
  "dwangle;": "⦦",
  "dzcy;": "џ",
  "dzigrarr;": "⟿",
  "eDDot;": "⩷",
  "eDot;": "≑",
  eacute: "é",
  "eacute;": "é",
  "easter;": "⩮",
  "ecaron;": "ě",
  "ecir;": "≖",
  ecirc: "ê",
  "ecirc;": "ê",
  "ecolon;": "≕",
  "ecy;": "э",
  "edot;": "ė",
  "ee;": "ⅇ",
  "efDot;": "≒",
  "efr;": "𝔢",
  "eg;": "⪚",
  egrave: "è",
  "egrave;": "è",
  "egs;": "⪖",
  "egsdot;": "⪘",
  "el;": "⪙",
  "elinters;": "⏧",
  "ell;": "ℓ",
  "els;": "⪕",
  "elsdot;": "⪗",
  "emacr;": "ē",
  "empty;": "∅",
  "emptyset;": "∅",
  "emptyv;": "∅",
  "emsp13;": " ",
  "emsp14;": " ",
  "emsp;": " ",
  "eng;": "ŋ",
  "ensp;": " ",
  "eogon;": "ę",
  "eopf;": "𝕖",
  "epar;": "⋕",
  "eparsl;": "⧣",
  "eplus;": "⩱",
  "epsi;": "ε",
  "epsilon;": "ε",
  "epsiv;": "ϵ",
  "eqcirc;": "≖",
  "eqcolon;": "≕",
  "eqsim;": "≂",
  "eqslantgtr;": "⪖",
  "eqslantless;": "⪕",
  "equals;": "=",
  "equest;": "≟",
  "equiv;": "≡",
  "equivDD;": "⩸",
  "eqvparsl;": "⧥",
  "erDot;": "≓",
  "erarr;": "⥱",
  "escr;": "ℯ",
  "esdot;": "≐",
  "esim;": "≂",
  "eta;": "η",
  eth: "ð",
  "eth;": "ð",
  euml: "ë",
  "euml;": "ë",
  "euro;": "€",
  "excl;": "!",
  "exist;": "∃",
  "expectation;": "ℰ",
  "exponentiale;": "ⅇ",
  "fallingdotseq;": "≒",
  "fcy;": "ф",
  "female;": "♀",
  "ffilig;": "ﬃ",
  "fflig;": "ﬀ",
  "ffllig;": "ﬄ",
  "ffr;": "𝔣",
  "filig;": "ﬁ",
  "fjlig;": "fj",
  "flat;": "♭",
  "fllig;": "ﬂ",
  "fltns;": "▱",
  "fnof;": "ƒ",
  "fopf;": "𝕗",
  "forall;": "∀",
  "fork;": "⋔",
  "forkv;": "⫙",
  "fpartint;": "⨍",
  frac12: "½",
  "frac12;": "½",
  "frac13;": "⅓",
  frac14: "¼",
  "frac14;": "¼",
  "frac15;": "⅕",
  "frac16;": "⅙",
  "frac18;": "⅛",
  "frac23;": "⅔",
  "frac25;": "⅖",
  frac34: "¾",
  "frac34;": "¾",
  "frac35;": "⅗",
  "frac38;": "⅜",
  "frac45;": "⅘",
  "frac56;": "⅚",
  "frac58;": "⅝",
  "frac78;": "⅞",
  "frasl;": "⁄",
  "frown;": "⌢",
  "fscr;": "𝒻",
  "gE;": "≧",
  "gEl;": "⪌",
  "gacute;": "ǵ",
  "gamma;": "γ",
  "gammad;": "ϝ",
  "gap;": "⪆",
  "gbreve;": "ğ",
  "gcirc;": "ĝ",
  "gcy;": "г",
  "gdot;": "ġ",
  "ge;": "≥",
  "gel;": "⋛",
  "geq;": "≥",
  "geqq;": "≧",
  "geqslant;": "⩾",
  "ges;": "⩾",
  "gescc;": "⪩",
  "gesdot;": "⪀",
  "gesdoto;": "⪂",
  "gesdotol;": "⪄",
  "gesl;": "⋛︀",
  "gesles;": "⪔",
  "gfr;": "𝔤",
  "gg;": "≫",
  "ggg;": "⋙",
  "gimel;": "ℷ",
  "gjcy;": "ѓ",
  "gl;": "≷",
  "glE;": "⪒",
  "gla;": "⪥",
  "glj;": "⪤",
  "gnE;": "≩",
  "gnap;": "⪊",
  "gnapprox;": "⪊",
  "gne;": "⪈",
  "gneq;": "⪈",
  "gneqq;": "≩",
  "gnsim;": "⋧",
  "gopf;": "𝕘",
  "grave;": "`",
  "gscr;": "ℊ",
  "gsim;": "≳",
  "gsime;": "⪎",
  "gsiml;": "⪐",
  gt: ">",
  "gt;": ">",
  "gtcc;": "⪧",
  "gtcir;": "⩺",
  "gtdot;": "⋗",
  "gtlPar;": "⦕",
  "gtquest;": "⩼",
  "gtrapprox;": "⪆",
  "gtrarr;": "⥸",
  "gtrdot;": "⋗",
  "gtreqless;": "⋛",
  "gtreqqless;": "⪌",
  "gtrless;": "≷",
  "gtrsim;": "≳",
  "gvertneqq;": "≩︀",
  "gvnE;": "≩︀",
  "hArr;": "⇔",
  "hairsp;": " ",
  "half;": "½",
  "hamilt;": "ℋ",
  "hardcy;": "ъ",
  "harr;": "↔",
  "harrcir;": "⥈",
  "harrw;": "↭",
  "hbar;": "ℏ",
  "hcirc;": "ĥ",
  "hearts;": "♥",
  "heartsuit;": "♥",
  "hellip;": "…",
  "hercon;": "⊹",
  "hfr;": "𝔥",
  "hksearow;": "⤥",
  "hkswarow;": "⤦",
  "hoarr;": "⇿",
  "homtht;": "∻",
  "hookleftarrow;": "↩",
  "hookrightarrow;": "↪",
  "hopf;": "𝕙",
  "horbar;": "―",
  "hscr;": "𝒽",
  "hslash;": "ℏ",
  "hstrok;": "ħ",
  "hybull;": "⁃",
  "hyphen;": "‐",
  iacute: "í",
  "iacute;": "í",
  "ic;": "⁣",
  icirc: "î",
  "icirc;": "î",
  "icy;": "и",
  "iecy;": "е",
  iexcl: "¡",
  "iexcl;": "¡",
  "iff;": "⇔",
  "ifr;": "𝔦",
  igrave: "ì",
  "igrave;": "ì",
  "ii;": "ⅈ",
  "iiiint;": "⨌",
  "iiint;": "∭",
  "iinfin;": "⧜",
  "iiota;": "℩",
  "ijlig;": "ĳ",
  "imacr;": "ī",
  "image;": "ℑ",
  "imagline;": "ℐ",
  "imagpart;": "ℑ",
  "imath;": "ı",
  "imof;": "⊷",
  "imped;": "Ƶ",
  "in;": "∈",
  "incare;": "℅",
  "infin;": "∞",
  "infintie;": "⧝",
  "inodot;": "ı",
  "int;": "∫",
  "intcal;": "⊺",
  "integers;": "ℤ",
  "intercal;": "⊺",
  "intlarhk;": "⨗",
  "intprod;": "⨼",
  "iocy;": "ё",
  "iogon;": "į",
  "iopf;": "𝕚",
  "iota;": "ι",
  "iprod;": "⨼",
  iquest: "¿",
  "iquest;": "¿",
  "iscr;": "𝒾",
  "isin;": "∈",
  "isinE;": "⋹",
  "isindot;": "⋵",
  "isins;": "⋴",
  "isinsv;": "⋳",
  "isinv;": "∈",
  "it;": "⁢",
  "itilde;": "ĩ",
  "iukcy;": "і",
  iuml: "ï",
  "iuml;": "ï",
  "jcirc;": "ĵ",
  "jcy;": "й",
  "jfr;": "𝔧",
  "jmath;": "ȷ",
  "jopf;": "𝕛",
  "jscr;": "𝒿",
  "jsercy;": "ј",
  "jukcy;": "є",
  "kappa;": "κ",
  "kappav;": "ϰ",
  "kcedil;": "ķ",
  "kcy;": "к",
  "kfr;": "𝔨",
  "kgreen;": "ĸ",
  "khcy;": "х",
  "kjcy;": "ќ",
  "kopf;": "𝕜",
  "kscr;": "𝓀",
  "lAarr;": "⇚",
  "lArr;": "⇐",
  "lAtail;": "⤛",
  "lBarr;": "⤎",
  "lE;": "≦",
  "lEg;": "⪋",
  "lHar;": "⥢",
  "lacute;": "ĺ",
  "laemptyv;": "⦴",
  "lagran;": "ℒ",
  "lambda;": "λ",
  "lang;": "⟨",
  "langd;": "⦑",
  "langle;": "⟨",
  "lap;": "⪅",
  laquo: "«",
  "laquo;": "«",
  "larr;": "←",
  "larrb;": "⇤",
  "larrbfs;": "⤟",
  "larrfs;": "⤝",
  "larrhk;": "↩",
  "larrlp;": "↫",
  "larrpl;": "⤹",
  "larrsim;": "⥳",
  "larrtl;": "↢",
  "lat;": "⪫",
  "latail;": "⤙",
  "late;": "⪭",
  "lates;": "⪭︀",
  "lbarr;": "⤌",
  "lbbrk;": "❲",
  "lbrace;": "{",
  "lbrack;": "[",
  "lbrke;": "⦋",
  "lbrksld;": "⦏",
  "lbrkslu;": "⦍",
  "lcaron;": "ľ",
  "lcedil;": "ļ",
  "lceil;": "⌈",
  "lcub;": "{",
  "lcy;": "л",
  "ldca;": "⤶",
  "ldquo;": "“",
  "ldquor;": "„",
  "ldrdhar;": "⥧",
  "ldrushar;": "⥋",
  "ldsh;": "↲",
  "le;": "≤",
  "leftarrow;": "←",
  "leftarrowtail;": "↢",
  "leftharpoondown;": "↽",
  "leftharpoonup;": "↼",
  "leftleftarrows;": "⇇",
  "leftrightarrow;": "↔",
  "leftrightarrows;": "⇆",
  "leftrightharpoons;": "⇋",
  "leftrightsquigarrow;": "↭",
  "leftthreetimes;": "⋋",
  "leg;": "⋚",
  "leq;": "≤",
  "leqq;": "≦",
  "leqslant;": "⩽",
  "les;": "⩽",
  "lescc;": "⪨",
  "lesdot;": "⩿",
  "lesdoto;": "⪁",
  "lesdotor;": "⪃",
  "lesg;": "⋚︀",
  "lesges;": "⪓",
  "lessapprox;": "⪅",
  "lessdot;": "⋖",
  "lesseqgtr;": "⋚",
  "lesseqqgtr;": "⪋",
  "lessgtr;": "≶",
  "lesssim;": "≲",
  "lfisht;": "⥼",
  "lfloor;": "⌊",
  "lfr;": "𝔩",
  "lg;": "≶",
  "lgE;": "⪑",
  "lhard;": "↽",
  "lharu;": "↼",
  "lharul;": "⥪",
  "lhblk;": "▄",
  "ljcy;": "љ",
  "ll;": "≪",
  "llarr;": "⇇",
  "llcorner;": "⌞",
  "llhard;": "⥫",
  "lltri;": "◺",
  "lmidot;": "ŀ",
  "lmoust;": "⎰",
  "lmoustache;": "⎰",
  "lnE;": "≨",
  "lnap;": "⪉",
  "lnapprox;": "⪉",
  "lne;": "⪇",
  "lneq;": "⪇",
  "lneqq;": "≨",
  "lnsim;": "⋦",
  "loang;": "⟬",
  "loarr;": "⇽",
  "lobrk;": "⟦",
  "longleftarrow;": "⟵",
  "longleftrightarrow;": "⟷",
  "longmapsto;": "⟼",
  "longrightarrow;": "⟶",
  "looparrowleft;": "↫",
  "looparrowright;": "↬",
  "lopar;": "⦅",
  "lopf;": "𝕝",
  "loplus;": "⨭",
  "lotimes;": "⨴",
  "lowast;": "∗",
  "lowbar;": "_",
  "loz;": "◊",
  "lozenge;": "◊",
  "lozf;": "⧫",
  "lpar;": "(",
  "lparlt;": "⦓",
  "lrarr;": "⇆",
  "lrcorner;": "⌟",
  "lrhar;": "⇋",
  "lrhard;": "⥭",
  "lrm;": "‎",
  "lrtri;": "⊿",
  "lsaquo;": "‹",
  "lscr;": "𝓁",
  "lsh;": "↰",
  "lsim;": "≲",
  "lsime;": "⪍",
  "lsimg;": "⪏",
  "lsqb;": "[",
  "lsquo;": "‘",
  "lsquor;": "‚",
  "lstrok;": "ł",
  lt: "<",
  "lt;": "<",
  "ltcc;": "⪦",
  "ltcir;": "⩹",
  "ltdot;": "⋖",
  "lthree;": "⋋",
  "ltimes;": "⋉",
  "ltlarr;": "⥶",
  "ltquest;": "⩻",
  "ltrPar;": "⦖",
  "ltri;": "◃",
  "ltrie;": "⊴",
  "ltrif;": "◂",
  "lurdshar;": "⥊",
  "luruhar;": "⥦",
  "lvertneqq;": "≨︀",
  "lvnE;": "≨︀",
  "mDDot;": "∺",
  macr: "¯",
  "macr;": "¯",
  "male;": "♂",
  "malt;": "✠",
  "maltese;": "✠",
  "map;": "↦",
  "mapsto;": "↦",
  "mapstodown;": "↧",
  "mapstoleft;": "↤",
  "mapstoup;": "↥",
  "marker;": "▮",
  "mcomma;": "⨩",
  "mcy;": "м",
  "mdash;": "—",
  "measuredangle;": "∡",
  "mfr;": "𝔪",
  "mho;": "℧",
  micro: "µ",
  "micro;": "µ",
  "mid;": "∣",
  "midast;": "*",
  "midcir;": "⫰",
  middot: "·",
  "middot;": "·",
  "minus;": "−",
  "minusb;": "⊟",
  "minusd;": "∸",
  "minusdu;": "⨪",
  "mlcp;": "⫛",
  "mldr;": "…",
  "mnplus;": "∓",
  "models;": "⊧",
  "mopf;": "𝕞",
  "mp;": "∓",
  "mscr;": "𝓂",
  "mstpos;": "∾",
  "mu;": "μ",
  "multimap;": "⊸",
  "mumap;": "⊸",
  "nGg;": "⋙̸",
  "nGt;": "≫⃒",
  "nGtv;": "≫̸",
  "nLeftarrow;": "⇍",
  "nLeftrightarrow;": "⇎",
  "nLl;": "⋘̸",
  "nLt;": "≪⃒",
  "nLtv;": "≪̸",
  "nRightarrow;": "⇏",
  "nVDash;": "⊯",
  "nVdash;": "⊮",
  "nabla;": "∇",
  "nacute;": "ń",
  "nang;": "∠⃒",
  "nap;": "≉",
  "napE;": "⩰̸",
  "napid;": "≋̸",
  "napos;": "ŉ",
  "napprox;": "≉",
  "natur;": "♮",
  "natural;": "♮",
  "naturals;": "ℕ",
  nbsp: " ",
  "nbsp;": " ",
  "nbump;": "≎̸",
  "nbumpe;": "≏̸",
  "ncap;": "⩃",
  "ncaron;": "ň",
  "ncedil;": "ņ",
  "ncong;": "≇",
  "ncongdot;": "⩭̸",
  "ncup;": "⩂",
  "ncy;": "н",
  "ndash;": "–",
  "ne;": "≠",
  "neArr;": "⇗",
  "nearhk;": "⤤",
  "nearr;": "↗",
  "nearrow;": "↗",
  "nedot;": "≐̸",
  "nequiv;": "≢",
  "nesear;": "⤨",
  "nesim;": "≂̸",
  "nexist;": "∄",
  "nexists;": "∄",
  "nfr;": "𝔫",
  "ngE;": "≧̸",
  "nge;": "≱",
  "ngeq;": "≱",
  "ngeqq;": "≧̸",
  "ngeqslant;": "⩾̸",
  "nges;": "⩾̸",
  "ngsim;": "≵",
  "ngt;": "≯",
  "ngtr;": "≯",
  "nhArr;": "⇎",
  "nharr;": "↮",
  "nhpar;": "⫲",
  "ni;": "∋",
  "nis;": "⋼",
  "nisd;": "⋺",
  "niv;": "∋",
  "njcy;": "њ",
  "nlArr;": "⇍",
  "nlE;": "≦̸",
  "nlarr;": "↚",
  "nldr;": "‥",
  "nle;": "≰",
  "nleftarrow;": "↚",
  "nleftrightarrow;": "↮",
  "nleq;": "≰",
  "nleqq;": "≦̸",
  "nleqslant;": "⩽̸",
  "nles;": "⩽̸",
  "nless;": "≮",
  "nlsim;": "≴",
  "nlt;": "≮",
  "nltri;": "⋪",
  "nltrie;": "⋬",
  "nmid;": "∤",
  "nopf;": "𝕟",
  not: "¬",
  "not;": "¬",
  "notin;": "∉",
  "notinE;": "⋹̸",
  "notindot;": "⋵̸",
  "notinva;": "∉",
  "notinvb;": "⋷",
  "notinvc;": "⋶",
  "notni;": "∌",
  "notniva;": "∌",
  "notnivb;": "⋾",
  "notnivc;": "⋽",
  "npar;": "∦",
  "nparallel;": "∦",
  "nparsl;": "⫽⃥",
  "npart;": "∂̸",
  "npolint;": "⨔",
  "npr;": "⊀",
  "nprcue;": "⋠",
  "npre;": "⪯̸",
  "nprec;": "⊀",
  "npreceq;": "⪯̸",
  "nrArr;": "⇏",
  "nrarr;": "↛",
  "nrarrc;": "⤳̸",
  "nrarrw;": "↝̸",
  "nrightarrow;": "↛",
  "nrtri;": "⋫",
  "nrtrie;": "⋭",
  "nsc;": "⊁",
  "nsccue;": "⋡",
  "nsce;": "⪰̸",
  "nscr;": "𝓃",
  "nshortmid;": "∤",
  "nshortparallel;": "∦",
  "nsim;": "≁",
  "nsime;": "≄",
  "nsimeq;": "≄",
  "nsmid;": "∤",
  "nspar;": "∦",
  "nsqsube;": "⋢",
  "nsqsupe;": "⋣",
  "nsub;": "⊄",
  "nsubE;": "⫅̸",
  "nsube;": "⊈",
  "nsubset;": "⊂⃒",
  "nsubseteq;": "⊈",
  "nsubseteqq;": "⫅̸",
  "nsucc;": "⊁",
  "nsucceq;": "⪰̸",
  "nsup;": "⊅",
  "nsupE;": "⫆̸",
  "nsupe;": "⊉",
  "nsupset;": "⊃⃒",
  "nsupseteq;": "⊉",
  "nsupseteqq;": "⫆̸",
  "ntgl;": "≹",
  ntilde: "ñ",
  "ntilde;": "ñ",
  "ntlg;": "≸",
  "ntriangleleft;": "⋪",
  "ntrianglelefteq;": "⋬",
  "ntriangleright;": "⋫",
  "ntrianglerighteq;": "⋭",
  "nu;": "ν",
  "num;": "#",
  "numero;": "№",
  "numsp;": " ",
  "nvDash;": "⊭",
  "nvHarr;": "⤄",
  "nvap;": "≍⃒",
  "nvdash;": "⊬",
  "nvge;": "≥⃒",
  "nvgt;": ">⃒",
  "nvinfin;": "⧞",
  "nvlArr;": "⤂",
  "nvle;": "≤⃒",
  "nvlt;": "<⃒",
  "nvltrie;": "⊴⃒",
  "nvrArr;": "⤃",
  "nvrtrie;": "⊵⃒",
  "nvsim;": "∼⃒",
  "nwArr;": "⇖",
  "nwarhk;": "⤣",
  "nwarr;": "↖",
  "nwarrow;": "↖",
  "nwnear;": "⤧",
  "oS;": "Ⓢ",
  oacute: "ó",
  "oacute;": "ó",
  "oast;": "⊛",
  "ocir;": "⊚",
  ocirc: "ô",
  "ocirc;": "ô",
  "ocy;": "о",
  "odash;": "⊝",
  "odblac;": "ő",
  "odiv;": "⨸",
  "odot;": "⊙",
  "odsold;": "⦼",
  "oelig;": "œ",
  "ofcir;": "⦿",
  "ofr;": "𝔬",
  "ogon;": "˛",
  ograve: "ò",
  "ograve;": "ò",
  "ogt;": "⧁",
  "ohbar;": "⦵",
  "ohm;": "Ω",
  "oint;": "∮",
  "olarr;": "↺",
  "olcir;": "⦾",
  "olcross;": "⦻",
  "oline;": "‾",
  "olt;": "⧀",
  "omacr;": "ō",
  "omega;": "ω",
  "omicron;": "ο",
  "omid;": "⦶",
  "ominus;": "⊖",
  "oopf;": "𝕠",
  "opar;": "⦷",
  "operp;": "⦹",
  "oplus;": "⊕",
  "or;": "∨",
  "orarr;": "↻",
  "ord;": "⩝",
  "order;": "ℴ",
  "orderof;": "ℴ",
  ordf: "ª",
  "ordf;": "ª",
  ordm: "º",
  "ordm;": "º",
  "origof;": "⊶",
  "oror;": "⩖",
  "orslope;": "⩗",
  "orv;": "⩛",
  "oscr;": "ℴ",
  oslash: "ø",
  "oslash;": "ø",
  "osol;": "⊘",
  otilde: "õ",
  "otilde;": "õ",
  "otimes;": "⊗",
  "otimesas;": "⨶",
  ouml: "ö",
  "ouml;": "ö",
  "ovbar;": "⌽",
  "par;": "∥",
  para: "¶",
  "para;": "¶",
  "parallel;": "∥",
  "parsim;": "⫳",
  "parsl;": "⫽",
  "part;": "∂",
  "pcy;": "п",
  "percnt;": "%",
  "period;": ".",
  "permil;": "‰",
  "perp;": "⊥",
  "pertenk;": "‱",
  "pfr;": "𝔭",
  "phi;": "φ",
  "phiv;": "ϕ",
  "phmmat;": "ℳ",
  "phone;": "☎",
  "pi;": "π",
  "pitchfork;": "⋔",
  "piv;": "ϖ",
  "planck;": "ℏ",
  "planckh;": "ℎ",
  "plankv;": "ℏ",
  "plus;": "+",
  "plusacir;": "⨣",
  "plusb;": "⊞",
  "pluscir;": "⨢",
  "plusdo;": "∔",
  "plusdu;": "⨥",
  "pluse;": "⩲",
  plusmn: "±",
  "plusmn;": "±",
  "plussim;": "⨦",
  "plustwo;": "⨧",
  "pm;": "±",
  "pointint;": "⨕",
  "popf;": "𝕡",
  pound: "£",
  "pound;": "£",
  "pr;": "≺",
  "prE;": "⪳",
  "prap;": "⪷",
  "prcue;": "≼",
  "pre;": "⪯",
  "prec;": "≺",
  "precapprox;": "⪷",
  "preccurlyeq;": "≼",
  "preceq;": "⪯",
  "precnapprox;": "⪹",
  "precneqq;": "⪵",
  "precnsim;": "⋨",
  "precsim;": "≾",
  "prime;": "′",
  "primes;": "ℙ",
  "prnE;": "⪵",
  "prnap;": "⪹",
  "prnsim;": "⋨",
  "prod;": "∏",
  "profalar;": "⌮",
  "profline;": "⌒",
  "profsurf;": "⌓",
  "prop;": "∝",
  "propto;": "∝",
  "prsim;": "≾",
  "prurel;": "⊰",
  "pscr;": "𝓅",
  "psi;": "ψ",
  "puncsp;": " ",
  "qfr;": "𝔮",
  "qint;": "⨌",
  "qopf;": "𝕢",
  "qprime;": "⁗",
  "qscr;": "𝓆",
  "quaternions;": "ℍ",
  "quatint;": "⨖",
  "quest;": "?",
  "questeq;": "≟",
  quot: '"',
  "quot;": '"',
  "rAarr;": "⇛",
  "rArr;": "⇒",
  "rAtail;": "⤜",
  "rBarr;": "⤏",
  "rHar;": "⥤",
  "race;": "∽̱",
  "racute;": "ŕ",
  "radic;": "√",
  "raemptyv;": "⦳",
  "rang;": "⟩",
  "rangd;": "⦒",
  "range;": "⦥",
  "rangle;": "⟩",
  raquo: "»",
  "raquo;": "»",
  "rarr;": "→",
  "rarrap;": "⥵",
  "rarrb;": "⇥",
  "rarrbfs;": "⤠",
  "rarrc;": "⤳",
  "rarrfs;": "⤞",
  "rarrhk;": "↪",
  "rarrlp;": "↬",
  "rarrpl;": "⥅",
  "rarrsim;": "⥴",
  "rarrtl;": "↣",
  "rarrw;": "↝",
  "ratail;": "⤚",
  "ratio;": "∶",
  "rationals;": "ℚ",
  "rbarr;": "⤍",
  "rbbrk;": "❳",
  "rbrace;": "}",
  "rbrack;": "]",
  "rbrke;": "⦌",
  "rbrksld;": "⦎",
  "rbrkslu;": "⦐",
  "rcaron;": "ř",
  "rcedil;": "ŗ",
  "rceil;": "⌉",
  "rcub;": "}",
  "rcy;": "р",
  "rdca;": "⤷",
  "rdldhar;": "⥩",
  "rdquo;": "”",
  "rdquor;": "”",
  "rdsh;": "↳",
  "real;": "ℜ",
  "realine;": "ℛ",
  "realpart;": "ℜ",
  "reals;": "ℝ",
  "rect;": "▭",
  reg: "®",
  "reg;": "®",
  "rfisht;": "⥽",
  "rfloor;": "⌋",
  "rfr;": "𝔯",
  "rhard;": "⇁",
  "rharu;": "⇀",
  "rharul;": "⥬",
  "rho;": "ρ",
  "rhov;": "ϱ",
  "rightarrow;": "→",
  "rightarrowtail;": "↣",
  "rightharpoondown;": "⇁",
  "rightharpoonup;": "⇀",
  "rightleftarrows;": "⇄",
  "rightleftharpoons;": "⇌",
  "rightrightarrows;": "⇉",
  "rightsquigarrow;": "↝",
  "rightthreetimes;": "⋌",
  "ring;": "˚",
  "risingdotseq;": "≓",
  "rlarr;": "⇄",
  "rlhar;": "⇌",
  "rlm;": "‏",
  "rmoust;": "⎱",
  "rmoustache;": "⎱",
  "rnmid;": "⫮",
  "roang;": "⟭",
  "roarr;": "⇾",
  "robrk;": "⟧",
  "ropar;": "⦆",
  "ropf;": "𝕣",
  "roplus;": "⨮",
  "rotimes;": "⨵",
  "rpar;": ")",
  "rpargt;": "⦔",
  "rppolint;": "⨒",
  "rrarr;": "⇉",
  "rsaquo;": "›",
  "rscr;": "𝓇",
  "rsh;": "↱",
  "rsqb;": "]",
  "rsquo;": "’",
  "rsquor;": "’",
  "rthree;": "⋌",
  "rtimes;": "⋊",
  "rtri;": "▹",
  "rtrie;": "⊵",
  "rtrif;": "▸",
  "rtriltri;": "⧎",
  "ruluhar;": "⥨",
  "rx;": "℞",
  "sacute;": "ś",
  "sbquo;": "‚",
  "sc;": "≻",
  "scE;": "⪴",
  "scap;": "⪸",
  "scaron;": "š",
  "sccue;": "≽",
  "sce;": "⪰",
  "scedil;": "ş",
  "scirc;": "ŝ",
  "scnE;": "⪶",
  "scnap;": "⪺",
  "scnsim;": "⋩",
  "scpolint;": "⨓",
  "scsim;": "≿",
  "scy;": "с",
  "sdot;": "⋅",
  "sdotb;": "⊡",
  "sdote;": "⩦",
  "seArr;": "⇘",
  "searhk;": "⤥",
  "searr;": "↘",
  "searrow;": "↘",
  sect: "§",
  "sect;": "§",
  "semi;": ";",
  "seswar;": "⤩",
  "setminus;": "∖",
  "setmn;": "∖",
  "sext;": "✶",
  "sfr;": "𝔰",
  "sfrown;": "⌢",
  "sharp;": "♯",
  "shchcy;": "щ",
  "shcy;": "ш",
  "shortmid;": "∣",
  "shortparallel;": "∥",
  shy: "­",
  "shy;": "­",
  "sigma;": "σ",
  "sigmaf;": "ς",
  "sigmav;": "ς",
  "sim;": "∼",
  "simdot;": "⩪",
  "sime;": "≃",
  "simeq;": "≃",
  "simg;": "⪞",
  "simgE;": "⪠",
  "siml;": "⪝",
  "simlE;": "⪟",
  "simne;": "≆",
  "simplus;": "⨤",
  "simrarr;": "⥲",
  "slarr;": "←",
  "smallsetminus;": "∖",
  "smashp;": "⨳",
  "smeparsl;": "⧤",
  "smid;": "∣",
  "smile;": "⌣",
  "smt;": "⪪",
  "smte;": "⪬",
  "smtes;": "⪬︀",
  "softcy;": "ь",
  "sol;": "/",
  "solb;": "⧄",
  "solbar;": "⌿",
  "sopf;": "𝕤",
  "spades;": "♠",
  "spadesuit;": "♠",
  "spar;": "∥",
  "sqcap;": "⊓",
  "sqcaps;": "⊓︀",
  "sqcup;": "⊔",
  "sqcups;": "⊔︀",
  "sqsub;": "⊏",
  "sqsube;": "⊑",
  "sqsubset;": "⊏",
  "sqsubseteq;": "⊑",
  "sqsup;": "⊐",
  "sqsupe;": "⊒",
  "sqsupset;": "⊐",
  "sqsupseteq;": "⊒",
  "squ;": "□",
  "square;": "□",
  "squarf;": "▪",
  "squf;": "▪",
  "srarr;": "→",
  "sscr;": "𝓈",
  "ssetmn;": "∖",
  "ssmile;": "⌣",
  "sstarf;": "⋆",
  "star;": "☆",
  "starf;": "★",
  "straightepsilon;": "ϵ",
  "straightphi;": "ϕ",
  "strns;": "¯",
  "sub;": "⊂",
  "subE;": "⫅",
  "subdot;": "⪽",
  "sube;": "⊆",
  "subedot;": "⫃",
  "submult;": "⫁",
  "subnE;": "⫋",
  "subne;": "⊊",
  "subplus;": "⪿",
  "subrarr;": "⥹",
  "subset;": "⊂",
  "subseteq;": "⊆",
  "subseteqq;": "⫅",
  "subsetneq;": "⊊",
  "subsetneqq;": "⫋",
  "subsim;": "⫇",
  "subsub;": "⫕",
  "subsup;": "⫓",
  "succ;": "≻",
  "succapprox;": "⪸",
  "succcurlyeq;": "≽",
  "succeq;": "⪰",
  "succnapprox;": "⪺",
  "succneqq;": "⪶",
  "succnsim;": "⋩",
  "succsim;": "≿",
  "sum;": "∑",
  "sung;": "♪",
  sup1: "¹",
  "sup1;": "¹",
  sup2: "²",
  "sup2;": "²",
  sup3: "³",
  "sup3;": "³",
  "sup;": "⊃",
  "supE;": "⫆",
  "supdot;": "⪾",
  "supdsub;": "⫘",
  "supe;": "⊇",
  "supedot;": "⫄",
  "suphsol;": "⟉",
  "suphsub;": "⫗",
  "suplarr;": "⥻",
  "supmult;": "⫂",
  "supnE;": "⫌",
  "supne;": "⊋",
  "supplus;": "⫀",
  "supset;": "⊃",
  "supseteq;": "⊇",
  "supseteqq;": "⫆",
  "supsetneq;": "⊋",
  "supsetneqq;": "⫌",
  "supsim;": "⫈",
  "supsub;": "⫔",
  "supsup;": "⫖",
  "swArr;": "⇙",
  "swarhk;": "⤦",
  "swarr;": "↙",
  "swarrow;": "↙",
  "swnwar;": "⤪",
  szlig: "ß",
  "szlig;": "ß",
  "target;": "⌖",
  "tau;": "τ",
  "tbrk;": "⎴",
  "tcaron;": "ť",
  "tcedil;": "ţ",
  "tcy;": "т",
  "tdot;": "⃛",
  "telrec;": "⌕",
  "tfr;": "𝔱",
  "there4;": "∴",
  "therefore;": "∴",
  "theta;": "θ",
  "thetasym;": "ϑ",
  "thetav;": "ϑ",
  "thickapprox;": "≈",
  "thicksim;": "∼",
  "thinsp;": " ",
  "thkap;": "≈",
  "thksim;": "∼",
  thorn: "þ",
  "thorn;": "þ",
  "tilde;": "˜",
  times: "×",
  "times;": "×",
  "timesb;": "⊠",
  "timesbar;": "⨱",
  "timesd;": "⨰",
  "tint;": "∭",
  "toea;": "⤨",
  "top;": "⊤",
  "topbot;": "⌶",
  "topcir;": "⫱",
  "topf;": "𝕥",
  "topfork;": "⫚",
  "tosa;": "⤩",
  "tprime;": "‴",
  "trade;": "™",
  "triangle;": "▵",
  "triangledown;": "▿",
  "triangleleft;": "◃",
  "trianglelefteq;": "⊴",
  "triangleq;": "≜",
  "triangleright;": "▹",
  "trianglerighteq;": "⊵",
  "tridot;": "◬",
  "trie;": "≜",
  "triminus;": "⨺",
  "triplus;": "⨹",
  "trisb;": "⧍",
  "tritime;": "⨻",
  "trpezium;": "⏢",
  "tscr;": "𝓉",
  "tscy;": "ц",
  "tshcy;": "ћ",
  "tstrok;": "ŧ",
  "twixt;": "≬",
  "twoheadleftarrow;": "↞",
  "twoheadrightarrow;": "↠",
  "uArr;": "⇑",
  "uHar;": "⥣",
  uacute: "ú",
  "uacute;": "ú",
  "uarr;": "↑",
  "ubrcy;": "ў",
  "ubreve;": "ŭ",
  ucirc: "û",
  "ucirc;": "û",
  "ucy;": "у",
  "udarr;": "⇅",
  "udblac;": "ű",
  "udhar;": "⥮",
  "ufisht;": "⥾",
  "ufr;": "𝔲",
  ugrave: "ù",
  "ugrave;": "ù",
  "uharl;": "↿",
  "uharr;": "↾",
  "uhblk;": "▀",
  "ulcorn;": "⌜",
  "ulcorner;": "⌜",
  "ulcrop;": "⌏",
  "ultri;": "◸",
  "umacr;": "ū",
  uml: "¨",
  "uml;": "¨",
  "uogon;": "ų",
  "uopf;": "𝕦",
  "uparrow;": "↑",
  "updownarrow;": "↕",
  "upharpoonleft;": "↿",
  "upharpoonright;": "↾",
  "uplus;": "⊎",
  "upsi;": "υ",
  "upsih;": "ϒ",
  "upsilon;": "υ",
  "upuparrows;": "⇈",
  "urcorn;": "⌝",
  "urcorner;": "⌝",
  "urcrop;": "⌎",
  "uring;": "ů",
  "urtri;": "◹",
  "uscr;": "𝓊",
  "utdot;": "⋰",
  "utilde;": "ũ",
  "utri;": "▵",
  "utrif;": "▴",
  "uuarr;": "⇈",
  uuml: "ü",
  "uuml;": "ü",
  "uwangle;": "⦧",
  "vArr;": "⇕",
  "vBar;": "⫨",
  "vBarv;": "⫩",
  "vDash;": "⊨",
  "vangrt;": "⦜",
  "varepsilon;": "ϵ",
  "varkappa;": "ϰ",
  "varnothing;": "∅",
  "varphi;": "ϕ",
  "varpi;": "ϖ",
  "varpropto;": "∝",
  "varr;": "↕",
  "varrho;": "ϱ",
  "varsigma;": "ς",
  "varsubsetneq;": "⊊︀",
  "varsubsetneqq;": "⫋︀",
  "varsupsetneq;": "⊋︀",
  "varsupsetneqq;": "⫌︀",
  "vartheta;": "ϑ",
  "vartriangleleft;": "⊲",
  "vartriangleright;": "⊳",
  "vcy;": "в",
  "vdash;": "⊢",
  "vee;": "∨",
  "veebar;": "⊻",
  "veeeq;": "≚",
  "vellip;": "⋮",
  "verbar;": "|",
  "vert;": "|",
  "vfr;": "𝔳",
  "vltri;": "⊲",
  "vnsub;": "⊂⃒",
  "vnsup;": "⊃⃒",
  "vopf;": "𝕧",
  "vprop;": "∝",
  "vrtri;": "⊳",
  "vscr;": "𝓋",
  "vsubnE;": "⫋︀",
  "vsubne;": "⊊︀",
  "vsupnE;": "⫌︀",
  "vsupne;": "⊋︀",
  "vzigzag;": "⦚",
  "wcirc;": "ŵ",
  "wedbar;": "⩟",
  "wedge;": "∧",
  "wedgeq;": "≙",
  "weierp;": "℘",
  "wfr;": "𝔴",
  "wopf;": "𝕨",
  "wp;": "℘",
  "wr;": "≀",
  "wreath;": "≀",
  "wscr;": "𝓌",
  "xcap;": "⋂",
  "xcirc;": "◯",
  "xcup;": "⋃",
  "xdtri;": "▽",
  "xfr;": "𝔵",
  "xhArr;": "⟺",
  "xharr;": "⟷",
  "xi;": "ξ",
  "xlArr;": "⟸",
  "xlarr;": "⟵",
  "xmap;": "⟼",
  "xnis;": "⋻",
  "xodot;": "⨀",
  "xopf;": "𝕩",
  "xoplus;": "⨁",
  "xotime;": "⨂",
  "xrArr;": "⟹",
  "xrarr;": "⟶",
  "xscr;": "𝓍",
  "xsqcup;": "⨆",
  "xuplus;": "⨄",
  "xutri;": "△",
  "xvee;": "⋁",
  "xwedge;": "⋀",
  yacute: "ý",
  "yacute;": "ý",
  "yacy;": "я",
  "ycirc;": "ŷ",
  "ycy;": "ы",
  yen: "¥",
  "yen;": "¥",
  "yfr;": "𝔶",
  "yicy;": "ї",
  "yopf;": "𝕪",
  "yscr;": "𝓎",
  "yucy;": "ю",
  yuml: "ÿ",
  "yuml;": "ÿ",
  "zacute;": "ź",
  "zcaron;": "ž",
  "zcy;": "з",
  "zdot;": "ż",
  "zeetrf;": "ℨ",
  "zeta;": "ζ",
  "zfr;": "𝔷",
  "zhcy;": "ж",
  "zigrarr;": "⇝",
  "zopf;": "𝕫",
  "zscr;": "𝓏",
  "zwj;": "‍",
  "zwnj;": "‌"
};
const numeric = /&#(x)?([0-9a-f]+);/i;
const named = new RegExp(
  `&(${Object.keys(entities).sort((a, b) => b.length - a.length).join("|")})`,
  "g"
);
function decode(str) {
  return str.replace(numeric, (_match, hex, code) => String.fromCharCode(hex ? parseInt(code, 16) : +code)).replace(named, (_match, entity) => entities[entity]);
}
const DOCTYPE = "DOCTYPE";
const CDATA_OPEN = "[CDATA[";
const CDATA_CLOSE = "]]>";
const COMMENT_OPEN = "--";
const COMMENT_CLOSE = "-->";
const TAG_OPEN = /[a-zA-Z]/;
const TAG_CHAR = /[a-zA-Z0-9]/;
const ATTRIBUTE_NAME = /[^\t\n\f />"'=]/;
const WHITESPACE = /[\s\n\r]/;
function crawl(html, base) {
  const ids = [];
  const hrefs = [];
  let i = 0;
  main:
    while (i < html.length) {
      const char = html[i];
      if (char === "<") {
        if (html[i + 1] === "!") {
          i += 2;
          if (html.slice(i, i + DOCTYPE.length).toUpperCase() === DOCTYPE) {
            i += DOCTYPE.length;
            while (i < html.length) {
              if (html[i++] === ">") {
                continue main;
              }
            }
          }
          if (html.slice(i, i + CDATA_OPEN.length) === CDATA_OPEN) {
            i += CDATA_OPEN.length;
            while (i < html.length) {
              if (html.slice(i, i + CDATA_CLOSE.length) === CDATA_CLOSE) {
                i += CDATA_CLOSE.length;
                continue main;
              }
              i += 1;
            }
          }
          if (html.slice(i, i + COMMENT_OPEN.length) === COMMENT_OPEN) {
            i += COMMENT_OPEN.length;
            while (i < html.length) {
              if (html.slice(i, i + COMMENT_CLOSE.length) === COMMENT_CLOSE) {
                i += COMMENT_CLOSE.length;
                continue main;
              }
              i += 1;
            }
          }
        }
        const start = ++i;
        if (TAG_OPEN.test(html[start])) {
          while (i < html.length) {
            if (!TAG_CHAR.test(html[i])) {
              break;
            }
            i += 1;
          }
          const tag = html.slice(start, i).toUpperCase();
          if (tag === "SCRIPT" || tag === "STYLE") {
            while (i < html.length) {
              if (html[i] === "<" && html[i + 1] === "/" && html.slice(i + 2, i + 2 + tag.length).toUpperCase() === tag) {
                continue main;
              }
              i += 1;
            }
          }
          let href = "";
          let rel = "";
          while (i < html.length) {
            const start2 = i;
            const char2 = html[start2];
            if (char2 === ">")
              break;
            if (ATTRIBUTE_NAME.test(char2)) {
              i += 1;
              while (i < html.length) {
                if (!ATTRIBUTE_NAME.test(html[i])) {
                  break;
                }
                i += 1;
              }
              const name = html.slice(start2, i).toLowerCase();
              while (WHITESPACE.test(html[i]))
                i += 1;
              if (html[i] === "=") {
                i += 1;
                while (WHITESPACE.test(html[i]))
                  i += 1;
                let value;
                if (html[i] === "'" || html[i] === '"') {
                  const quote = html[i++];
                  const start3 = i;
                  let escaped = false;
                  while (i < html.length) {
                    if (escaped) {
                      escaped = false;
                    } else {
                      const char3 = html[i];
                      if (html[i] === quote) {
                        break;
                      }
                      if (char3 === "\\") {
                        escaped = true;
                      }
                    }
                    i += 1;
                  }
                  value = html.slice(start3, i);
                } else {
                  const start3 = i;
                  while (html[i] !== ">" && !WHITESPACE.test(html[i]))
                    i += 1;
                  value = html.slice(start3, i);
                  i -= 1;
                }
                value = decode(value);
                if (name === "href") {
                  if (tag === "BASE") {
                    base = resolve(base, value);
                  } else {
                    href = resolve(base, value);
                  }
                } else if (name === "id") {
                  ids.push(value);
                } else if (name === "name") {
                  if (tag === "A")
                    ids.push(value);
                } else if (name === "rel") {
                  rel = value;
                } else if (name === "src") {
                  if (value)
                    hrefs.push(resolve(base, value));
                } else if (name === "srcset") {
                  const candidates = [];
                  let insideURL = true;
                  value = value.trim();
                  for (let i2 = 0; i2 < value.length; i2++) {
                    if (value[i2] === "," && (!insideURL || insideURL && value[i2 + 1] === " ")) {
                      candidates.push(value.slice(0, i2));
                      value = value.substring(i2 + 1).trim();
                      i2 = 0;
                      insideURL = true;
                    } else if (value[i2] === " ") {
                      insideURL = false;
                    }
                  }
                  candidates.push(value);
                  for (const candidate of candidates) {
                    const src = candidate.split(WHITESPACE)[0];
                    if (src)
                      hrefs.push(resolve(base, src));
                  }
                }
              } else {
                i -= 1;
              }
            }
            i += 1;
          }
          if (href && !/\bexternal\b/i.test(rel)) {
            hrefs.push(resolve(base, href));
          }
        }
      }
      i += 1;
    }
  return { ids, hrefs };
}
function forked(module, callback) {
  if (process.env.SVELTEKIT_FORK && process.send) {
    process.send({ type: "ready", module });
    process.on(
      "message",
      /** @param {any} data */
      async (data) => {
        if (data?.type === "args" && data.module === module) {
          if (process.send) {
            process.send({
              type: "result",
              module,
              payload: await callback(data.payload)
            });
          }
        }
      }
    );
  }
  const fn = function(opts) {
    return new Promise((fulfil, reject) => {
      const child = child_process.fork(fileURLToPath(module), {
        stdio: "inherit",
        env: {
          ...process.env,
          SVELTEKIT_FORK: "true"
        },
        serialization: "advanced"
      });
      child.on(
        "message",
        /** @param {any} data */
        (data) => {
          if (data?.type === "ready" && data.module === module) {
            child.send({
              type: "args",
              module,
              payload: opts
            });
          }
          if (data?.type === "result" && data.module === module) {
            child.kill();
            fulfil(data.payload);
          }
        }
      );
      child.on("exit", (code) => {
        if (code) {
          reject(new Error(`Failed with code ${code}`));
        }
      });
    });
  };
  return fn;
}
forked(import.meta.url, prerender);
async function prerender({ out, manifest_path, metadata, verbose, env }) {
  const manifest = (await import(pathToFileURL(manifest_path).href)).manifest;
  const internal = await import(pathToFileURL(`${out}/server/internal.js`).href);
  const { Server } = await import(pathToFileURL(`${out}/server/index.js`).href);
  internal.set_building(true);
  function normalise_error_handler(log2, input, format) {
    switch (input) {
      case "fail":
        return (details) => {
          throw new Error(format(details));
        };
      case "warn":
        return (details) => {
          log2.error(format(details));
        };
      case "ignore":
        return () => {
        };
      default:
        return (details) => input({ ...details, message: format(details) });
    }
  }
  const OK = 2;
  const REDIRECT = 3;
  const prerendered = {
    pages: /* @__PURE__ */ new Map(),
    assets: /* @__PURE__ */ new Map(),
    redirects: /* @__PURE__ */ new Map(),
    paths: []
  };
  const prerender_map = /* @__PURE__ */ new Map();
  for (const [id, { prerender: prerender2 }] of metadata.routes) {
    if (prerender2 !== void 0) {
      prerender_map.set(id, prerender2);
    }
  }
  const prerendered_routes = /* @__PURE__ */ new Set();
  const config = (await load_config()).kit;
  const log = logger({ verbose });
  if (should_polyfill) {
    installPolyfills();
  }
  const saved = /* @__PURE__ */ new Map();
  const server = new Server(manifest);
  await server.init({ env });
  const handle_http_error = normalise_error_handler(
    log,
    config.prerender.handleHttpError,
    ({ status, path: path2, referrer, referenceType }) => {
      const message = status === 404 && !path2.startsWith(config.paths.base) ? `${path2} does not begin with \`base\`, which is configured in \`paths.base\` and can be imported from \`$app/paths\` - see https://kit.svelte.dev/docs/configuration#paths for more info` : path2;
      return `${status} ${message}${referrer ? ` (${referenceType} from ${referrer})` : ""}`;
    }
  );
  const handle_missing_id = normalise_error_handler(
    log,
    config.prerender.handleMissingId,
    ({ path: path2, id, referrers }) => {
      return `The following pages contain links to ${path2}#${id}, but no element with id="${id}" exists on ${path2} - see the \`handleMissingId\` option in https://kit.svelte.dev/docs/configuration#prerender for more info:` + referrers.map((l) => `
  - ${l}`).join("");
    }
  );
  const q = queue(config.prerender.concurrency);
  function output_filename(path2, is_html) {
    const file = path2.slice(config.paths.base.length + 1) || "index.html";
    if (is_html && !file.endsWith(".html")) {
      return file + (file.endsWith("/") ? "index.html" : ".html");
    }
    return file;
  }
  const files = new Set(walk(`${out}/client`).map(posixify));
  const immutable = `${config.appDir}/immutable`;
  if (existsSync(`${out}/server/${immutable}`)) {
    for (const file of walk(`${out}/server/${immutable}`)) {
      files.add(posixify(`${config.appDir}/immutable/${file}`));
    }
  }
  const seen = /* @__PURE__ */ new Set();
  const written = /* @__PURE__ */ new Set();
  const expected_hashlinks = /* @__PURE__ */ new Map();
  const actual_hashlinks = /* @__PURE__ */ new Map();
  function enqueue(referrer, decoded, encoded) {
    if (seen.has(decoded))
      return;
    seen.add(decoded);
    const file = decoded.slice(config.paths.base.length + 1);
    if (files.has(file))
      return;
    return q.add(() => visit(decoded, encoded || encodeURI(decoded), referrer));
  }
  async function visit(decoded, encoded, referrer) {
    if (!decoded.startsWith(config.paths.base)) {
      handle_http_error({ status: 404, path: decoded, referrer, referenceType: "linked" });
      return;
    }
    const dependencies = /* @__PURE__ */ new Map();
    const response = await server.respond(new Request(config.prerender.origin + encoded), {
      getClientAddress() {
        throw new Error("Cannot read clientAddress during prerendering");
      },
      prerendering: {
        dependencies
      },
      read: (file) => {
        const filepath = saved.get(file);
        if (filepath)
          return readFileSync(filepath);
        return readFileSync(join(config.files.assets, file));
      }
    });
    const body = Buffer.from(await response.arrayBuffer());
    save("pages", response, body, decoded, encoded, referrer, "linked");
    for (const [dependency_path, result] of dependencies) {
      const encoded_dependency_path = new URL(dependency_path, "http://localhost").pathname;
      const decoded_dependency_path = decode_uri(encoded_dependency_path);
      const headers2 = Object.fromEntries(result.response.headers);
      const prerender2 = headers2["x-sveltekit-prerender"];
      if (prerender2) {
        const encoded_route_id = headers2["x-sveltekit-routeid"];
        if (encoded_route_id != null) {
          const route_id = decode_uri(encoded_route_id);
          const existing_value = prerender_map.get(route_id);
          if (existing_value !== "auto") {
            prerender_map.set(route_id, prerender2 === "true" ? true : "auto");
          }
        }
      }
      const body2 = result.body ?? new Uint8Array(await result.response.arrayBuffer());
      save(
        "dependencies",
        result.response,
        body2,
        decoded_dependency_path,
        encoded_dependency_path,
        decoded,
        "fetched"
      );
    }
    const headers = Object.fromEntries(response.headers);
    if (config.prerender.crawl && headers["content-type"] === "text/html") {
      const { ids, hrefs } = crawl(body.toString(), decoded);
      actual_hashlinks.set(decoded, ids);
      for (const href of hrefs) {
        if (!is_root_relative(href))
          continue;
        const { pathname, search, hash } = new URL(href, "http://localhost");
        if (hash) {
          const key = decode_uri(pathname + hash);
          if (!expected_hashlinks.has(key)) {
            expected_hashlinks.set(key, /* @__PURE__ */ new Set());
          }
          expected_hashlinks.get(key).add(decoded);
        }
        enqueue(decoded, decode_uri(pathname), pathname);
      }
    }
  }
  function save(category, response, body, decoded, encoded, referrer, referenceType) {
    const response_type = Math.floor(response.status / 100);
    const headers = Object.fromEntries(response.headers);
    const type = headers["content-type"];
    const is_html = response_type === REDIRECT || type === "text/html";
    const file = output_filename(decoded, is_html);
    const dest = `${config.outDir}/output/prerendered/${category}/${file}`;
    if (written.has(file))
      return;
    const encoded_route_id = response.headers.get("x-sveltekit-routeid");
    const route_id = encoded_route_id != null ? decode_uri(encoded_route_id) : null;
    if (route_id !== null)
      prerendered_routes.add(route_id);
    if (response_type === REDIRECT) {
      const location = headers["location"];
      if (location) {
        const resolved = resolve(encoded, location);
        if (is_root_relative(resolved)) {
          enqueue(decoded, decode_uri(resolved), resolved);
        }
        if (!headers["x-sveltekit-normalize"]) {
          mkdirp(dirname(dest));
          log.warn(`${response.status} ${decoded} -> ${location}`);
          writeFileSync(
            dest,
            `<meta http-equiv="refresh" content=${escape_html_attr(`0;url=${location}`)}>`
          );
          written.add(file);
          if (!prerendered.redirects.has(decoded)) {
            prerendered.redirects.set(decoded, {
              status: response.status,
              location: resolved
            });
            prerendered.paths.push(decoded);
          }
        }
      } else {
        log.warn(`location header missing on redirect received from ${decoded}`);
      }
      return;
    }
    if (response.status === 200) {
      mkdirp(dirname(dest));
      log.info(`${response.status} ${decoded}`);
      writeFileSync(dest, body);
      written.add(file);
      if (is_html) {
        prerendered.pages.set(decoded, {
          file
        });
      } else {
        prerendered.assets.set(decoded, {
          type
        });
      }
      prerendered.paths.push(decoded);
    } else if (response_type !== OK) {
      handle_http_error({ status: response.status, path: decoded, referrer, referenceType });
    }
    manifest.assets.add(file);
    saved.set(file, dest);
  }
  if (config.prerender.entries.length > 1 || config.prerender.entries[0] !== "*" || prerender_map.size > 0) {
    log.info("Prerendering");
  }
  for (const entry of config.prerender.entries) {
    if (entry === "*") {
      for (const [id, prerender2] of prerender_map) {
        if (prerender2) {
          if (id.includes("["))
            continue;
          const path2 = `/${get_route_segments(id).join("/")}`;
          enqueue(null, config.paths.base + path2);
        }
      }
    } else {
      enqueue(null, config.paths.base + entry);
    }
  }
  await q.done();
  for (const [key, referrers] of expected_hashlinks) {
    const index = key.indexOf("#");
    const path2 = key.slice(0, index);
    const id = key.slice(index + 1);
    const hashlinks = actual_hashlinks.get(path2);
    if (!hashlinks)
      continue;
    if (!hashlinks.includes(id)) {
      handle_missing_id({ id, path: path2, referrers: Array.from(referrers) });
    }
  }
  const not_prerendered = [];
  for (const [route_id, prerender2] of prerender_map) {
    if (prerender2 === true && !prerendered_routes.has(route_id)) {
      not_prerendered.push(route_id);
    }
  }
  if (not_prerendered.length > 0) {
    throw new Error(
      `The following routes were marked as prerenderable, but were not prerendered because they were not found while crawling your app:
${not_prerendered.map(
        (id) => `  - ${id}`
      )}

See https://kit.svelte.dev/docs/page-options#prerender-troubleshooting for info on how to solve this`
    );
  }
  return { prerendered, prerender_map };
}
forked(import.meta.url, analyse);
async function analyse({ manifest_path, env }) {
  const manifest = (await import(pathToFileURL(manifest_path).href)).manifest;
  const config = (await load_config()).kit;
  const server_root = join(config.outDir, "output");
  const internal = await import(pathToFileURL(`${server_root}/server/internal.js`).href);
  if (should_polyfill) {
    installPolyfills();
  }
  internal.set_building(true);
  const entries = Object.entries(env);
  const prefix = config.env.publicPrefix;
  internal.set_private_env(Object.fromEntries(entries.filter(([k]) => !k.startsWith(prefix))));
  internal.set_public_env(Object.fromEntries(entries.filter(([k]) => k.startsWith(prefix))));
  const metadata = {
    nodes: [],
    routes: /* @__PURE__ */ new Map()
  };
  for (const loader of manifest._.nodes) {
    const node = await loader();
    metadata.nodes[node.index] = {
      has_server_load: node.server?.load !== void 0
    };
  }
  for (const route of manifest._.routes) {
    const page_methods = [];
    const api_methods = [];
    let prerender2 = void 0;
    let config2 = void 0;
    if (route.endpoint) {
      const mod = await route.endpoint();
      if (mod.prerender !== void 0) {
        validate_server_exports(mod, route.id);
        if (mod.prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
          throw new Error(
            `Cannot prerender a +server file with POST, PATCH, PUT, or DELETE (${route.id})`
          );
        }
        prerender2 = mod.prerender;
      }
      if (mod.GET)
        api_methods.push("GET");
      if (mod.POST)
        api_methods.push("POST");
      if (mod.PUT)
        api_methods.push("PUT");
      if (mod.PATCH)
        api_methods.push("PATCH");
      if (mod.DELETE)
        api_methods.push("DELETE");
      if (mod.OPTIONS)
        api_methods.push("OPTIONS");
      config2 = mod.config;
    }
    if (route.page) {
      const nodes = await Promise.all(
        [...route.page.layouts, route.page.leaf].map((n) => {
          if (n !== void 0)
            return manifest._.nodes[n]();
        })
      );
      const layouts = nodes.slice(0, -1);
      const page = nodes.at(-1);
      for (const layout of layouts) {
        if (layout) {
          validate_common_exports(layout.server, layout.server_id);
          validate_common_exports(layout.universal, layout.universal_id);
        }
      }
      if (page) {
        page_methods.push("GET");
        if (page.server?.actions)
          page_methods.push("POST");
        validate_page_server_exports(page.server, page.server_id);
        validate_common_exports(page.universal, page.universal_id);
      }
      prerender2 = get_option(nodes, "prerender") ?? false;
      config2 = get_config(nodes);
    }
    metadata.routes.set(route.id, {
      config: config2,
      methods: Array.from(/* @__PURE__ */ new Set([...page_methods, ...api_methods])),
      page: {
        methods: page_methods
      },
      api: {
        methods: api_methods
      },
      prerender: prerender2
    });
  }
  return metadata;
}
function get_config(nodes) {
  let current = {};
  for (const node of nodes) {
    const config = node?.universal?.config ?? node?.server?.config;
    if (config) {
      current = {
        ...current,
        ...config
      };
    }
  }
  return Object.keys(current).length ? current : void 0;
}
process.cwd();
