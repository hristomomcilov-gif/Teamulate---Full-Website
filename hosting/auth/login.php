<?php
declare(strict_types=1);
$secretFile = __DIR__ . '/.secret';
$passwdFile = '/home/adesmzkj/teamulate.ca/app/.htpasswd';
$secret = trim((string)file_get_contents($secretFile));

function htpasswd_ok(string $user, string $pass, string $file): bool {
    if ($user === '' || !is_readable($file)) return false;
    foreach (file($file, FILE_IGNORE_NEW_LINES) as $line) {
        if ($line === '' || $line[0] === '#') continue;
        $parts = explode(':', $line, 2);
        if (count($parts) !== 2) continue;
        [$u, $hash] = $parts;
        $ok = false;
        if (strncmp($hash, '$2y$', 4) === 0 || strncmp($hash, '$2a$', 4) === 0) {
            $ok = password_verify($pass, $hash);
        } else {
            $ok = hash_equals((string)crypt($pass, $hash), $hash);
        }
        if (hash_equals($u, $user) && $ok) {
            return true;
        }
    }
    return false;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /client-login.html', true, 302);
    exit;
}
$user = (string)($_POST['username'] ?? '');
$pass = (string)($_POST['password'] ?? '');
if (!htpasswd_ok($user, $pass, $passwdFile) || $secret === '') {
    header('Location: /client-login.html?err=1', true, 302);
    exit;
}
$exp = time() + 60 * 60 * 12;
$payload = $user . '|' . $exp;
$sig = hash_hmac('sha256', $payload, $secret);
$cookie = $payload . '.' . $sig;
header(
    'Set-Cookie: tm_auth=' . rawurlencode($cookie)
    . '; Path=/app; HttpOnly; Secure; SameSite=Lax; Max-Age=43200',
    false
);
header('Location: /app/', true, 302);
exit;
