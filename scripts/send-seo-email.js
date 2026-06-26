'use strict';

(async () => {
  const date = new Date().toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const sitemapChanged = process.env.SITEMAP_CHANGED === 'true';
  const sitemapDate    = process.env.SITEMAP_DATE  || 'unknown';
  const pingStatus     = process.env.PING_STATUS   || 'unknown';
  const pingOk         = pingStatus === '200';

  const row = (label, valueHtml) =>
    '<tr style="border-bottom:1px solid #f3f4f6">'
    + '<td style="padding:12px 0;color:#6b7280;font-size:14px;width:45%">' + label + '</td>'
    + '<td style="padding:12px 0;font-size:14px">' + valueHtml + '</td>'
    + '</tr>';

  const tableRows =
    row('Sitemap lastmod',
      '<span style="font-weight:500;color:#111827">' + sitemapDate + '</span>')
    + row('Committed to main',
      sitemapChanged
        ? '<span style="font-weight:500;color:#16a34a">✅ Updated and pushed</span>'
        : '<span style="color:#6b7280">⏭️ Already current, skipped</span>')
    + row('Google crawl ping',
      pingOk
        ? '<span style="font-weight:500;color:#16a34a">✅ HTTP 200 — submitted</span>'
        : '<span style="font-weight:500;color:#dc2626">⚠️ HTTP ' + pingStatus + '</span>')
    + row('Sitemap URL',
      '<a href="https://www.iamyashkabra.com/sitemap.xml" style="color:#2563eb;text-decoration:none;font-size:13px">iamyashkabra.com/sitemap.xml</a>');

  const html = '<!DOCTYPE html><html lang="en"><body style="margin:0;padding:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif">'
    + '<div style="max-width:520px;margin:32px auto;padding:0 16px">'
    + '<div style="background:white;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08)">'
    + '<div style="background:#111827;padding:20px 24px">'
    + '<h1 style="margin:0;font-size:18px;font-weight:600;color:white">🔍 Daily SEO Maintenance</h1>'
    + '<p style="margin:4px 0 0;font-size:13px;color:#9ca3af">' + date + ' &nbsp;·&nbsp; iamyashkabra.com</p>'
    + '</div>'
    + '<div style="padding:24px">'
    + '<table style="width:100%;border-collapse:collapse"><tbody>' + tableRows + '</tbody></table>'
    + '<div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb">'
    + '<a href="' + (process.env.RUN_URL || '#') + '" style="display:inline-block;background:#111827;color:white;padding:9px 16px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500">View Workflow Run →</a>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px">Sent by GitHub Actions · iamyashkabra.com</p>'
    + '</div>'
    + '</body></html>';

  const subject = '[SEO] Daily maintenance — '
    + (sitemapChanged ? 'sitemap updated to ' + sitemapDate : 'no changes') + ' — ' + sitemapDate;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio SEO <onboarding@resend.dev>',
      to: ['yashkabra143@gmail.com'],
      subject,
      html,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    console.error('Resend API error:', JSON.stringify(body, null, 2));
    process.exit(1);
  }
  console.log('SEO email sent. Resend ID:', body.id);
})();
