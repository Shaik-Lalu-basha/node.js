/* ============================================================
   Shared, dependency-free code-block templating + highlighter.
   Works in the browser (as window.ETH_CODEBLOCK) and in plain
   Node.js (as module.exports) so the same code renders lesson
   pages at build time AND highlights the Playground live.
   ============================================================ */

(function(root){

  function escapeHTML(str){
    return str.replace(/[&<>]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;" }[c]));
  }

  // Single-pass tokenizer: every token type is matched in ONE regex scan
  // over the original (already-escaped) source, so the highlighter never
  // re-scans HTML it just generated (which previously caused the literal
  // word "class" inside a generated <span class="..."> to be re-matched
  // as the JS `class` keyword).
  const TOKEN_PATTERN = new RegExp(
    "(`[^`]*`|\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')" +      // 1: string
    "|(//[^\\n]*)" +                                                  // 2: comment
    "|\\b(\\d+\\.?\\d*)\\b" +                                         // 3: number
    "|\\b(const|let|var|function|return|if|else|for|while|new|class|extends|try|catch|throw|async|await|require|module|exports|typeof|of|in|switch|case|break|default|this|null|undefined|true|false|static|export|import|from|delete)\\b" + // 4: keyword
    "|\\b([A-Za-z_$][\\w$]*)(?=\\()",                                 // 5: function call
    "g"
  );

  function highlight(code){
    const escaped = escapeHTML(code);
    return escaped.replace(TOKEN_PATTERN, (match, str, com, num, kw, fn) => {
      if (str !== undefined) return `<span class="tok-str">${str}</span>`;
      if (com !== undefined) return `<span class="tok-com">${com}</span>`;
      if (num !== undefined) return `<span class="tok-num">${num}</span>`;
      if (kw !== undefined) return `<span class="tok-kw">${kw}</span>`;
      if (fn !== undefined) return `<span class="tok-fn">${fn}</span>`;
      return match;
    });
  }

  function renderCodeBlock({ filename, code, runnable = true }, idx=0){
    const runBtn = runnable
      ? `<button class="codeblock__btn codeblock__btn--run" data-run="${idx}">&#9654; Run</button>`
      : `<span class="codeblock__btn" style="opacity:.6;cursor:default;" title="Requires npm install locally">&#128230; Needs npm install</span>`;
    return `
    <div class="codeblock" data-block="${idx}">
      <div class="codeblock__bar">
        <div class="codeblock__dots"><span></span><span></span><span></span></div>
        <span class="codeblock__filename">${filename}</span>
        <div class="codeblock__spacer"></div>
        <button class="codeblock__btn" data-copy="${idx}">&#10697; Copy</button>
        ${runBtn}
      </div>
      <pre><code>${highlight(code)}</code></pre>
    </div>
    ${runnable ? `
    <div class="console" id="console-${idx}">
      <div class="console__bar"><span class="console__dot"></span>Console output</div>
      <div class="console__body" id="console-body-${idx}"><span class="console__placeholder">Click "Run" to execute this code and see live output.</span></div>
    </div>` : ""}
    `;
  }

  const api = { escapeHTML, highlight, renderCodeBlock };

  if (typeof module !== "undefined" && module.exports){
    module.exports = api;
  } else {
    root.ETH_CODEBLOCK = api;
  }

})(typeof window !== "undefined" ? window : globalThis);
