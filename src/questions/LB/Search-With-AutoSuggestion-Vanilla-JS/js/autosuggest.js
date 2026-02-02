(function () {
  const input = document.getElementById("search");
  const suggestionArea = document.getElementById("suggestion-area");

  /* ---------------- Focus Handling ---------------- */

  const onFocus = () => {
    suggestionArea.style.display = "block";
  };

  /* ---------------- Blur Handling ---------------- */

  const onBlur = (e) => {
    if (e.target === input || suggestionArea.contains(e.target)) {
      return;
    }
    suggestionArea.style.display = "none";
  };

  /* ---------------- Input Change ---------------- */

  const onChange = (e) => {
    const value = e.target.value;
    processData(value);
  };

  /* ---------------- Fetch & Render ---------------- */

  const processData = async (value) => {
    suggestionArea.innerHTML = "";
    suggestionArea.style.display = "block";

    if (!value) return;

    try {
      const results = await getSuggestions(value);

      if (!results.length) return;

      const ul = document.createElement("ul");

      results.forEach((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        ul.appendChild(li);
      });

      suggestionArea.appendChild(ul);
    } catch (err) {
      console.error("Suggestion fetch failed:", err);
    }
  };

  /* ---------------- Click Delegation ---------------- */

  const onClick = (e) => {
    if (e.target.tagName !== "LI") return;

    input.value = e.target.textContent;
    input.focus();
  };

  /* ---------------- Event Binding ---------------- */

  input.addEventListener("focus", onFocus);
  input.addEventListener("keyup", onChange);

  // Capture phase allows catching LI clicks before blur
  suggestionArea.addEventListener("click", onClick, true);

  // Global click to detect outside clicks
  window.addEventListener("click", onBlur);
})();
