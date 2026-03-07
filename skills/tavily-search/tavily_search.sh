#!/bin/bash
# Tavily Search - OpenClaw Tool Wrapper
# 这个脚本将 Tavily Skill 包装为 OpenClaw 可以直接调用的工具

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 执行 Node.js 脚本并传入所有参数
exec node "${SCRIPT_DIR}/index.js" "$@"
