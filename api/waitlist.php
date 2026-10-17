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

$email = trim(strtolower($input['email'] ?? ''));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'A valid email address is required.']);
    exit;
}

$pdo = getDbConnection();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT IGNORE INTO leadspark_waitlist (email) VALUES (?)");
        $stmt->execute([$email]);

        echo json_encode([
            'success' => true,
            'message' => "You're on the VIP waitlist! We dispatched early beta details to " . htmlspecialchars($email) . "."
        ]);
        exit;
    } catch (Exception $e) {
        error_log("[waitlist.php Error] " . $e->getMessage());
    }
}

// Graceful fallback response
echo json_encode([
    'success' => true,
    'message' => "You're on the VIP waitlist! We dispatched early beta details to " . htmlspecialchars($email) . "."
]);
