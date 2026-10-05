// Structured Blog Data & Constants for UniqueDigit
// Provides clean structured objects for PC builds, gold rates, and product catalogs.

export const pcBuildData = {
  title: "Indian Gaming PC Build Pricing Guide",
  targetResolution: "1440p High RT Rig",
  lastVerified: "2026-10-05",
  components: [
    { id: "cpu", name: "AMD Ryzen 5 7600 (AM5)", price: 17200, category: "Processor" },
    { id: "gpu", name: "ZOTAC RTX 4070 Super 12GB", price: 58999, category: "Graphics Card" },
    { id: "motherboard", name: "Gigabyte B650M Gaming WiFi", price: 10500, category: "Motherboard" },
    { id: "ram", name: "32GB DDR5 6000MHz CL30", price: 8900, category: "Memory" },
    { id: "ssd", name: "1TB Gen4 NVMe SSD (WD Black)", price: 6400, category: "Storage" },
    { id: "psu", name: "Corsair 750W 80+ Gold Power Supply", price: 8600, category: "Power Supply" },
    { id: "cabinet", name: "Lian Li Lancool 216 Airflow", price: 7200, category: "Cabinet" }
  ]
};

export const goldRatesData = {
  date: "2026-10-05",
  rates: {
    "24K": { pricePerGram: 7462, dailyChange: 130, per10g: 74620 },
    "22K": { pricePerGram: 6842, dailyChange: 120, per10g: 68420 },
    "18K": { pricePerGram: 5597, dailyChange: 98, per10g: 55970 }
  },
  cities: [
    { city: "Mumbai", rate22k: 6842, rate24k: 7462, change: 120 },
    { city: "Delhi", rate22k: 6858, rate24k: 7480, change: 122 },
    { city: "Bangalore", rate22k: 6835, rate24k: 7455, change: 118 },
    { city: "Chennai", rate22k: 6870, rate24k: 7495, change: 125 },
    { city: "Hyderabad", rate22k: 6840, rate24k: 7460, change: 120 },
    { city: "Kolkata", rate22k: 6850, rate24k: 7470, change: 121 },
    { city: "Pune", rate22k: 6845, rate24k: 7465, change: 119 },
    { city: "Ahmedabad", rate22k: 6838, rate24k: 7458, change: 118 }
  ]
};
