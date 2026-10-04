// Re-exported from Central Single Source of Truth: src/data/realData.js
import { REAL_GTA_DATA, REAL_GAMING_PC_DATA } from './realData';

export const GTA_EDITIONS = [
  REAL_GTA_DATA.gta6,
  REAL_GTA_DATA.gta5
];

export const GAMING_PC_BUILDS = REAL_GAMING_PC_DATA.builds;

export const TRENDING_GAMES_INDIA = [
  {
    name: "GTA V / GTA RP",
    keyword: "Grand Theft Auto V",
    artwork: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
    publisher: "Rockstar North",
    niche: "gaming",
    genre: "Open World / Roleplay",
    popularity: "100/100 (Unbeatable)",
    playerBase: "12M+ Indian Fans",
    priceStatus: "Paid (₹999)",
    rating: 4.9,
    tip: "FiveM servers jaise Indian Roleplay (IRP) aur Subcontinent RP par daily 50k+ Indian players interact karte hain."
  },
  {
    name: "Valorant India",
    keyword: "Valorant",
    artwork: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=85",
    publisher: "Riot Games",
    niche: "gaming",
    genre: "Tactical FPS Esports",
    popularity: "98/100",
    playerBase: "6M+ Active Users",
    priceStatus: "100% Free to Play",
    rating: 4.8,
    tip: "Mumbai Servers par 12ms ping milta hai. Best starter agents: Sova, Reyna aur Killjoy."
  },
  {
    name: "Black Myth: Wukong",
    keyword: "Black Myth Wukong",
    artwork: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=85",
    publisher: "Game Science",
    niche: "gaming",
    genre: "Action RPG Souls-like",
    popularity: "94/100",
    playerBase: "Benchmark Darling",
    priceStatus: "₹3,599 (Steam)",
    rating: 4.9,
    tip: "Unreal Engine 5 ka best demonstration. Minimum 8GB VRAM card zaroori hai cinematic fluid combat ke liye."
  },
  {
    name: "Cyberpunk 2077: Phantom Liberty",
    keyword: "Cyberpunk 2077",
    artwork: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
    publisher: "CD PROJEKT RED",
    niche: "gaming",
    genre: "Sci-Fi Ray Tracing Showcase",
    popularity: "90/100",
    playerBase: "Graphics Benchmark King",
    priceStatus: "₹1,499 on Sale",
    rating: 4.7,
    tip: "Full Path Tracing mode GPU benchmarkers ka test ground hai. DLSS 3.5 Ray Reconstruction se picture crystal clear hoti hai."
  }
];
