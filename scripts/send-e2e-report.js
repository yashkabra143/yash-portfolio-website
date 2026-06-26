import fs from 'fs';

(async () => {
  const date = new Date().toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  let stats = { expected: 0, unexpected: 0, skipped: 0, flaky: 0 };
  let testRows = '';

  try {
    const data = JSON.parse(fs.readFileSync('test-results/results.json', 'utf8'));
    stats = data.stats || stats;

    // Playwright JSON: file suites (have "file" prop) wrap describe suites (have specs).
    // Skip file-suite titles so the Suite column shows the describe name only.
    function collectTests(suites, parentDescribe) {
      for (const suite of (suites || [])) {
        const isFileSuite = 'file' in suite;
        const suiteName   = isFileSuite ? '' : suite.title;
        const displayName = parentDescribe && suiteName
          ? parentDescribe + ' › ' + suiteName
          : (suiteName || parentDescribe || '');

        for (const spec of (suite.specs || [])) {
          const test     = spec.tests && spec.tests[0];
          const status   = (test && test.status) || 'unknown';
          const duration = (test && test.results && test.results[0] && test.results[0].duration) || 0;
          const icon     = status === 'expected' ? '✅' : status === 'skipped' ? '⏭️' : '❌';
          const rowBg    = status === 'expected' ? '#f0fdf4' : status === 'skipped' ? '#fefce8' : '#fef2f2';
          testRows += '<tr style="background:' + rowBg + '">'
            + '<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:13px">' + icon + ' ' + spec.title + '</td>'
            + '<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280">' + displayName + '</td>'
            + '<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;text-align:right;color:#6b7280">' + (duration / 1000).toFixed(2) + 's</td>'
            + '</tr>';
        }
        collectTests(suite.suites, displayName || suiteName);
      }
    }
    collectTests(data.suites, '');
  } catch (e) {
    testRows = '<tr><td colspan="3" style="padding:12px;color:#ef4444;font-size:13px">'
      + '⚠️ Could not parse results JSON: ' + e.message + '</td></tr>';
  }

  const total   = (stats.expected || 0) + (stats.unexpected || 0) + (stats.skipped || 0) + (stats.flaky || 0);
  const passed  = stats.expected   || 0;
  const failed  = stats.unexpected || 0;
  const skipped = stats.skipped    || 0;
  const outcome = process.env.TEST_OUTCOME || '';
  const isPass  = failed === 0 && outcome !== 'failure';

  const bannerBg   = isPass ? '#16a34a' : '#dc2626';
  const bannerIcon = isPass ? '✅' : '❌';
  const bannerText = isPass
    ? 'All ' + total + ' tests passed'
    : failed + ' test' + (failed !== 1 ? 's' : '') + ' failed';

  const statCard = (n, label, bg, border, color) =>
    '<td style="width:25%;padding:0 6px">'
    + '<div style="text-align:center;padding:14px;background:' + bg + ';border-radius:8px;border:1px solid ' + border + '">'
    + '<div style="font-size:26px;font-weight:700;color:' + color + '">' + n + '</div>'
    + '<div style="font-size:11px;color:#6b7280;margin-top:2px;text-transform:uppercase;letter-spacing:.05em">' + label + '</div>'
    + '</div></td>';

  const html = '<!DOCTYPE html><html lang="en"><body style="margin:0;padding:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif">'
    + '<div style="max-width:680px;margin:32px auto;padding:0 16px">'
    + '<div style="background:white;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08)">'
    + '<div style="background:#111827;padding:20px 24px">'
    + '<h1 style="margin:0;font-size:18px;font-weight:600;color:white">🎭 Portfolio E2E — Daily Report</h1>'
    + '<p style="margin:4px 0 0;font-size:13px;color:#9ca3af">' + date + ' &nbsp;·&nbsp; iamyashkabra.com</p>'
    + '</div>'
    + '<div style="padding:24px">'
    + '<table style="width:100%;border-collapse:collapse;margin-bottom:20px"><tr>'
    + statCard(total,   'Total',   '#f9fafb', '#e5e7eb', '#111827')
    + statCard(passed,  'Passed',  '#f0fdf4', '#bbf7d0', '#16a34a')
    + statCard(failed,  'Failed',  failed > 0 ? '#fef2f2' : '#f9fafb', failed > 0 ? '#fecaca' : '#e5e7eb', failed > 0 ? '#dc2626' : '#9ca3af')
    + statCard(skipped, 'Skipped', '#f9fafb', '#e5e7eb', '#9ca3af')
    + '</tr></table>'
    + '<div style="background:' + bannerBg + ';color:white;padding:12px 16px;border-radius:6px;margin-bottom:24px;font-size:14px;font-weight:600">'
    + bannerIcon + ' ' + bannerText
    + '</div>'
    + '<p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em">Per-Test Results</p>'
    + '<div style="border-radius:6px;overflow:hidden;border:1px solid #e5e7eb">'
    + '<table style="width:100%;border-collapse:collapse">'
    + '<thead><tr style="background:#f9fafb">'
    + '<th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb">Test</th>'
    + '<th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb">Suite</th>'
    + '<th style="padding:9px 12px;text-align:right;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb">Duration</th>'
    + '</tr></thead>'
    + '<tbody>' + testRows + '</tbody>'
    + '</table></div>'
    + '<div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb">'
    + '<a href="' + (process.env.RUN_URL || '#') + '" style="display:inline-block;background:#111827;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500">View Run &amp; Download Report →</a>'
    + '<p style="margin:10px 0 0;font-size:12px;color:#9ca3af">HTML report is available as a downloadable artifact on the run above (7-day retention).</p>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px">Sent by GitHub Actions · iamyashkabra.com</p>'
    + '</div>'
    + '</body></html>';

  const subject = '[' + (isPass ? 'PASS' : 'FAIL') + '] Portfolio E2E — ' + passed + '/' + total + ' passed — ' + date;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio CI <onboarding@resend.dev>',
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
  console.log('Email sent. Resend ID:', body.id);
})();
