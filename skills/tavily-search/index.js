#!/usr/bin/env node
/**
 * Tavily Search Skill for OpenClaw
 * 
 * Usage: node index.js "search query" [options]
 * 
 * Options:
 *   --depth=basic|advanced    搜索深度 (默认: basic)
 *   --max-results=N          最大结果数 (默认: 5, 最大: 10)
 *   --include-answer=true|false  是否包含AI摘要 (默认: true)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  apiEndpoint: 'api.tavily.com',
  apiPath: '/search',
  defaultMaxResults: 5,
  defaultDepth: 'basic',
  defaultIncludeAnswer: true
};

// 获取 API Key
function getApiKey() {
  // 1. 优先从环境变量获取
  if (process.env.TAVILY_API_KEY) {
    return process.env.TAVILY_API_KEY;
  }
  
  // 2. 从配置文件获取
  try {
    const configPath = path.join(process.env.HOME, '.openclaw', 'config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.tavily && config.tavily.api_key) {
        return config.tavily.api_key;
      }
    }
  } catch (e) {
    // 忽略配置读取错误
  }
  
  return null;
}

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    query: '',
    depth: CONFIG.defaultDepth,
    maxResults: CONFIG.defaultMaxResults,
    includeAnswer: CONFIG.defaultIncludeAnswer
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--depth=')) {
      options.depth = arg.split('=')[1];
    } else if (arg.startsWith('--max-results=')) {
      options.maxResults = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--include-answer=')) {
      options.includeAnswer = arg.split('=')[1] === 'true';
    } else if (!arg.startsWith('--')) {
      // 这是搜索查询
      options.query = arg;
    }
  }
  
  return options;
}

// 执行搜索
function search(query, options) {
  return new Promise((resolve, reject) => {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      reject(new Error('TAVILY_API_KEY not found. Please set it in environment or ~/.openclaw/config.json'));
      return;
    }
    
    const postData = JSON.stringify({
      query: query,
      search_depth: options.depth,
      max_results: Math.min(options.maxResults, 10),
      include_answer: options.includeAnswer
    });
    
    const requestOptions = {
      hostname: CONFIG.apiEndpoint,
      path: CONFIG.apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000 // 10秒超时
    };
    
    const req = https.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          if (res.statusCode !== 200) {
            reject(new Error(`API Error: ${result.detail || data}`));
            return;
          }
          
          resolve(result);
        } catch (e) {
          reject(new Error(`Parse Error: ${e.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request Error: ${error.message}`));
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request Timeout'));
    });
    
    req.write(postData);
    req.end();
  });
}

// 格式化结果为 Markdown
function formatResults(result) {
  let output = `## Tavily 搜索结果\n\n`;
  output += `**查询**: ${result.query}\n`;
  output += `**响应时间**: ${result.response_time?.toFixed(2) || 'N/A'}s\n\n`;
  
  if (result.answer) {
    output += `### 🤖 AI 摘要\n\n${result.answer}\n\n`;
  }
  
  if (result.results && result.results.length > 0) {
    output += `### 📚 搜索结果\n\n`;
    
    result.results.forEach((item, index) => {
      output += `${index + 1}. **[${item.title}](${item.url})**\n`;
      output += `   ${item.content?.substring(0, 200)}${item.content?.length > 200 ? '...' : ''}\n`;
      output += `   相关度: ${(item.score * 100).toFixed(1)}%\n\n`;
    });
  }
  
  return output;
}

// 主函数
async function main() {
  try {
    const options = parseArgs();
    
    if (!options.query) {
      console.error('Usage: node index.js "search query" [--depth=basic|advanced] [--max-results=N]');
      console.error('');
      console.error('Examples:');
      console.error('  node index.js "OpenClaw documentation"');
      console.error('  node index.js "AI safety" --depth=advanced --max-results=10');
      process.exit(1);
    }
    
    console.error(`🔍 Searching: ${options.query}...`);
    
    const result = await search(options.query, options);
    
    // 输出 JSON 到 stdout（供程序调用）
    console.log(JSON.stringify(result, null, 2));
    
    // 格式化输出到 stderr（供人类阅读）
    console.error('\n' + formatResults(result));
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行
if (require.main === module) {
  main();
}

// 导出供其他模块使用
module.exports = { search, getApiKey };
