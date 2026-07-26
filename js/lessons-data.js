/* ============================================================
   ETH • Node.js Curriculum Data
   Basic → Advanced. Edit this file to add/update lessons —
   the sidebar, lesson pages, and prev/next nav are generated
   from this single source of truth.
   ============================================================ */

const ETH_CURRICULUM = [

  /* ================= GETTING STARTED ================= */
  {
    id: "what-is-nodejs", group: "Getting Started", level: "Beginner", minutes: 4,
    title: "What is Node.js?",
    lede: "Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript outside the browser — on servers, in CLIs, and on your own machine.",
    sections: [
      { heading: "Why it matters",
        paragraphs: [
          "Before Node.js, JavaScript only ran inside a browser tab. Node takes the same V8 engine that powers Chrome and embeds it in a standalone program, adding APIs for files, networking, and processes that a browser would never expose.",
          "That single decision is why Node.js is used for web servers, command-line tools, build tooling, and real-time applications like chat systems — all in one language you may already know from the frontend."
        ],
        bullets: [
          "Asynchronous, event-driven — designed to handle many connections at once without spawning a thread per connection",
          "Single language across frontend and backend (JavaScript / TypeScript)",
          "Huge ecosystem via npm, the Node Package Manager"
        ]
      }
    ],
    code: { filename: "concept.js", runnable: true, code:
`// This file itself is proof: it's JavaScript, running
// completely outside a browser tab.
console.log("Hello from Node.js!");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);` }
  },
  {
    id: "install-repl", group: "Getting Started", level: "Beginner", minutes: 5,
    title: "Installing Node.js & the REPL",
    lede: "Install Node.js once, and you get two tools instantly: the `node` command to run files, and the REPL — a live JavaScript shell.",
    sections: [
      { heading: "Installing",
        paragraphs: [
          "Download the LTS (Long-Term Support) release from the official Node.js downloads page, or install via a version manager like nvm so you can switch Node versions per project. Verify the install with node -v and npm -v in your terminal."
        ]
      },
      { heading: "The REPL",
        paragraphs: [
          "Typing node with no filename drops you into the REPL (Read–Eval–Print Loop): type an expression, press Enter, and see the result immediately — perfect for quick experiments before writing a whole file."
        ]
      }
    ],
    code: { filename: "terminal", runnable: true, code:
`console.log("$ node -v");
console.log("v22.14.0");
console.log("");
console.log("$ node");
console.log("> 2 + 2");
console.log("4");
console.log("> .exit");` }
  },
  {
    id: "first-program", group: "Getting Started", level: "Beginner", minutes: 5,
    title: "Your First Program",
    lede: "Every Node.js file is just a JavaScript file — save it, run it with `node filename.js`, and it executes top to bottom.",
    sections: [
      { heading: "Running a file",
        paragraphs: [
          "Create app.js, write plain JavaScript in it, then run node app.js from the terminal. There's no HTML page, no <script> tag — Node reads the file and executes it directly in the V8 engine."
        ],
        bullets: [
          "Top-level code runs immediately, in order",
          "console.log() prints to your terminal, not a browser devtools panel",
          "The process exits automatically once there's nothing left to do (no pending timers, servers, etc.)"
        ]
      }
    ],
    code: { filename: "app.js", runnable: true, code:
`function greet(name){
  return \`Hello, \${name}! Welcome to Node.js.\`;
}

console.log(greet("Developer"));

for (let i = 1; i <= 3; i++){
  console.log("Line", i, "of your first program");
}` }
  },

  /* ================= CORE JAVASCRIPT ================= */
  {
    id: "variables-datatypes", group: "Core JavaScript", level: "Beginner", minutes: 6,
    title: "Variables & Data Types",
    lede: "Node.js uses standard modern JavaScript: let, const, and the same primitive and reference types you'd use in the browser.",
    sections: [
      { heading: "let vs const",
        paragraphs: [
          "Use const by default — it signals the binding won't be reassigned. Use let when a variable genuinely needs to change. Avoid var; it has confusing function-level scoping that modern code has moved away from."
        ],
        bullets: [
          "Primitives: string, number, boolean, null, undefined, symbol, bigint",
          "Reference types: object, array, function — all technically objects",
          "typeof tells you the primitive type at runtime"
        ]
      }
    ],
    code: { filename: "variables.js", runnable: true, code:
`const courseName = "Node.js Mastery";
let studentsEnrolled = 128;
const isFree = false;

studentsEnrolled += 1;

console.log(courseName, "-", studentsEnrolled, "students");
console.log("typeof courseName:", typeof courseName);
console.log("typeof studentsEnrolled:", typeof studentsEnrolled);
console.log("typeof isFree:", typeof isFree);` }
  },
  {
    id: "functions", group: "Core JavaScript", level: "Beginner", minutes: 7,
    title: "Functions & Arrow Functions",
    lede: "Functions are first-class values in JavaScript — you can store them in variables, pass them around, and return them from other functions.",
    sections: [
      { heading: "Declarations vs arrow functions",
        paragraphs: [
          "A function declaration is hoisted and has its own `this`. An arrow function is more compact and inherits `this` from its surrounding scope — which is exactly why arrow functions are so common inside callbacks in Node.js."
        ]
      }
    ],
    code: { filename: "functions.js", runnable: true, code:
`function add(a, b){
  return a + b;
}

const multiply = (a, b) => a * b;

const describe = (op, result) => \`\${op} → \${result}\`;

console.log(describe("add(2, 3)", add(2, 3)));
console.log(describe("multiply(4, 5)", multiply(4, 5)));

[1, 2, 3].forEach(n => console.log("squared:", n * n));` }
  },
  {
    id: "objects-arrays", group: "Core JavaScript", level: "Beginner", minutes: 7,
    title: "Objects & Arrays",
    lede: "Objects and arrays are how you model almost everything in a Node.js program — from a single request body to an entire in-memory database.",
    sections: [
      { heading: "Working with structured data",
        paragraphs: [
          "Destructuring, spread syntax, and array methods like map/filter/reduce let you transform data without writing manual loops — this is the everyday toolkit for handling JSON in Node.js APIs."
        ],
        bullets: [
          "Destructuring: const { name, level } = student;",
          "Spread: const copy = { ...original, updated: true };",
          "map / filter / reduce for transforming arrays of data"
        ]
      }
    ],
    code: { filename: "objects-arrays.js", runnable: true, code:
`const student = { name: "Anil", course: "Node.js", level: "Beginner" };
const { name, course } = student;
console.log(\`\${name} is learning \${course}\`);

const scores = [72, 88, 95, 60, 79];
const passing = scores.filter(s => s >= 70);
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;

console.log("Passing scores:", passing);
console.log("Average:", average.toFixed(1));

const upgraded = { ...student, level: "Intermediate" };
console.log(upgraded);` }
  },
  {
    id: "loops-conditionals", group: "Core JavaScript", level: "Beginner", minutes: 5,
    title: "Loops & Conditionals",
    lede: "Control flow in Node.js is identical to browser JavaScript — if/else, switch, for, while, and for...of/for...in.",
    sections: [
      { heading: "Choosing the right loop",
        paragraphs: [
          "Use for...of to iterate values (arrays, strings, Maps, Sets). Use for...in to iterate object keys. Use a classic for loop when you need the index or fine control over the step."
        ]
      }
    ],
    code: { filename: "control-flow.js", runnable: true, code:
`const modules = ["fs", "http", "path", "events"];

for (const mod of modules){
  console.log("Core module:", mod);
}

function classify(mark){
  if (mark >= 90) return "Excellent";
  else if (mark >= 70) return "Good";
  else return "Needs practice";
}

[95, 74, 55].forEach(m => console.log(m, "→", classify(m)));` }
  },

  /* ================= NODE FUNDAMENTALS ================= */
  {
    id: "modules-commonjs-esm", group: "Node Fundamentals", level: "Beginner", minutes: 8,
    title: "Modules: CommonJS & ESM",
    lede: "Node.js splits code into modules so a project doesn't live in one giant file. There are two module systems: CommonJS (require) and ES Modules (import).",
    sections: [
      { heading: "CommonJS — the classic default",
        paragraphs: [
          "Every .js file is its own module. Use module.exports to expose values and require() to pull them into another file. Node caches a module after the first require, so the same instance is reused everywhere."
        ]
      },
      { heading: "ES Modules — the modern standard",
        paragraphs: [
          "Set \"type\": \"module\" in package.json (or use .mjs files) to use import/export syntax instead — the same syntax used in modern frontend code."
        ]
      }
    ],
    code: { filename: "math.js + app.js", runnable: true, code:
`// math.js (CommonJS)
function square(n){ return n * n; }
module.exports = { square };

// app.js
const { square } = require("./math.js");
console.log("square(6) =", square(6));

// The ES Module equivalent would be:
// export function square(n){ return n * n; }
// import { square } from "./math.js";` }
  },
  {
    id: "npm-package-json", group: "Node Fundamentals", level: "Beginner", minutes: 6,
    title: "npm & package.json",
    lede: "npm is Node's package manager — it installs third-party libraries and package.json is the manifest that describes your project.",
    sections: [
      { heading: "The essentials",
        paragraphs: [
          "npm init -y creates a package.json. npm install <package> adds a dependency and records it. npm install saves runtime dependencies; npm install -D saves dev-only ones like testing tools."
        ],
        bullets: [
          "dependencies — needed to run the app in production",
          "devDependencies — only needed while developing (linters, test runners)",
          "scripts — shortcuts like \"start\": \"node app.js\", run with npm start"
        ]
      }
    ],
    code: { filename: "package.json", runnable: true, code:
`const packageJson = {
  name: "eth-nodejs-app",
  version: "1.0.0",
  scripts: { start: "node app.js", dev: "node --watch app.js" },
  dependencies: { express: "^4.19.2" }
};

console.log(JSON.stringify(packageJson, null, 2));
console.log("\\nRun with: npm start");` }
  },
  {
    id: "global-objects", group: "Node Fundamentals", level: "Beginner", minutes: 5,
    title: "Global Objects: process, __dirname, global",
    lede: "Node.js injects a handful of globals into every module — most importantly `process`, which describes the running program itself.",
    sections: [
      { heading: "What's available",
        paragraphs: [
          "process gives you environment variables, command-line arguments, and control over the running program. __dirname and __filename (CommonJS only) give the current file's location on disk."
        ]
      }
    ],
    code: { filename: "globals.js", runnable: true, code:
`console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("Env NODE_ENV:", process.env.NODE_ENV);
console.log("Argv:", process.argv);` }
  },

  /* ================= ASYNC NODE ================= */
  {
    id: "callbacks", group: "Asynchronous Node.js", level: "Intermediate", minutes: 7,
    title: "Callbacks",
    lede: "Node.js is non-blocking by default — slow operations (reading a file, a network request) take a callback function that runs later, once the work is done.",
    sections: [
      { heading: "The pattern",
        paragraphs: [
          "Node's classic convention is 'error-first callbacks': the first argument is either null or an Error, and the rest are results. This lets code keep running immediately instead of freezing while it waits."
        ]
      }
    ],
    code: { filename: "callbacks.js", runnable: true, code:
`function fetchScore(id, callback){
  setTimeout(() => {
    if (id <= 0) return callback(new Error("Invalid id"));
    callback(null, { id, score: 87 });
  }, 500);
}

console.log("Requesting score...");

fetchScore(1, (err, result) => {
  if (err) return console.error(err.message);
  console.log("Got result:", result);
});

console.log("...this line runs BEFORE the result (non-blocking!)");` }
  },
  {
    id: "promises", group: "Asynchronous Node.js", level: "Intermediate", minutes: 7,
    title: "Promises",
    lede: "A Promise represents a value that isn't ready yet — pending, then either fulfilled or rejected. Promises replace deeply nested callbacks with readable chains.",
    sections: [
      { heading: ".then / .catch",
        paragraphs: [
          "Chain .then() to handle success and .catch() to handle failure anywhere in the chain — a single .catch() at the end covers every step before it."
        ]
      }
    ],
    code: { filename: "promises.js", runnable: true, code:
`function fetchUser(id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      id > 0 ? resolve({ id, name: "Anil" }) : reject(new Error("Bad id"));
    }, 400);
  });
}

fetchUser(1)
  .then(user => {
    console.log("User loaded:", user);
    return user.name.toUpperCase();
  })
  .then(upper => console.log("Uppercased:", upper))
  .catch(err => console.error("Failed:", err.message));` }
  },
  {
    id: "async-await", group: "Asynchronous Node.js", level: "Intermediate", minutes: 7,
    title: "Async / Await",
    lede: "async/await is syntax sugar over Promises that lets asynchronous code read like synchronous code — no chained .then() calls.",
    sections: [
      { heading: "Why it's preferred",
        paragraphs: [
          "Mark a function async, then use await inside it to pause until a Promise settles. Wrap awaited calls in try/catch to handle rejections the same way you'd catch a thrown error."
        ]
      }
    ],
    code: { filename: "async-await.js", runnable: true, code:
`function delay(ms, value){
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function loadDashboard(){
  console.log("Loading dashboard...");
  try{
    const user = await delay(300, { name: "Anil" });
    console.log("Step 1 — user:", user);

    const courses = await delay(300, ["Node.js", "Express", "MongoDB"]);
    console.log("Step 2 — courses:", courses);

    console.log("Dashboard ready ✅");
  } catch(err){
    console.error("Dashboard failed:", err.message);
  }
}

loadDashboard();` }
  },
  {
    id: "event-loop", group: "Asynchronous Node.js", level: "Intermediate", minutes: 8,
    title: "The Event Loop",
    lede: "The event loop is how Node.js runs asynchronous callbacks on a single thread — it's the mechanism behind everything you just learned about callbacks and Promises.",
    sections: [
      { heading: "Execution order",
        paragraphs: [
          "Synchronous code runs first, top to bottom. Then microtasks (Promise callbacks) run before macrotasks (setTimeout, setInterval, I/O callbacks). This is why the order below often surprises beginners — run it and watch the actual order."
        ]
      }
    ],
    code: { filename: "event-loop.js", runnable: true, code:
`console.log("1: synchronous — start");

setTimeout(() => console.log("4: setTimeout (macrotask)"), 0);

Promise.resolve().then(() => console.log("3: Promise.then (microtask)"));

console.log("2: synchronous — end");

// Expected order: 1, 2, 3, 4
// Microtasks (Promises) always run before the next macrotask (setTimeout).` }
  },

  /* ================= CORE MODULES ================= */
  {
    id: "fs-module", group: "Core Modules", level: "Intermediate", minutes: 8,
    title: "File System (fs)",
    lede: "The built-in fs module reads and writes files. It ships in both async (callback/Promise) and sync forms — prefer async in real servers so you never block other requests.",
    sections: [
      { heading: "Sync vs async",
        paragraphs: [
          "readFileSync blocks the entire process until the disk read finishes — fine for a one-off CLI script, risky in a server handling many users. readFile (async) lets Node keep serving other work while the disk read happens in the background.",
          "This lesson runs in a simulated in-memory file system so it's safe to execute directly in your browser — the same API calls work identically against real files when you run this on your own machine."
        ]
      }
    ],
    code: { filename: "fs-demo.js", runnable: true, code:
`const fs = require("fs");

// Synchronous read — blocks until done
const notes = fs.readFileSync("notes.txt", "utf-8");
console.log("Sync read:", notes);

// Asynchronous read — non-blocking
fs.readFile("data.json", "utf-8", (err, data) => {
  if (err) return console.error(err.message);
  console.log("Async read:", JSON.parse(data));
});

fs.writeFile("output.txt", "Generated by ETH Node.js course", (err) => {
  if (!err) console.log("Write complete!");
});

console.log("This logs before the async callbacks — non-blocking I/O!");` }
  },
  {
    id: "path-module", group: "Core Modules", level: "Intermediate", minutes: 5,
    title: "Path Module",
    lede: "The path module builds and inspects file paths in a way that works consistently across operating systems.",
    sections: [
      { heading: "Common methods",
        paragraphs: [
          "Never concatenate path strings with '+'. Use path.join() so your code behaves the same on Windows, macOS, and the Linux servers most Node apps deploy to (like Render)."
        ]
      }
    ],
    code: { filename: "path-demo.js", runnable: true, code:
`const path = require("path");

const fullPath = path.join("project", "src", "app.js");
console.log("Joined path:", fullPath);

console.log("Basename:", path.basename(fullPath));
console.log("Dirname:", path.dirname(fullPath));
console.log("Extension:", path.extname(fullPath));` }
  },
  {
    id: "os-module", group: "Core Modules", level: "Intermediate", minutes: 4,
    title: "OS Module",
    lede: "The os module reports information about the machine Node.js is running on — useful for logging, diagnostics, and scaling decisions.",
    sections: [
      { heading: "What you can inspect",
        paragraphs: [
          "From CPU count to free memory, os.* is how a Node process becomes aware of its own environment — handy when deciding how many worker processes to spin up on a given server."
        ]
      }
    ],
    code: { filename: "os-demo.js", runnable: true, code:
`const os = require("os");

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU cores:", os.cpus().length);
console.log("Total memory (GB):", (os.totalmem() / 1e9).toFixed(1));
console.log("Free memory (GB):", (os.freemem() / 1e9).toFixed(1));` }
  },
  {
    id: "events-eventemitter", group: "Core Modules", level: "Intermediate", minutes: 7,
    title: "Events & EventEmitter",
    lede: "Node.js is built around events. The events module exposes EventEmitter, the pattern every core module (http, streams) is quietly built on top of.",
    sections: [
      { heading: "Emit and listen",
        paragraphs: [
          "Create an emitter, subscribe with .on(), and trigger listeners with .emit(). This decouples the code that detects something happened from the code that reacts to it."
        ]
      }
    ],
    code: { filename: "events-demo.js", runnable: true, code:
`const { EventEmitter } = require("events");

class OrderSystem extends EventEmitter {}
const orders = new OrderSystem();

orders.on("order:placed", (order) => {
  console.log("📦 New order received:", order);
});

orders.on("order:placed", (order) => {
  console.log("✉️  Sending confirmation email for order", order.id);
});

orders.emit("order:placed", { id: 101, item: "Node.js Course" });` }
  },

  /* ================= NETWORKING ================= */
  {
    id: "http-server", group: "Networking", level: "Intermediate", minutes: 9,
    title: "Building an HTTP Server",
    lede: "The built-in http module is enough to build a real web server with zero external dependencies — this is what frameworks like Express are built on top of.",
    sections: [
      { heading: "createServer + listen",
        paragraphs: [
          "http.createServer takes a handler function that runs on every incoming request, receiving a request (req) and response (res) object. listen() starts the server on a port.",
          "This sandbox simulates one incoming request automatically after you hit Run, so you can see the handler fire exactly like a real browser request would trigger it."
        ]
      }
    ],
    code: { filename: "server.js", runnable: true, code:
`const http = require("http");

const server = http.createServer((req, res) => {
  console.log(\`Incoming \${req.method} request for \${req.url}\`);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Hello from ETH's Node.js server!" }));
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});` }
  },
  {
    id: "rest-api-raw", group: "Networking", level: "Intermediate", minutes: 9,
    title: "Routing a Simple REST API",
    lede: "With nothing but req.url and req.method, you can build basic routing by hand before ever reaching for a framework.",
    sections: [
      { heading: "Manual routing",
        paragraphs: [
          "Frameworks exist to remove this boilerplate, but understanding it first makes Express feel like a shortcut instead of magic."
        ]
      }
    ],
    code: { filename: "routes.js", runnable: true, code:
`const http = require("http");

const students = [{ id: 1, name: "Anil" }, { id: 2, name: "Priya" }];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/students" && req.method === "GET"){
    res.statusCode = 200;
    return res.end(JSON.stringify(students));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(4000, "127.0.0.1", () => {
  console.log("REST API listening on http://127.0.0.1:4000/");
  console.log("Try: GET /students");
});` }
  },
  {
    id: "express-intro", group: "Networking", level: "Intermediate", minutes: 8,
    title: "Introduction to Express.js",
    lede: "Express is the most widely used Node.js web framework — it wraps the raw http module in a much friendlier API for routes, middleware, and JSON handling.",
    sections: [
      { heading: "Why Express",
        paragraphs: [
          "app.get(), app.post(), and friends replace manual req.url checks. express.json() parses request bodies automatically. It's installed with npm install express and is the foundation most real Node.js backends are built on.",
          "Express itself requires a real npm install, so this snippet shows the exact code you'd run in a real project — read it alongside the sandboxed http example above to see how much boilerplate Express removes."
        ]
      }
    ],
    code: { filename: "app.js", runnable: false, code:
`const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the ETH Node.js API");
});

app.post("/students", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now(), name });
});

app.listen(5000, () => {
  console.log("Express server running on port 5000");
});` }
  },

  /* ================= ADVANCED ================= */
  {
    id: "streams-buffers", group: "Advanced", level: "Advanced", minutes: 10,
    title: "Streams & Buffers",
    lede: "Streams process data piece by piece instead of loading it all into memory — essential for large files, video, or anything too big to hold in RAM at once.",
    sections: [
      { heading: "Buffers",
        paragraphs: [
          "A Buffer is a fixed chunk of raw binary data — how Node represents bytes before they're decoded into text. Streams emit data as a sequence of Buffer chunks."
        ]
      },
      { heading: "Readable streams",
        paragraphs: [
          "A Readable stream emits 'data' events as chunks arrive, and an 'end' event once there's nothing left — this is how Node reads a 2GB file using almost no memory."
        ]
      }
    ],
    code: { filename: "streams-demo.js", runnable: true, code:
`const { Readable } = require("stream") || {};
const buf = Buffer.from("Node.js Streams", "utf-8");

console.log("Buffer bytes:", buf.length);
console.log("Buffer as string:", buf.toString());

// Simulating a readable stream's chunked delivery:
const chunks = ["Chunk 1: Hello ", "Chunk 2: from a ", "Chunk 3: stream!"];
let received = "";

chunks.forEach((chunk, i) => {
  setTimeout(() => {
    received += chunk;
    console.log(\`data event \${i + 1}:\`, chunk.trim());
    if (i === chunks.length - 1) console.log("end event — full message:", received);
  }, i * 150);
});` }
  },
  {
    id: "error-handling", group: "Advanced", level: "Advanced", minutes: 7,
    title: "Error Handling & Debugging",
    lede: "Robust Node.js apps handle errors deliberately at every layer — synchronous, async, and process-wide — instead of letting one bad request crash the whole server.",
    sections: [
      { heading: "Layers of error handling",
        paragraphs: [
          "Use try/catch around synchronous code and awaited calls. Always attach .catch() to Promise chains. As a last line of defense, listen for process-level 'uncaughtException' and 'unhandledRejection' to log and shut down gracefully instead of crashing silently."
        ]
      }
    ],
    code: { filename: "errors-demo.js", runnable: true, code:
`function parseConfig(json){
  try{
    return JSON.parse(json);
  } catch(err){
    console.error("Invalid config JSON:", err.message);
    return null;
  }
}

console.log(parseConfig('{"port": 3000}'));
console.log(parseConfig('not valid json'));

async function riskyOperation(){
  throw new Error("Database connection failed");
}

riskyOperation().catch(err => {
  console.error("Caught async error:", err.message);
});` }
  },
  {
    id: "env-config", group: "Advanced", level: "Advanced", minutes: 6,
    title: "Environment Variables & Config",
    lede: "Never hard-code secrets or environment-specific values. process.env reads variables set outside your code — exactly how Render and other hosts inject production config.",
    sections: [
      { heading: "Local development",
        paragraphs: [
          "The dotenv package loads a local .env file into process.env during development. In production (like on Render), you set these same variables directly in the host's dashboard — no .env file needed or committed."
        ]
      }
    ],
    code: { filename: "config.js", runnable: true, code:
`// In production these come from your hosting dashboard (e.g. Render).
// Here we simulate that with sensible local defaults.
const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  apiKey: process.env.API_KEY || "(not set — add in Render dashboard)"
};

console.log("Resolved config:", config);
console.log(\`Server will bind to port \${config.port} in \${config.env} mode\`);` }
  },
  {
    id: "middleware-pattern", group: "Advanced", level: "Advanced", minutes: 7,
    title: "The Middleware Pattern",
    lede: "Middleware is a chain of functions that each get a chance to inspect, modify, or reject a request before it reaches its final handler — the backbone of Express.",
    sections: [
      { heading: "How it composes",
        paragraphs: [
          "Each middleware function receives req, res, and a next() callback. Calling next() passes control to the next function in the chain; not calling it stops the request there (e.g. after sending an error response)."
        ]
      }
    ],
    code: { filename: "middleware-demo.js", runnable: true, code:
`function logger(req, next){
  console.log(\`[LOG] \${req.method} \${req.url}\`);
  next();
}

function auth(req, next){
  if (!req.token) {
    console.error("[AUTH] Rejected — no token provided");
    return;
  }
  console.log("[AUTH] Passed");
  next();
}

function handler(req){
  console.log("[HANDLER] Responding to", req.url);
}

function runChain(req, chain){
  let i = 0;
  function next(){
    const fn = chain[i++];
    if (fn) fn(req, next);
  }
  next();
}

runChain({ method: "GET", url: "/profile", token: "abc123" }, [logger, auth, handler]);`}
  },
  {
    id: "deploy-render", group: "Advanced", level: "Advanced", minutes: 6,
    title: "Deploying to Render",
    lede: "Render deploys a Node.js app straight from a Git repository — push code, Render builds it, installs dependencies, and runs your start script.",
    sections: [
      { heading: "The checklist",
        paragraphs: [
          "Render needs three things from your project: a package.json with a start script, your app listening on process.env.PORT (not a hard-coded port), and your code pushed to a connected Git repository."
        ],
        bullets: [
          "package.json → \"scripts\": { \"start\": \"node app.js\" }",
          "app.listen(process.env.PORT || 3000, ...) — Render assigns the port dynamically",
          "Create a new 'Web Service' on Render, connect the repo, set the build command (npm install) and start command (npm start)",
          "Add any secrets (API keys, DB URLs) under Render's Environment tab instead of committing a .env file"
        ]
      }
    ],
    code: { filename: "app.js", runnable: true, code:
`const http = require("http");

// Render injects PORT automatically — always read it from process.env
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end("ETH Node.js app is live on Render 🚀");
});

server.listen(PORT, () => {
  console.log(\`Ready — listening on port \${PORT}\`);
});` }
  }
];

/* Flat lookup helpers */
const ETH_LESSON_BY_ID = Object.fromEntries(ETH_CURRICULUM.map(l => [l.id, l]));
const ETH_GROUPS = [...new Set(ETH_CURRICULUM.map(l => l.group))];

if (typeof module !== "undefined" && module.exports){
  module.exports = { ETH_CURRICULUM, ETH_LESSON_BY_ID, ETH_GROUPS };
}
