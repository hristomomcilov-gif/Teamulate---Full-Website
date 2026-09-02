<?php
/**
 * SuperHosting-safe sitemap. Echoes the XML declaration from PHP so
 * `<?xml` is never parsed as a short_open_tag (that 500s sitemap.xml).
 * Deploy to document root as /sitemap.php (see root.htaccess rewrite).
 */
header('Content-Type: application/xml; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
http_response_code(200);

$urls = [
    'https://teamulate.ca/',
    'https://teamulate.ca/autonomous-ai-marketing-department/',
    'https://teamulate.ca/ai-marketing-team/',
    'https://teamulate.ca/ai-marketing-automation/',
    'https://teamulate.ca/workflows/',
    'https://teamulate.ca/research/marketing-team-cost-2026/',
    'https://teamulate.ca/compare/ai-vs-agency-vs-fractional-vs-inhouse/',
    'https://teamulate.ca/blog/',
    'https://teamulate.ca/blog/11-human-hires-vs-11-ai-specialists/',
    'https://teamulate.ca/how-it-works/',
    'https://teamulate.ca/team/',
    'https://teamulate.ca/dashboard/',
    'https://teamulate.ca/pricing/',
    'https://teamulate.ca/security-governance/',
    'https://teamulate.ca/contact/',
    'https://teamulate.ca/request-demo/',
    'https://teamulate.ca/privacy/',
    'https://teamulate.ca/terms/',
];

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $url) {
    echo "  <url>\n    <loc>" . htmlspecialchars($url, ENT_XML1 | ENT_QUOTES, 'UTF-8') . "</loc>\n  </url>\n";
}
echo "</urlset>\n";
