/* ============================================================
   ETH Node.js Sandbox
   Executes real JavaScript in the browser and shims the Node.js
   core modules (fs, http, path, os, events, process, Buffer) so
   that lessons involving Node-only APIs still produce accurate,
   deterministic, LIVE output that reacts to code edits.
   ============================================================ */

const ETHSandbox = (() => {

  function inspect(val, depth = 0){
    if (depth > 4) return "…";
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    if (typeof val === "string") return depth === 0 ? val : `'${val}'`;
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    if (typeof val === "function") return `[Function: ${val.name || "anonymous"}]`;
    if (val instanceof Error) return `${val.name}: ${val.message}`;
    if (Array.isArray(val)) return `[ ${val.map(v => inspect(v, depth+1)).join(", ")} ]`;
    if (val instanceof Map) return `Map(${val.size}) { ${[...val].map(([k,v])=>`${inspect(k,depth+1)} => ${inspect(v,depth+1)}`).join(", ")} }`;
    if (val instanceof Set) return `Set(${val.size}) { ${[...val].map(v=>inspect(v,depth+1)).join(", ")} }`;
    if (typeof val === "object"){
      const entries = Object.entries(val).map(([k,v]) => `${k}: ${inspect(v, depth+1)}`);
      return `{ ${entries.join(", ")} }`;
    }
    return String(val);
  }

  function formatArgs(args){
    return args.map(a => inspect(a)).join(" ");
  }

  /* ---------- Node core module shims ---------- */
  function buildRequire(log, state){
    const modules = {
      "path": {
        join: (...parts) => parts.join("/").replace(/\/+/g,"/"),
        resolve: (...parts) => "/" + parts.join("/").replace(/\/+/g,"/").replace(/^\/+/,""),
        basename: p => String(p).split("/").pop(),
        dirname: p => String(p).split("/").slice(0,-1).join("/") || ".",
        extname: p => { const m = String(p).match(/(\.[^./]+)$/); return m ? m[1] : ""; },
        sep: "/"
      },
      "os": {
        platform: () => "linux",
        arch: () => "x64",
        cpus: () => Array.from({length:4}, (_,i)=>({model:`Virtual CPU ${i}`, speed:2600})),
        totalmem: () => 17179869184,
        freemem: () => 6442450944,
        homedir: () => "/home/eth-student",
        hostname: () => "eth-sandbox"
      },
      "events": (() => {
        class EventEmitter{
          constructor(){ this._events = {}; }
          on(name, fn){ (this._events[name] ??= []).push(fn); return this; }
          once(name, fn){ const wrap = (...a)=>{ this.off(name,wrap); fn(...a); }; return this.on(name, wrap); }
          off(name, fn){ this._events[name] = (this._events[name]||[]).filter(f=>f!==fn); return this; }
          emit(name, ...args){ (this._events[name]||[]).forEach(fn=>fn(...args)); return !!(this._events[name]||[]).length; }
        }
        return { EventEmitter };
      })(),
      "util": {
        inspect: (v) => inspect(v),
        format: (...a) => formatArgs(a),
        promisify: (fn) => (...args) => new Promise((res, rej) => fn(...args, (err, r) => err ? rej(err) : res(r)))
      },
      "fs": {
        __virtualFiles: { "notes.txt": "Learning Node.js with ETH!", "data.json": '{"course":"Node.js","level":"beginner"}' },
        readFileSync(fname, enc){
          const content = this.__virtualFiles[fname];
          if (content === undefined) { const e = new Error(`ENOENT: no such file or directory, open '${fname}'`); throw e; }
          return content;
        },
        writeFileSync(fname, data){ this.__virtualFiles[fname] = String(data); log(`(simulated fs) wrote ${String(data).length} bytes to ${fname}`, "info"); },
        existsSync(fname){ return Object.prototype.hasOwnProperty.call(this.__virtualFiles, fname); },
        readFile(fname, encOrCb, cb){
          const callback = typeof encOrCb === "function" ? encOrCb : cb;
          const content = this.__virtualFiles[fname];
          setTimeout(() => {
            if (content === undefined) callback(new Error(`ENOENT: no such file or directory, open '${fname}'`));
            else callback(null, content);
          }, 30);
        },
        writeFile(fname, data, cb){
          this.__virtualFiles[fname] = String(data);
          setTimeout(() => cb && cb(null), 30);
        }
      },
      "http": {
        createServer(handler){
          return {
            _handler: handler,
            listen(port, hostOrCb, cb){
              const callback = typeof hostOrCb === "function" ? hostOrCb : cb;
              const host = typeof hostOrCb === "string" ? hostOrCb : "127.0.0.1";
              setTimeout(() => {
                callback && callback();
                // Simulate one incoming request so learners see the handler fire.
                const req = { method: "GET", url: "/", headers: { host: `${host}:${port}` } };
                const res = {
                  statusCode: 200,
                  _headers: {},
                  setHeader(k,v){ this._headers[k]=v; },
                  end(body){ log(`(simulated request GET / → ${this.statusCode}) response body: ${inspect(body)}`, "info"); }
                };
                this._handler(req, res);
              }, 40);
              return this;
            }
          };
        }
      },
      "crypto": {
        randomUUID: () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
          const r = Math.random()*16|0, v = c === "x" ? r : (r&0x3|0x8); return v.toString(16);
        })
      }
    };
    return function require(name){
      const clean = name.replace(/^node:/, "");
      if (modules[clean]) return modules[clean];
      throw new Error(`Cannot find module '${name}' in the ETH sandbox (only core modules like fs, path, http, os, events, util, crypto are simulated here)`);
    };
  }

  /**
   * Executes user code and returns { lines: [{text,type}], error }
   * type: "ok" | "info" | "err"
   */
  function run(code){
    const lines = [];
    const push = (text, type="ok") => { String(text).split("\n").forEach(t => lines.push({ text: t, type })); };

    const sandboxConsole = {
      log:   (...a) => push(formatArgs(a), "ok"),
      info:  (...a) => push(formatArgs(a), "info"),
      warn:  (...a) => push("⚠ " + formatArgs(a), "info"),
      error: (...a) => push(formatArgs(a), "err"),
      table: (...a) => push(formatArgs(a), "ok")
    };

    const sandboxProcess = {
      env: { NODE_ENV: "development" },
      version: "v22.14.0",
      platform: "linux",
      argv: ["node", "app.js"],
      exit: (code) => push(`(process exited with code ${code ?? 0})`, "info"),
      nextTick: (fn, ...args) => setTimeout(() => fn(...args), 0),
      hrtime: () => [0, 0]
    };

    const req = buildRequire(push, {});
    const moduleShim = { exports: {} };

    let finished = false;
    const doneMarker = () => { finished = true; };

    try{
      const fn = new Function(
        "console", "require", "module", "exports", "process", "Buffer", "setTimeout", "setInterval", "clearTimeout", "clearInterval",
        `"use strict";\n${code}\n`
      );
      fn(
        sandboxConsole, req, moduleShim, moduleShim.exports, sandboxProcess,
        (typeof Buffer !== "undefined" ? Buffer : { from: (s) => ({ toString: () => s, length: String(s).length }) }),
        window.setTimeout.bind(window), window.setInterval.bind(window),
        window.clearTimeout.bind(window), window.clearInterval.bind(window)
      );
    } catch(err){
      push(`Uncaught ${err.name}: ${err.message}`, "err");
      return { lines, error: err };
    }
    if (lines.length === 0){
      push("(no output — try adding a console.log statement)", "info");
    }
    return { lines, error: null };
  }

  return { run, inspect };
})();
