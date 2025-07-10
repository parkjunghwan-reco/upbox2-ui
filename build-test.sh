#!/bin/bash

# 로컬 배포 테스트 스크립트
echo "🚀 Starting local build test..."

# 각 패키지의 의존성 설치
echo "📦 Installing dependencies..."
npm install

echo "📦 Installing core dependencies..."
cd packages/core && npm install
cd ../..

echo "📦 Installing tailwind dependencies..."
cd packages/tailwind && npm install
cd ../..

echo "📦 Installing vue dependencies..."
cd packages/vue && npm install
cd ../..

echo "📦 Installing storybook dependencies..."
cd packages/storybook && npm install
cd ../..

echo "📦 Installing example dependencies..."
cd packages/example && npm install
cd ../..

# 빌드 실행
echo "🔨 Building packages..."

echo "Building core..."
cd packages/core
npm run build || { echo "❌ Core build failed"; exit 1; }
cd ../..

echo "Building tailwind..."
cd packages/tailwind
npm run build || { echo "❌ Tailwind build failed"; exit 1; }
cd ../..

echo "Building vue..."
cd packages/vue
npm run build || { echo "❌ Vue build failed"; exit 1; }
cd ../..

echo "Building storybook..."
cd packages/storybook
npm run build-storybook || { echo "❌ Storybook build failed"; exit 1; }
cd ../..

echo "Building example..."
cd packages/example
npm run build || { echo "❌ Example build failed"; exit 1; }
cd ../..

# 배포 구조 생성
echo "📁 Creating deployment structure..."
mkdir -p dist
cp -r packages/storybook/storybook-static dist/storybook
cp -r packages/example/dist dist/example

# 메인 index.html 생성
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upbox2 UI - Design System</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 60px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 600px;
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
      font-size: 2.5rem;
      font-weight: 700;
    }
    p {
      color: #666;
      margin-bottom: 40px;
      font-size: 1.2rem;
      line-height: 1.6;
    }
    .links {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .link {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 50px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-block;
    }
    .link:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    .link.storybook {
      background: linear-gradient(135deg, #FF4785 0%, #FF6B9D 100%);
    }
    .link.example {
      background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #999;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Upbox2 UI</h1>
    <p>Modern Vue 3 component library built with TypeScript and Tailwind CSS</p>
    
    <div class="links">
      <a href="./storybook/" class="link storybook">
        📚 Storybook
        <br><small>Component Documentation</small>
      </a>
      <a href="./example/" class="link example">
        🚀 Example App
        <br><small>Live Demo</small>
      </a>
    </div>
    
    <div class="footer">
      <p>Built with ❤️ using MCP (Model Context Protocol)</p>
    </div>
  </div>
</body>
</html>
EOF

echo "✅ Local build test completed successfully!"
echo "📁 Built files are in the 'dist' directory"
echo "🌐 You can serve the dist directory with any static server"
echo "   Example: npx serve dist"
