<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>RSS Feed — <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #FAFAFA;
            color: #0F172A;
            line-height: 1.6;
            margin: 0;
            padding: 2rem 1rem;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #FFFFFF;
            padding: 2.5rem;
            border-radius: 1.5rem;
            border: 1px solid #E2E8F0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header {
            border-bottom: 2px solid #F1F5F9;
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
          }
          .badge {
            display: inline-block;
            background: #EEF2FF;
            color: #4F46E5;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
          }
          h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.75rem;
            font-weight: 800;
            color: #0F172A;
          }
          p.subtitle {
            margin: 0;
            color: #64748B;
            font-size: 0.95rem;
          }
          .item {
            padding: 1.5rem 0;
            border-bottom: 1px solid #F1F5F9;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
            font-weight: 700;
          }
          .item h2 a {
            color: #0F172A;
            text-decoration: none;
            transition: color 0.2s;
          }
          .item h2 a:hover {
            color: #4F46E5;
          }
          .item .meta {
            font-size: 0.8rem;
            color: #94A3B8;
            margin-bottom: 0.5rem;
          }
          .item p {
            margin: 0;
            color: #475569;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">📡 Live RSS Feed</span>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="subtitle"><xsl:value-of select="/rss/channel/description"/></p>
          </div>
          <div class="feed-list">
            <xsl:for-each select="/rss/channel/item">
              <div class="item">
                <h2>
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="link"/>
                    </xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <div class="meta">
                  Published: <xsl:value-of select="pubDate"/> • Category: <xsl:value-of select="category"/>
                </div>
                <p><xsl:value-of select="description"/></p>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
