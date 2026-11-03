// Adds a Copy button to every code block, so the one-line setups can be copied in one click.
document.querySelectorAll("pre").forEach((pre) => {
  const wrap = document.createElement("div");
  wrap.className = "code-wrap";
  pre.parentNode.insertBefore(wrap, pre);
  wrap.appendChild(pre);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy";
  button.textContent = "Copy";
  button.setAttribute("aria-label", "Copy to clipboard");
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.innerText.trim());
      button.textContent = "Copied";
      button.classList.add("done");
    } catch (e) {
      button.textContent = "Select and copy";
    }
    setTimeout(() => { button.textContent = "Copy"; button.classList.remove("done"); }, 2000);
  });
  wrap.appendChild(button);
});
