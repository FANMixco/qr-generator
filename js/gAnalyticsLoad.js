document.addEventListener("DOMContentLoaded", function(event) {
    let gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-FHG5GPZL6Q";
    gaScript.async = true;
    gaScript.defer = true;
    document.body.appendChild(gaScript);

    let customScript = document.createElement("script");
    customScript.src = "js/analytics.js";
    document.body.appendChild(customScript);
});