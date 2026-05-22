(function loadGoogleAnalytics() {
  const measurementId = "G-FHG5GPZL6Q";

  function initGoogleAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };

    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    const gaScript = document.createElement("script");
    gaScript.src =
      "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    gaScript.async = true;
    document.head.appendChild(gaScript);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGoogleAnalytics, {
      once: true,
    });
  } else {
    initGoogleAnalytics();
  }
})();
