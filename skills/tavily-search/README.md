# Tavily Search Skill for OpenClaw

[English](README.md) | [中文](README_zh.md)

## 📌 Overview

A high-quality web search skill for OpenClaw using Tavily AI API. Provides structured JSON results with AI-generated summaries.

## ✨ Features

- ✅ **AI Summary** - Automatically summarizes search results
- ✅ **Structured Data** - JSON format, no HTML parsing needed
- ✅ **Fast Response** - Average 0.7-1.2 seconds
- ✅ **Stable & Reliable** - No infinite loops, single call
- ✅ **Multi-result Support** - Up to 10 results

## 🔧 Installation

### 1. Install the Skill

```bash
# Copy this skill to your OpenClaw skills directory
cp -r tavily ~/.openclaw/skills/
```

### 2. Get Tavily API Key

1. Visit https://tavily.com/
2. Sign up for a free account
3. Get your API Key from Dashboard
4. Add to `~/.openclaw/config.json`:

```json
{
  "tavily": {
    "enabled": true,
    "api_key": "tvly-dev-YOUR_API_KEY"
  }
}
```

### 3. Disable Default Brave Search (Optional)

```json
{
  "tools": {
    "disabled": ["web_search"]
  },
  "search": {
    "priority": ["tavily", "exa-web-search-free"]
  }
}
```

### 4. Restart OpenClaw

```bash
# Check config changes
~/.openclaw/bin/config-check.sh

# If changed, safe restart
~/.openclaw/bin/oc-safe-restart
~/.openclaw/bin/oc-safe-restart -c  # cancel watchdog after success
```

## 📖 Usage

### From OpenClaw Chat

```
搜索 "你想查找的内容"
```

### Command Line

```bash
# Basic search
~/.openclaw/skills/tavily/index.js "your search query"

# Advanced search with options
~/.openclaw/skills/tavily/index.js "AI news" --depth=advanced --max-results=10
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--depth` | Search depth (basic/advanced) | basic |
| `--max-results` | Max results (1-10) | 5 |
| `--include-answer` | Include AI summary (true/false) | true |

## 📊 Comparison

| Feature | Brave Search | Tavily | exa-web-search-free |
|---------|-------------|--------|---------------------|
| Response Time | 2-5s | 0.7-1.2s | 1-2s |
| AI Summary | ❌ | ✅ | ✅ |
| Format | HTML | JSON | JSON |
| Stable | Sometimes loops | ✅ Stable | ✅ Stable |
| China Available | ❌ | ✅ | ✅ |
| Free Tier | Unlimited | 1000/month | Unlimited |

## � Free Tier

- **Tavily**: 1,000 searches/month (free)
- No credit card required

## 📁 Files

```
tavily/
├── README.md           # This file
├── README_zh.md        # 中文说明
├── SKILL.md           # OpenClaw skill definition
├── index.js           # Main search module
├── tavily_search.sh   # Shell wrapper script
└── LICENSE            # MIT License
```

## 🤝 Contributing

Issues and PRs are welcome!

## 📝 License

MIT License - See [LICENSE](LICENSE)

## 👤 Author

OpenClaw Community

---

*This skill is for technical sharing only. Please comply with Tavily's terms of service when using.*
