import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publishedArticlesPath = path.resolve(__dirname, '../src/data/articles/published.json');
const outputDir = path.resolve(__dirname, '../social-scripts');

function generateSocialScripts() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let articles = [];
  try {
    if (fs.existsSync(publishedArticlesPath)) {
      articles = JSON.parse(fs.readFileSync(publishedArticlesPath, 'utf8'));
    }
  } catch (err) {
    console.error('Failed to read articles:', err.message);
    return;
  }

  articles.slice(0, 5).forEach((art) => {
    const scriptContent = `
🎬 [DK DROPZ / UNIQUE DIGIT 30-SEC REEL / SHORTS SCRIPT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 TITLE: ${art.title}
🏷️ TOPIC: ${art.category || 'Tech Guide'}
⏱️ TARGET RUNTIME: 30-45 Seconds

[0:00 - 0:05] 🔥 THE HOOK:
"Kya aap bhi ${art.title.slice(0, 40)}... lene ki soch rahe ho? Ruko! Yeh 3 baatein sune bina paise mat barbaad karna!"
(Visual: Fast zoom-in on product / high-contrast price tag badge)

[0:05 - 0:20] ⚡ CORE VALUE DROP:
- Point 1: Real-world benchmark performance vs hype.
- Point 2: Actual price drop & authentic Indian MRP breakdown.
- Point 3: Top flaw jo companies aapse chupate hain.

[0:20 - 0:30] 🚀 CALL TO ACTION (CTA):
"Poora benchmark matrix aur exact price tracker check karne ke liye bio me diye gaye link par click karo ya visit karo UniqueDigit.com! Aise hi brutal tech reviews ke liye DK DROPZ ko abhi follow karo!"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const fileName = `reel-${art.id || 'tech'}.txt`;
    fs.writeFileSync(path.join(outputDir, fileName), scriptContent, 'utf8');
  });

  console.log(`[Social Script Engine] Generated viral reel scripts in ${outputDir}`);
}

generateSocialScripts();
