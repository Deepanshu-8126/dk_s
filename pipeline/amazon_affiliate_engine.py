"""
Automated Amazon Affiliate Engine for UniqueDigit
Bulk-generates verified Amazon India affiliate URLs for products, ASINs,
PC builds, and search queries, and syncs them across the entire portal.
"""

import os
import sys
import json
import argparse
import urllib.parse
from datetime import datetime

PORTAL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "uniquedigit-portal"))
SRC_PRODUCTS_JSON = os.path.join(PORTAL_DIR, "src", "data", "productsCatalog.json")
PUB_PRODUCTS_JSON = os.path.join(PORTAL_DIR, "public", "data", "products-catalog.json")
ENV_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))

def get_current_tag():
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("AMAZON_ASSOCIATE_TAG="):
                    return line.strip().split("=", 1)[1].strip()
    return os.getenv("AMAZON_ASSOCIATE_TAG", "")

def build_affiliate_url(title_or_asin, tag=""):
    clean = str(title_or_asin or "").strip()
    tag_clean = str(tag or "").strip()

    if not clean:
        return f"https://www.amazon.in/?tag={urllib.parse.quote(tag_clean)}" if tag_clean else "https://www.amazon.in/"

    # Clean title keywords (strip brackets and extra spaces)
    clean_keywords = clean.replace("(", " ").replace(")", " ").replace("-", " ")
    clean_keywords = " ".join(clean_keywords.split())
    
    q = urllib.parse.quote_plus(clean_keywords)
    if tag_clean:
        return f"https://www.amazon.in/s?k={q}&tag={urllib.parse.quote(tag_clean)}"
    return f"https://www.amazon.in/s?k={q}"

def apply_tag_to_catalog(tag):
    tag = tag.strip()
    print(f"[Amazon Engine] Applying Associate Tag: '{tag or 'DIRECT_LINKS'}' to catalog...")
    
    updated_count = 0
    for target_path in [SRC_PRODUCTS_JSON, PUB_PRODUCTS_JSON]:
        if not os.path.exists(target_path):
            continue
        try:
            with open(target_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            data["amazonTagConfigured"] = bool(tag)
            data["activeAmazonTag"] = tag
            data["lastAffiliateSync"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S IST")
            
            for prod in data.get("products", []):
                asin = prod.get("asin")
                title = prod.get("title", "")
                target_key = title if title else asin
                prod["affiliateUrl"] = build_affiliate_url(target_key, tag)
                updated_count += 1
            
            with open(target_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            
            print(f" -> Successfully synced {len(data.get('products', []))} products in: {os.path.basename(target_path)}")
        except Exception as e:
            print(f" [!] Error syncing {target_path}: {e}")

    # Save tag to .env for persistence
    try:
        env_lines = []
        tag_updated = False
        if os.path.exists(ENV_FILE):
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                env_lines = f.readlines()
        
        new_env_lines = []
        for line in env_lines:
            if line.startswith("AMAZON_ASSOCIATE_TAG="):
                new_env_lines.append(f"AMAZON_ASSOCIATE_TAG={tag}\n")
                tag_updated = True
            else:
                new_env_lines.append(line)
        
        if not tag_updated:
            new_env_lines.append(f"AMAZON_ASSOCIATE_TAG={tag}\n")
        
        with open(ENV_FILE, "w", encoding="utf-8") as f:
            f.writelines(new_env_lines)
        print(f" -> Persisted AMAZON_ASSOCIATE_TAG='{tag}' to .env")
    except Exception as e:
        print(f" [!] Error updating .env: {e}")

    print(f"[Amazon Engine] Done! Total product affiliate links regenerated: {updated_count}")

def main():
    parser = argparse.ArgumentParser(description="Automated Amazon Affiliate Engine")
    parser.add_argument("--tag", type=str, default="", help="Your Amazon Associates Tag (e.g. deepanshu-21)")
    parser.add_argument("--show", action="store_true", help="Display current configured tag and sample links")
    args = parser.parse_args()

    current_tag = get_current_tag()
    if args.show:
        print(f"Current Configured Tag: '{current_tag}'")
        sample_link = build_affiliate_url("B0DHBY87P1", current_tag)
        print(f"Sample iPhone 16 Pro Link: {sample_link}")
        return

    target_tag = args.tag.strip() if args.tag else current_tag
    if not target_tag and len(sys.argv) == 1:
        print("No tag passed. Run with: python amazon_affiliate_engine.py --tag YOUR_TAG-21")
        print("Using existing tag or generating clean direct links...")
    
    apply_tag_to_catalog(target_tag)

if __name__ == "__main__":
    main()
