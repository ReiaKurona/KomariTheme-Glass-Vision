import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'

console.log('🚀 开发环境构建 Komari 液态玻璃主题')
console.log('=====================================')
console.log('')

async function buildDev() {
  try {
    // 1. 检查是否有源码
    if (!existsSync('src')) {
      console.log('📁 未找到 src 目录，使用现有的 dist 目录构建...')
      return buildFromDist()
    }

    // 2. 检查依赖
    if (!existsSync('node_modules')) {
      console.log('📦 安装依赖...')
      execSync('npm install', { stdio: 'inherit' })
    }

    // 3. 构建项目
    console.log('🔨 构建项目...')
    execSync('npm run build', { stdio: 'inherit' })

    // 4. 创建主题包
    await createThemePackage()

  } catch (error) {
    console.error('❌ 构建失败:', error.message)
    console.log('')
    console.log('🔄 尝试使用现有 dist 目录构建...')
    await buildFromDist()
  }
}

async function buildFromDist() {
  try {
    if (!existsSync('dist/index.html')) {
      throw new Error('dist 目录不完整')
    }

    console.log('📁 使用现有 dist 目录构建主题包...')
    await createThemePackage()
  } catch (error) {
    console.error('❌ 无法构建:', error.message)
    process.exit(1)
  }
}

async function createThemePackage() {
  // 清理旧文件
  if (existsSync('theme-package')) {
    rmSync('theme-package', { recursive: true, force: true })
  }
  if (existsSync('komari-liquid-glass-theme.zip')) {
    rmSync('komari-liquid-glass-theme.zip', { force: true })
  }

  // 创建主题包目录
  mkdirSync('theme-package', { recursive: true })
  mkdirSync('theme-package/dist', { recursive: true })

  // 复制文件
  copyFileSync('komari-theme.json', 'theme-package/komari-theme.json')
  await copyDirectory('dist', 'theme-package/dist')
  
  if (existsSync('preview.png')) {
    copyFileSync('preview.png', 'theme-package/preview.png')
  }

  // 创建压缩包
  await createZipPackage()

  // 清理
  rmSync('theme-package', { recursive: true, force: true })

  console.log('')
  console.log('🎉 构建完成！')
  console.log('📦 主题包: komari-liquid-glass-theme.zip')
}

// 递归复制目录
async function copyDirectory(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }
  
  const { readdirSync, statSync } = await import('fs')
  const entries = readdirSync(src)
  
  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)
    
    const stat = statSync(srcPath)
    if (stat.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

// 创建 ZIP 压缩包
async function createZipPackage() {
  const { platform } = await import('os')
  const isWindows = platform() === 'win32'
  
  try {
    if (isWindows) {
      const psCommand = `Compress-Archive -Path "theme-package\\*" -DestinationPath "komari-liquid-glass-theme.zip" -Force`
      execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' })
    } else {
      execSync('cd theme-package && zip -r ../komari-liquid-glass-theme.zip .', { stdio: 'inherit' })
    }
  } catch (error) {
    console.log('⚠️  请手动压缩 theme-package 目录为 komari-liquid-glass-theme.zip')
  }
}

buildDev()