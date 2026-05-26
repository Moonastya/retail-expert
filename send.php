<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'error' => 'Method not allowed',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw_input = file_get_contents('php://input');
$payload = json_decode($raw_input ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Некорректный формат данных',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Removes line breaks to prevent header injection.
 */
function sanitize_header_value(string $value): string
{
    return str_replace(["\r", "\n"], '', trim($value));
}

$name = trim((string)($payload['name'] ?? ''));
$position = trim((string)($payload['position'] ?? ''));
$company = trim((string)($payload['company'] ?? ''));
$email = sanitize_header_value((string)($payload['email'] ?? ''));
$phone = trim((string)($payload['phone'] ?? ''));
$industry = trim((string)($payload['industry'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));
$is_agree = (bool)($payload['is_agree'] ?? false);

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Заполните обязательные поля: имя, email, телефон, сообщение',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Укажите корректный email',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!$is_agree) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Необходимо согласие на обработку персональных данных',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$to = 'info@retail-e.ru';
$subject = 'Новая заявка с сайта new.r-ex.ru';

$mail_body = implode("\n", [
    'Новая заявка с сайта:',
    '',
    'Имя: ' . $name,
    'Должность: ' . ($position !== '' ? $position : '-'),
    'Компания: ' . ($company !== '' ? $company : '-'),
    'Email: ' . $email,
    'Телефон: ' . $phone,
    'Отрасль: ' . ($industry !== '' ? $industry : '-'),
    '',
    'Сообщение:',
    $message,
]);

$headers = implode("\r\n", [
    'From: no-reply@r-ex.ru',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
]);

$is_sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $mail_body, $headers);

if (!$is_sent) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Не удалось отправить заявку. Попробуйте позже.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'ok' => true,
    'message' => 'Заявка отправлена',
], JSON_UNESCAPED_UNICODE);

