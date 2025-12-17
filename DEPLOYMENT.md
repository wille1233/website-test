# Deployment Instructions for Loopia Hosting

## Files to Upload

When deploying to Loopia, you need to upload:

1. **Build Files** - Run `npm run build` to create the `dist` folder
2. **PHP Proxy** - Upload `public/api-proxy.php` to your web root

## Step-by-Step Deployment

### 1. Build the Production Version
```bash
npm run build
```
This creates a `dist` folder with your compiled website.

### 2. Upload to Loopia
Using FTP or Loopia's file manager:

- Upload all contents from the `dist` folder to your `public_html` directory
- Upload `public/api-proxy.php` to `public_html/api-proxy.php`

### 3. Configure Environment Variables for Production

Create a `.env.production` file in your project root with:
```
VITE_API_KEY=L/Jawf+l210GNMii74ox54L9m7iSJ1LA
VITE_API_ENDPOINT=/api-proxy.php
```

Then rebuild:
```bash
npm run build
```

### 4. Security Considerations

**Important:** Edit `api-proxy.php` and replace this line:
```php
header('Access-Control-Allow-Origin: *');
```

With your actual domain:
```php
header('Access-Control-Allow-Origin: https://yourdomain.se');
```

### 5. Testing

After deployment:
1. Visit your website at `https://yourdomain.se`
2. Navigate to the Membership page
3. Fill out and submit the form
4. Check browser console for any errors

## Troubleshooting

**Form submission fails:**
- Check that `api-proxy.php` is accessible at `https://yourdomain.se/api-proxy.php`
- Verify PHP is enabled on your Loopia hosting
- Check PHP error logs in Loopia control panel

**CORS errors:**
- Update the `Access-Control-Allow-Origin` header in `api-proxy.php` to match your domain

## Development vs Production

- **Development**: Uses Heroku proxy (configured in `.env`)
- **Production**: Uses PHP proxy on your Loopia server (configured in `.env.production`)
