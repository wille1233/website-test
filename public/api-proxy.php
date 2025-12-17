<?php
/**
 * API Proxy for eBas Membership Submission
 * This proxy handles CORS issues when submitting member data to ebas.svensklive.se
 */

// Enable CORS for your domain (replace with your actual domain in production)
header('Access-Control-Allow-Origin: *'); // In production, replace * with your domain
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit(1);
}

// Get the POST data from the request body
$postData = file_get_contents('php://input');

// Validate that we received data
if (empty($postData)) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit(1);
}

// Initialize cURL session
$ch = curl_init('https://ebas.svensklive.se/apis/submit_member.json');

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postData)
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for cURL errors
if (curl_errno($ch)) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Proxy error: ' . curl_error($ch)
    ]);
    curl_close($ch);
    exit(1);
}

curl_close($ch);

// Return the response with the same HTTP code
http_response_code($httpCode);
echo $response;
?>
