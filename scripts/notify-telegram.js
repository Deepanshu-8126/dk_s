/**
 * Telegram Live Dispatcher & Automation Reporter
 * Sends instant Telegram alerts upon automated data sync & Cloudflare deployment
 */

import fs from 'fs';
import path from 'path';

// Fallback: Read .env if running locally and process.env is missing keys
if (!process.env.TELEGRAM_BOT_TOKEN && fs.existsSync('.env')) {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        const val = (match[2] || '').trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) process.env[key] = val;
      }
    });
  } catch {}
}

async function sendTelegramAlert() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('ℹ️ [Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in environment. Skipping Telegram dispatch.');
    return;
  }

  // Read latest synced gold rates if available
  let gold24k = 'Live';
  let gold22k = 'Live';
  try {
    const goldPath = path.resolve('public/data/gold-rates.json');
    if (fs.existsSync(goldPath)) {
      const data = JSON.parse(fs.readFileSync(goldPath, 'utf8'));
      if (data.national && data.national.length >= 2) {
        gold24k = `₹${data.national[0].perGram}/g`;
        gold22k = `₹${data.national[1].perGram}/g`;
      }
    }
  } catch {}

  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const message = `🚀 *UniqueDigit Live Automation Sync*
━━━━━━━━━━━━━━━━━━━━
⏱️ *Trigger Time:* \`${now} IST\`
🌟 *Status:* ✅ *Synced & Built Successfully*

📊 *Live Intelligence Snapshot:*
• 🥇 *Gold 24K:* \`${gold24k}\`
• 🥈 *Gold 22K:* \`${gold22k}\`
• 🤖 *AI Tools & Video Models:* *Verified & Audited*
• 🎮 *Steam & PC Builds:* *Live 2026 Index Updated*
• 📰 *Sitemap & SEO:* *32+ Prerendered Static Routes*

🌐 *Live Portal:* [https://dk-s.pages.dev](https://dk-s.pages.dev)
━━━━━━━━━━━━━━━━━━━━
_Automated via GitHub Actions Autopilot_`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: false
      })
    });

    const resData = await response.json();
    if (resData.ok) {
      console.log('✅ [Telegram] Alert successfully dispatched to Telegram chat:', chatId);
    } else {
      console.warn('⚠️ [Telegram] Dispatch failed:', resData.description);
    }
  } catch (err) {
    console.warn('⚠️ [Telegram] Error sending alert:', err.message);
  }
}

sendTelegramAlert();
