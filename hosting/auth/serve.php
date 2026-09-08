<?php
declare(strict_types=1);
$secret = trim((string)file_get_contents(__DIR__ . '/.secret'));
$root = realpath('/home/adesmzkj/teamulate.ca/app');
$cookie = $_COOKIE['tm_auth'] ?? '';
$ok = false;
if ($secret !== '' && $cookie !== '') {
    $parts = explode('.', $cookie, 2);
    if (count($parts) === 2) {
        [$payload, $sig] = $parts;
        $calc = hash_hmac('sha256', $payload, $secret);
        if (hash_equals($calc, $sig)) {
            $bits = explode('|', $payload, 2);
            if (count($bits) === 2 && ctype_digit($bits[1]) && (int)$bits[1] >= time()) {
                $ok = true;
            }
        }
    }
}
if (!$ok) {
    header('Location: /client-login.html', true, 302);
    exit;
}
$rel = (string)($_GET['path'] ?? 'index.html');
$rel = str_replace('\\', '/', $rel);
if ($rel === '' || substr($rel, -1) === '/') $rel .= 'index.html';
if (strpos($rel, '..') !== false) {
    http_response_code(400);
    exit;
}
$target = realpath($root . '/' . $rel);
if ($target === false || strpos($target, $root) !== 0) {
    http_response_code(404);
    exit;
}
$base = basename($target);
if ($base === '.htpasswd' || $base === '.htaccess' || $base === '.secret') {
    http_response_code(403);
    exit;
}
$ext = strtolower(pathinfo($target, PATHINFO_EXTENSION));
$map = [
    'html' => 'text/html; charset=utf-8',
    'json' => 'application/json',
    'css' => 'text/css',
    'js' => 'application/javascript',
    'svg' => 'image/svg+xml',
    'png' => 'image/png',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'webp' => 'image/webp',
    'woff2' => 'font/woff2',
];
header('X-Robots-Tag: noindex, nofollow');
header('Content-Type: ' . ($map[$ext] ?? 'application/octet-stream'));
if ($ext === 'json') header('Cache-Control: no-store');
readfile($target);
