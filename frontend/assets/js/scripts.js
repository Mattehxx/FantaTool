/**
 * Function to load external scripts dynamically
 * @param {string} url 
 */
function loadScript(url) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

/**
 * Function to load external CSS dynamically
 * @param {string} url 
 */
function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

// Bootstrap 5
loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js');

// Vue
loadScript('/frontend/assets/modules/vue.global.js');

// Main
loadScript('/frontend/assets/js/main.js');