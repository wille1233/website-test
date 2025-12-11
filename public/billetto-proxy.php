<?php
/**
 * Billetto API Proxy
 * Handles CORS issues when making requests to Billetto API
 */

// Enable CORS for your domain
header('Access-Control-Allow-Origin: *'); // In production, replace * with your domain
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only allow GET and POST requests
if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST'])) {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit(1);
}

// Get the endpoint from query parameter
$endpoint = $_GET['endpoint'] ?? '';
if (empty($endpoint)) {
    http_response_code(400);
    echo json_encode(['error' => 'No endpoint specified. Usage: billetto-proxy.php?endpoint=/events']);
    exit(1);
}

// Get authorization header from the request
$authHeader = '';
$headers = getallheaders();
foreach ($headers as $name => $value) {
    if (strtolower($name) === 'authorization') {
        $authHeader = $value;
        break;
    }
}

if (empty($authHeader)) {
    http_response_code(401);
    echo json_encode(['error' => 'No authorization header provided']);
    exit(1);
}

// Build the full Billetto API URL
$apiUrl = "https://api.billetto.com/v1" . $endpoint;

// Initialize cURL session
$ch = curl_init($apiUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: ' . $authHeader,
    'Content-Type: application/json',
    'User-Agent: Mozilla/5.0'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

// If POST request, forward the body
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
}

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for cURL errors
if (curl_errno($ch)) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Proxy error: ' . curl_error($ch),
        'endpoint' => $apiUrl
    ]);
    curl_close($ch);
    exit(1);
}

curl_close($ch);

// Return the response with the same HTTP code
http_response_code($httpCode);
echo $response;
?>
