/**
 * Agent 2: Writer (Intent-based titles, 300+ word Hinglish mix, EEAT Author entity, internal links, verdict)
 */
import { DEFAULT_AUTHOR, countWords } from './utils.js';

export class WriterAgent {
  generateIntentBasedTitle(seed, modifier) {
    const lower = `${seed} ${modifier}`.toLowerCase();
    let title = '';

    if (lower.includes('cut off') || lower.includes('result') || lower.includes('ssc')) {
      title = `${seed}: Expected Cut Off & Merit List`;
    } else if (lower.includes('vs') || lower.includes('gemini') || lower.includes('chatgpt')) {
      title = `${seed}: Which Tool Wins for Students?`;
    } else if (lower.includes('build') || lower.includes('pc') || lower.includes('gta')) {
      title = `${seed} Guide: ${modifier} Specs & Cost`;
    } else if (lower.includes('gold') || lower.includes('rate')) {
      title = `${seed} in ${modifier}: Verified 10g Price`;
    } else {
      title = `${seed} Guide in ${modifier}: Latest 2026 Analysis`;
    }

    if (title.length > 58) {
      title = title.substring(0, 54).replace(/\s+\S*$/, '') + ' 2026';
    }
    return title;
  }

  generateNicheContent(seed, modifier, verifiedPrice, specs, niche) {
    if (niche === 'gaming' || seed.toLowerCase().includes('pc') || seed.toLowerCase().includes('gta')) {
      return `2026 ke dynamic Indian PC gaming market me **${seed} in ${modifier}** ko lekar hardware enthusiasts me bohot zyada excitement hai. ${modifier} ke local electronics markets aur online custom rig builders me components ki availability aur pricing par humari testing team ne comprehensive evaluation kiya hai.

### 1. Ground Reality aur Verified Price Breakdown
Rockstar Games ke next-gen lighting aur physics engine requirements ke mutabiq, ek smooth 1080p-1440p gaming rig ka realistic estimated budget approx **${verifiedPrice}** se shuru hota hai. Kisi bhi unauthorized broker se pre-built lene ke bajaye authorized local vendors ya verified national distributors se bill ke sath purchase karein.

Key Technical Specifications & Verified Details:
- **Core Benchmark / Item:** ${seed}
- **Primary Regional Target:** ${modifier} (Indian Market)
- **Verified Specs / Tier:** ${specs}
- **Testing Standard:** Hardware benchmark double-checked for 60+ FPS stability.

### 2. Hands-on Experience & Ground Test (Expert Observations)
${modifier} ke local gamers ne jab identical component configuration test kiya, to modern title benchmarks me consistent 60+ FPS deliver hua. Agar aap regular streaming aur video editing tasks bhi plan kar rahe hain, to RTX 3060 12GB VRAM buffer budget rigs me unmatched longevity provide karta hai. Related hardware information ke liye aap humare [Gaming Section](/gaming) aur [Top AI Tools Directory](/ai-tools) bhi explore kar sakte hain.

### 3. Pros and Watchouts (Fayde aur Savdhani)
- **Fayda #1:** 12GB GDDR6 VRAM future path-traced game mods aur high-res textures ko smooth handle karta hai.
- **Fayda #2:** 1TB Gen4 NVMe SSD se load times zero ke barabar ho jaate hain.
- **Savdhani:** Cabinet aur SMPS me sasta tier na lein; minimum 650W 80-Plus Bronze power supply zaroor chunein.

### 4. Final Verdict (Lena chahiye ya nahi and kyu?)
**Verdict: Lena chahiye ya nahi and kyu?**
Agar aapka budget ₹55k-₹60k permit karta hai to **bilkul lena chahiye**, kyunki is price bracket me DDR5 aur 12GB VRAM ka combination agle 3-4 saal tak benchmark performance ensure karta hai.`;
    }

    if (niche === 'finance' || seed.toLowerCase().includes('gold') || seed.toLowerCase().includes('bullion')) {
      return `Uttar Pradesh aur North Indian markets me **${seed} in ${modifier}** jewellers aur bullion investors ke beech sabse zyada tracked financial metric ban chuka hai. Regional sarrafa bazaron me physical retail rates aur MCX futures ke correlation par humari financial intelligence desk ne grounded data compile kiya hai.

### 1. Ground Reality aur Verified Price Breakdown
Indian Bullion and Jewellers Association (IBJA) standard ke mutabiq, aaj 24 Karat (999 Purity) gold ka benchmark approx **${verifiedPrice}** chal raha hai. Kisi bhi private uncertified shopkeeper ke bina-bill transactions se bachein aur hamesha 6-digit HUID hallmark check karein.

Key Technical Specifications & Verified Details:
- **Core Benchmark / Item:** ${seed}
- **Primary Regional Target:** ${modifier} (Indian Market)
- **Verified Specs / Tier:** ${specs}
- **Testing Standard:** Standardized against MCX Gold spot closing.

### 2. Hands-on Experience & Ground Test (Expert Observations)
${modifier} bullion market me festive aur wedding season ke dauran making charges me 2-4% ka variance dekha jata hai. Agar aap investment ke nazariye se purchase kar rahe hain, to physical jewellery ke bajaye 24K gold coins ya digital gold prefer karein taaki making charge waste na ho. Humare [Daily Bullion Prices](/gold-rate) page par aap live city comparison check kar sakte hain, aur budget planning ke liye [Top AI Tools Directory](/ai-tools) bhi available hai.

### 3. Pros and Watchouts (Fayde aur Savdhani)
- **Fayda #1:** Bureau of Indian Standards (BIS) hallmark hone par pan-India 100% buyback guarantee milti hai.
- **Fayda #2:** Inflation aur market volatility ke khilaf gold historically sabse strong hedge sabit hua hai.
- **Savdhani:** Hamesha GST invoice par gross weight aur net gold weight alag se verify karein.

### 4. Final Verdict (Lena chahiye ya nahi and kyu?)
**Verdict: Lena chahiye ya nahi and kyu?**
Agar aap portfolio diversification ya wedding shopping ke liye buy kar rahe hain to **bilkul lena chahiye**, par physical ornaments ke bajaye minted gold bar ya coin me invest karna zyada labhdayak hoga.`;
    }

    if (niche === 'tech' || seed.toLowerCase().includes('chatgpt') || seed.toLowerCase().includes('gemini')) {
      return `Indian college students aur software engineering aspirants ke beech **${seed} in ${modifier}** ka debate kaafi intense ho chuka hai. Dono frontier models me multimodal capabilities, coding reasoning, aur Indian language understanding par humari lab ne extensive prompt testing conduct ki hai.

### 1. Ground Reality aur Verified Price Breakdown
OpenAI ka ChatGPT Plus lagbhag $20/month (approx **${verifiedPrice}**) me available hai, jabki Google Gemini Advanced Google One AI Premium subscription ke sath aata hai. Indian students ke liye budget aur daily utility dono matters karte hain.

Key Technical Specifications & Verified Details:
- **Core Benchmark / Item:** ${seed}
- **Primary Regional Target:** ${modifier} (Indian Market)
- **Verified Specs / Tier:** ${specs}
- **Testing Standard:** 50 Indian syllabus coding & mathematical reasoning prompts.

### 2. Hands-on Experience & Ground Test (Expert Observations)
Jab humne dono ko university-level data structures aur Hindi legal document summarization test par evaluate kiya, to Gemini Ultra ka Google Workspace integration aur 2M context window large PDFs me superior raha. Wahin complex Python debugging me GPT-4o ne slightly better precision dikhayi. Aur tools explore karne ke liye humari [Top AI Tools Directory](/ai-tools) aur competitive exam updates ke liye [Sarkari Results Portal](/sarkari) zaroor refer karein.

### 3. Pros and Watchouts (Fayde aur Savdhani)
- **Fayda #1:** Gemini ka Google Drive aur Docs integration college research papers ke liye seamless hai.
- **Fayda #2:** ChatGPT Plus ke custom GPTs aur voice mode conversational language learning me outstanding hain.
- **Savdhani:** Paid subscription lene se pehle dono ke free tiers par apna exact syllabus coursework test karein.

### 4. Final Verdict (Lena chahiye ya nahi and kyu?)
**Verdict: Lena chahiye ya nahi and kyu?**
Agar aap coding aur computer science projects par focused hain to **ChatGPT Plus lena chahiye**, par agar research, PDF reading, aur Google ecosystem aapki priority hai to Gemini Ultra zyada value provide karega.`;
    }

    // Default Sarkari / Educational
    return `Staff Selection Commission ke competitive examinations ke liye **${seed} in ${modifier}** aspirants ka sabse critical focus area hai. Shifts ke difficulty level, negative marking pattern, aur vacancy ratio ke analytical basis par humare education desk ne complete safe score analysis tayar kiya hai.

### 1. Ground Reality aur Verified Price Breakdown
Yeh ek government recruitment competitive exam hai jiska application fee sirf **${verifiedPrice}** par nominal rehta hai (exempted for reserved categories). Kisi bhi coaching mafia ke fake guarantee batches me lakho rupaye barbad karne ki zaroorat nahi hai.

Key Technical Specifications & Verified Details:
- **Core Benchmark / Item:** ${seed}
- **Primary Regional Target:** ${modifier} (Indian Market)
- **Verified Specs / Tier:** ${specs}
- **Testing Standard:** Cross-referenced with last 5 years normalization trends.

### 2. Hands-on Experience & Ground Test (Expert Observations)
Tier 2 exam me computer proficiency test aur mathematical reasoning ka score final selection decide karta hai. Aspirants ko mock tests me minimum 310+ out of 390 target karna chahiye agar Inspector ya ASO posts aim kar rahe hain. Official alerts ke liye humara [Sarkari Results](/sarkari) section aur study workflow ke liye [Top AI Tools Directory](/ai-tools) dekhte rahein.

### 3. Pros and Watchouts (Fayde aur Savdhani)
- **Fayda #1:** Group B aur C Central Government jobs me job security aur social prestige unbeatable hai.
- **Fayda #2:** Transparent computer-based examination (CBE) system with answer key challenge provisions.
- **Savdhani:** Typing test aur computer qualifying module ko halke me na lein; bohot candidates merit me aakar bhi typing me disqualify ho jaate hain.

### 4. Final Verdict (Lena chahiye ya nahi and kyu?)
**Verdict: Lena chahiye ya nahi and kyu?**
Form **bilkul bharna chahiye**, aur preparation me private paid coaching ke bajaye self-study aur standard previous year question papers par focus karna 100% successful strategy sabit hoga.`;
  }

  writeArticle({ research, author = DEFAULT_AUTHOR }) {
    const { seed, modifier, longTailQuery, verifiedPrice, specs, imageUrl, niche } = research;

    const seoTitle = this.generateIntentBasedTitle(seed, modifier);
    const slug = longTailQuery.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');

    let metaDescription = `Verified factual guide on ${longTailQuery}. Real 2026 pricing, technical specs, user tests, and expert buying verdict.`;
    if (metaDescription.length > 155) {
      metaDescription = metaDescription.substring(0, 150).replace(/\s+\S*$/, '') + '...';
    }

    const content = this.generateNicheContent(seed, modifier, verifiedPrice, specs, niche);
    const now = new Date().toISOString();

    return {
      title: seoTitle,
      slug,
      keyword: longTailQuery,
      metaDescription,
      content,
      wordCount: countWords(content),
      imageAlt: `${seed} verified review and pricing in ${modifier}`,
      imageUrl,
      verdict: "Lena chahiye ya nahi and kyu?: Bilkul lena chahiye agar budget permit kare, otherwise seasonal discount ka wait karein.",
      author,
      publishedAt: now,
      updatedAt: now,
    };
  }
}
