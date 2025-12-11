# CORS Proxy Configuration for Billetto API

## The Problem

When making API requests from the browser to Billetto's API, you encounter CORS (Cross-Origin Resource Sharing) errors because:
- Your website is on one domain (localhost or your production domain)
- Billetto's API is on another domain (api.billetto.com)
- Billetto's API doesn't include the proper CORS headers to allow browser requests from your domain

## The Solution: CORS Proxy

A CORS proxy acts as an intermediary that:
1. Receives your request
2. Forwards it to the Billetto API
3. Adds proper CORS headers to the response
4. Sends it back to your browser

## Option 1: Heroku CORS Anywhere (Default)

**Currently configured:** `https://cors-anywhere.herokuapp.com/`

**Pros:**
- Free public service
- Easy to set up (already configured)
- No deployment needed

**Cons:**
- Requires request access at https://cors-anywhere.herokuapp.com/corsdemo
- Rate limited
- May not be reliable for production
- Shares infrastructure with others

**Setup:**
1. Visit: https://cors-anywhere.herokuapp.com/corsdemo
2. Click "Request temporary access to the demo server"
3. Your access will be valid for the current session

## Option 2: Alternative Public Proxies

You can change `VITE_CORS_PROXY` in your `.env` to any of these alternatives:

```bash
# AllOrigins
VITE_CORS_PROXY=https://api.allorigins.win/raw?url=

# CORS.SH
VITE_CORS_PROXY=https://cors.sh/

# ThingProxy
VITE_CORS_PROXY=https://thingproxy.freeboard.io/fetch/
```

## Option 3: Your Own PHP Proxy (Recommended for Production)

Create a dedicated Billetto proxy on your server.

### Step 1: Create `public/billetto-proxy.php`

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Get the endpoint from query parameter
$endpoint = $_GET['endpoint'] ?? '';
if (empty($endpoint)) {
    http_response_code(400);
    echo json_encode(['error' => 'No endpoint specified']);
    exit(1);
}

// Get authorization header
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

// Initialize cURL
$ch = curl_init("https://api.billetto.com/v1{$endpoint}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: ' . $authHeader,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
?>
```

### Step 2: Update `.env`

```bash
# Use your own proxy (when deployed)
VITE_CORS_PROXY=https://yourdomain.com/website-test/billetto-proxy.php?endpoint=

# For local development with PHP server
VITE_CORS_PROXY=http://localhost:8000/billetto-proxy.php?endpoint=
```

### Step 3: Update `billettoService.js`

The current implementation already supports this! Just set the `VITE_CORS_PROXY` environment variable.

## Option 4: Backend API Route (Best for Production)

If you have a Node.js backend, create an Express route:

```javascript
app.get('/api/billetto/*', async (req, res) => {
    const endpoint = req.params[0];
    const authToken = process.env.BILLETTO_API_KEY;
    
    try {
        const response = await fetch(`https://api.billetto.com/v1/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

Then set:
```bash
VITE_CORS_PROXY=https://yourdomain.com/api/billetto/
```

## Current Status

✅ Configured to use: `https://cors-anywhere.herokuapp.com/`  
⚠️ **Action Required:** Visit https://cors-anywhere.herokuapp.com/corsdemo to request access

## Testing

After configuring the proxy:

1. Check browser console for: `"Loaded X events from Billetto API"`
2. If you see errors, check which proxy is active
3. Try alternative proxies if one doesn't work

## env File Example

```bash
VITE_BILLETTO_API_KEY=BLT2KP5D9S8E98XHC9WQ3F11L
VITE_BILLETTO_CLIENT_ID=jsb.rave1@gmail.com
VITE_BILLETTO_CLIENT_SECRET=FaenggYNhE86W[UfS2u7AqWckiNmF75OK2VYw9MkaOfAMObd(J
VITE_CORS_PROXY=https://cors-anywhere.herokuapp.com/
```

## Troubleshooting

**"Access to fetch blocked by CORS policy"**
- Request access at cors-anywhere demo page
- Try a different proxy from the alternatives above

**"429 Too Many Requests"**
- The public proxy is rate limited
- Use your own PHP proxy or backend route

**"Network Error"**
- Check if the proxy service is online
- Try pinging the proxy URL directly in your browser
