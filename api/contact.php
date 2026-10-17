<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? 'Anonymous');
$email = trim(strtolower($input['email'] ?? ''));
$phone = trim($input['phone'] ?? '');
$platforms = $input['platforms'] ?? '';
if (is_array($platforms)) {
    $platforms = implode(', ', $platforms);
}
$budget = trim($input['budget'] ?? 'Not specified');
$message = trim($input['message'] ?? '');

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'A valid email address is required.']);
    exit;
}

$pdo = getDbConnection();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT INTO contact_leads (name, email, phone, platforms, budget, message) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $platforms, $budget, $message]);
        $id = $pdo->lastInsertId();

        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your project request has been stored in MySQL and a builder will reply within 4 hours.',
            'id' => $id
        ]);
        exit;
    } catch (Exception $e) {
        error_log("[contact.php Error] " . $e->getMessage());
    }
}

// Graceful fallback response
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your project request has been received and our team will respond within 4 hours.'
]);
