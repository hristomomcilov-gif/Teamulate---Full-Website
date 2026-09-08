(function () {
  function isLoginLink(a) {
    if (!a) return false;
    var h = (a.getAttribute("href") || "").split("?")[0].replace(/\/$/, "") + "/";
    var t = (a.textContent || "").replace(/\s+/g, " ").trim();
    return h === "/login/" || t === "Login" || t === "Client login";
  }
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!isLoginLink(a)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      // Full page load into the live /app/ login gate — not a Next client route.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/app/";
    },
    true
  );
})();
