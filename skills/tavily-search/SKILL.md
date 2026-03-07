---
name: tavily-search
version: 1.0.0
description: "使用 Tavily AI API 进行高质量的网页搜索，替代 Brave Search。提供结构化 JSON 结果、AI 生成的摘要。"
author: LankFa
---

# Tavily Search Skill

## 描述
使用 Tavily AI API 进行高质量的网页搜索，替代 Brave Search。提供结构化 JSON 结果、AI 生成的摘要，响应速度快且稳定。

## 功能特点
- ✅ **AI 智能摘要** - 自动总结搜索结果
- ✅ **结构化数据** - JSON 格式，无需解析 HTML
- ✅ **极速响应** - 平均 0.7-1.2 秒
- ✅ **稳定可靠** - 无死循环风险，单次调用
- ✅ **多结果支持** - 最多返回 10 条高质量结果

## 使用方式

### 作为工具调用
```
使用 tavily_search 搜索 "你想查找的内容"
```

### 直接运行脚本
```bash
~/.openclaw/skills/tavily/index.js "搜索内容"
```

## 配置要求

### 环境变量
```bash
export TAVILY_API_KEY="tvly-dev-xxx"
```

### 或配置文件
`~/.openclaw/config.json`:
```json
{
  "tavily": {
    "enabled": true,
    "api_key": "tvly-dev-xxx"
  }
}
```

## 返回格式

### 成功响应
```json
{
  "query": "搜索关键词",
  "answer": "AI 生成的答案摘要",
  "results": [
    {
      "title": "结果标题",
      "url": "https://example.com",
      "content": "内容摘要",
      "score": 0.95
    }
  ],
  "response_time": 0.72
}
```

## 与 Brave Search 对比

| 特性 | Brave Search | Tavily |
|------|-------------|--------|
| 响应时间 | 2-5s | 0.7-1.2s |
| 结果格式 | HTML | JSON |
| AI 摘要 | ❌ | ✅ |
| 稳定性 | 偶发死循环 | ✅ 稳定 |
| 国内可用 | ❌ | ✅ |

## 注意事项
- 免费额度：1000 次/月
- 需要有效的 Tavily API Key
- 搜索深度可选：basic（快）或 advanced（全面）

## 版本
v1.0.0 - 初始版本，基础搜索功能

## 作者
蓝克队长的 AI 助手 - 爪爪 🐾
