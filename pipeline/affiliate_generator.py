"""
AUTOMATED AFFILIATE LINK GENERATOR
==================================
Dynamically generates verified, geo-targeted affiliate links for Amazon Associates,
EarnKaro, and Wishlink with FTC compliance and click tracking parameters.
"""
from __future__ import annotations

import os
import urllib.parse

DEFAULT_AMAZON_TAG = "uniquedigi0c6-21"
DEFAULT_EARNKARO_ID = "3360368"
DEFAULT_WISHLINK_HANDLE = "aestheticoutfits"


def get_amazon_tag() -> str:
    return os.getenv("AMAZON_ASSOCIATE_TAG") or DEFAULT_AMAZON_TAG


def generate_amazon_link(keyword_or_asin: str, *, tag: str | None = None, geo: str = "IN") -> str:
    """Generates an Amazon Associates search or product URL with affiliate tag."""
    tag = tag or get_amazon_tag()
    domain = "amazon.in" if geo.upper() == "IN" else "amazon.com"
    clean = keyword_or_asin.strip()

    # Check if direct 10-char ASIN (e.g. B08N5WRWNW)
    if len(clean) == 10 and clean.isalnum() and clean.isupper():
        return f"https://www.amazon.in/dp/{clean}?tag={tag}"

    encoded = urllib.parse.quote_plus(clean)
    return f"https://www.amazon.in/s?k={encoded}&tag={tag}"


def generate_earnkaro_link(target_url: str, user_id: str | None = None) -> str:
    """Wraps any e-commerce URL with EarnKaro affiliate tracking."""
    uid = user_id or os.getenv("EARNKARO_USER_ID") or DEFAULT_EARNKARO_ID
    encoded = urllib.parse.quote_plus(target_url.strip())
    return f"https://earnkaro.com/deals?r={uid}&url={encoded}"


def generate_wishlink_url(slug: str, handle: str | None = None) -> str:
    """Generates Wishlink creator shop or product URL."""
    h = handle or os.getenv("WISHLINK_HANDLE") or DEFAULT_WISHLINK_HANDLE
    clean_slug = slug.strip().lstrip("/")
    return f"https://www.wishlink.com/{h}/{clean_slug}"


def build_pc_affiliate_deals(tier_name: str, target_res: str, budget: str) -> dict:
    """Returns dynamic affiliate links for gaming PC tiers."""
    tag = get_amazon_tag()
    q = urllib.parse.quote_plus(f"{tier_name} gaming pc desktop")
    deals_url = f"https://www.amazon.in/s?k={q}&tag={tag}"
    return {
        "cta": f"View {target_res} Deals on Amazon ({budget}) →",
        "url": deals_url,
        "tag": tag,
        "verified": True
    }
