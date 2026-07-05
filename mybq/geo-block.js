/**
 * geo-block.js
 * Client-side country gate for static sites (e.g. GitHub Pages).
 *
 * IMPORTANT LIMITATIONS:
 * - This is NOT secure. It can be bypassed with a VPN/proxy, by disabling
 *   JavaScript, or by viewing cached/archived versions of the page.
 * - It relies on a free third-party IP geolocation API, which can be
 *   rate-limited, occasionally wrong, or unavailable.
 * - For real enforcement, block at the network/edge level (e.g. Cloudflare
 *   Worker or firewall rule checking the request's country), not in the browser.
 *
 * HOW TO USE:
 * 1. Upload this file to your repo (e.g. at the root, alongside index.html).
 * 2. In your index.html, add this near the very top of <head>, BEFORE any
 *    other content loads:
 *
 *      <script src="geo-block.js"></script>
 *
 * 3. Wrap the content you want to protect in a container, e.g.:
 *
 *      <body>
 *        <div id="site-content" style="display:none;">
 *          ... your real page content ...
 *        </div>
 *      </body>
 *
 *    (This script will reveal #site-content only for AU visitors and show
 *    a "not available" message otherwise.)
 */

(function () {
  var ALLOWED_COUNTRY = "AU"; // ISO 3166-1 alpha-2 code for Australia

  function showBlockedMessage() {
    document.addEventListener("DOMContentLoaded", function () {
      document.body.innerHTML =
        '<div style="font-family: sans-serif; text-align:center; padding:4rem 1rem;">' +
        "<h1>Content not available in your region</h1>" +
        "<p>This page is only available to visitors in Australia.</p>" +
        "</div>";
    });
  }

  function showContent() {
    document.addEventListener("DOMContentLoaded", function () {
      var content = document.getElementById("site-content");
      if (content) {
        content.style.display = "";
      }
    });
  }

  fetch("https://ipwho.is/")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data && data.success !== false && data.country_code === ALLOWED_COUNTRY) {
        showContent();
      } else {
        showBlockedMessage();
      }
    })
    .catch(function () {
      // If the geolocation lookup fails, default to blocking access
      // (change to showContent() if you'd rather fail-open).
      showBlockedMessage();
    });
})();
