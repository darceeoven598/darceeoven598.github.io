// _worker.js - Geo-block for Australia only

// Allowed countries - only Australia
const ALLOWED_COUNTRIES = ['AU'];

async function handleRequest(request) {
    // Get the visitor's country code from Cloudflare's injected header
    const country = request.headers.get('CF-IPCountry') || 'XX';
    
    // Check if visitor is in an allowed country
    if (!ALLOWED_COUNTRIES.includes(country)) {
        // Return block page with detected location info
        return new Response(
            `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Access Restricted</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  background: #000;
                  color: #f2f2f2;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  flex-direction: column;
                  padding: 20px;
                  text-align: center;
                }
                .container { max-width: 600px; }
                h1 { font-size: 2rem; margin-bottom: 1rem; color: #f38020; }
                p { font-size: 1.1rem; line-height: 1.6; color: #b6b6b6; }
                .code { 
                  margin-top: 2rem;
                  padding: 0.5rem 1rem;
                  background: #1a1a1a;
                  border-radius: 4px;
                  color: #555;
                  font-size: 0.7rem;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>🚫 Access Restricted</h1>
                <p>This service is only available to users located in <strong>Australia</strong>.</p>
                <p>Detected location: <strong>${country}</strong></p>
                <p>If you believe this is an error, please contact support.</p>
                <div class="code">Reference: GEO-BLOCK-${Date.now()}</div>
              </div>
            </body>
            </html>`,
            {
                status: 403,
                headers: {
                    'Content-Type': 'text/html; charset=UTF-8',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            }
        );
    }
    
    // If from Australia, proxy through to your origin
    return fetch(request);
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});
