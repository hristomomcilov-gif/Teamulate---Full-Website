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
      window.location.href = "/client-login.html";
    },
    true
  );
})();
