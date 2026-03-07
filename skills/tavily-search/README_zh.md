# Tavily Search Skill for OpenClaw

[English](README.md) | 中文

## 📌 简介

使用 Tavily AI API 的高质量网页搜索技能，为 OpenClaw 提供结构化 JSON 结果和 AI 摘要。

## ✨ 功能特点

- ✅ **AI 智能摘要** - 自动总结搜索结果
- ✅ **结构化数据** - JSON 格式，无需解析 HTML
- ✅ **极速响应** - 平均 0.7-1.2 秒
- ✅ **稳定可靠** - 无死循环风险，单次调用
- ✅ **多结果支持** - 最多返回 10 条结果

## 🔧 安装

### 1. 安装 Skill

```bash
# 复制 skill 到 OpenClaw 技能目录
cp -r tavily ~/.openclaw/skills/
```

### 2. 获取 Tavily API Key

1. 访问 https://tavily.com/
2. 注册免费账号
3. 从 Dashboard 获取 API Key
4. 添加到 `~/.openclaw/config.json`:

```json
{
  "tavily": {
    "enabled": true,
    "api_key": "tvly-dev-你的API密钥"
  }
}
```

### 3. 禁用默认 Brave Search（可选）

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

### 4. 重启 OpenClaw

```bash
# 检查配置变更
~/.openclaw/bin/config-check.sh

# 如果变更了，执行安全重启
~/.openclaw/bin/oc-safe-restart
~/.openclaw/bin/oc-safe-restart -c  # 成功后取消 watchdog
```

## 📖 使用方法

### OpenClaw 对话中

```
搜索 "你想查找的内容"
```

### 命令行

```bash
# 基本搜索
~/.openclaw/skills/tavily/index.js "搜索内容"

# 高级选项
~/.openclaw/skills/tavily/index.js "AI新闻" --depth=advanced --max-results=10
```

### 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--depth` | 搜索深度 (basic/advanced) | basic |
| `--max-results` | 最大结果数 (1-10) | 5 |
| `--include-answer` | 包含 AI 摘要 (true/false) | true |

## 📊 对比

| 特性 | Brave Search | Tavily | exa-web-search-free |
|------|-------------|--------|---------------------|
| 响应时间 | 2-5秒 | 0.7-1.2秒 | 1-2秒 |
| AI 摘要 | ❌ | ✅ | ✅ |
| 格式 | HTML | JSON | JSON |
| 稳定性 | 偶有死循环 | ✅ 稳定 | ✅ 稳定 |
| 国内可用 | ❌ | ✅ | ✅ |
| 免费额度 | 无限 | 1000次/月 | 无限 |

## 💰 免费额度

- **Tavily**: 每月 1,000 次搜索（免费）
- 无需信用卡

## 📁 文件结构

```
tavily/
├── README.md           # 英文说明
├── README_zh.md        # 本文件
├── SKILL.md           # OpenClaw skill 定义
├── index.js           # 主搜索模块
├── tavily_search.sh   # Shell 包装脚本
└── LICENSE            # MIT 许可证
```

## 🤝 贡献

欢迎提交 Issue 和 PR！

## 📝 许可证

MIT 许可证 - 查看 [LICENSE](LICENSE)

## 👤 作者

OpenClaw Community

---

*本技能仅供技术分享使用。使用时请遵守 Tavily 服务条款。*
