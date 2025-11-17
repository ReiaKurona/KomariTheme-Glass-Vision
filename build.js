import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'

console.log('🚀 构建 Komari 液态玻璃主题包 v1.3.2')
console.log('================================================')
console.log('')

async function buildTheme() {
  try {
    // 1. 清理旧文件
    console.log('🧹 清理旧文件...')
    if (existsSync('theme-package')) {
      rmSync('theme-package', { recursive: true, force: true })
    }
    if (existsSync('komari-liquid-glass-theme.zip')) {
      rmSync('komari-liquid-glass-theme.zip', { force: true })
    }

    // 2. 检查必需文件
    console.log('🔍 检查项目文件...')
    if (!existsSync('dist/index.html')) {
      throw new Error('缺少 dist/index.html 文件')
    }
    if (!existsSync('komari-theme.json')) {
      throw new Error('缺少 komari-theme.json 文件')
    }
    console.log('   ✅ 项目文件检查通过')

    // 3. 创建主题包目录
    console.log('📁 创建主题包目录...')
    mkdirSync('theme-package', { recursive: true })
    mkdirSync('theme-package/dist', { recursive: true })

    // 4. 复制文件
    console.log('📋 复制主题文件...')
    
    // 复制主题配置
    copyFileSync('komari-theme.json', 'theme-package/komari-theme.json')
    console.log('   ✅ 复制主题配置文件')
    
    // 复制 dist 目录
    await copyDirectory('dist', 'theme-package/dist')
    console.log('   ✅ 复制构建文件')
    
    // 复制预览图片（如果存在）
    if (existsSync('preview.png')) {
      copyFileSync('preview.png', 'theme-package/preview.png')
      console.log('   ✅ 复制预览图片')
    }

    // 5. 创建压缩包
    console.log('📦 创建压缩包...')
    await createZipPackage()

    // 6. 清理临时目录
    console.log('🧹 清理临时文件...')
    rmSync('theme-package', { recursive: true, force: true })

    // 7. 显示完成信息
    console.log('')
    console.log('🎉 构建完成！')
    console.log('')
    console.log('📦 主题包文件: komari-liquid-glass-theme.zip')
    console.log('')
    console.log('🎨 现在可以直接在 Komari 管理面板中上传这个 ZIP 文件!')
    console.log('')
    console.log('📋 包含的文件:')
    console.log('   ├── komari-theme.json (主题配置)')
    console.log('   ├── dist/index.html (主页面)')
    console.log('   └── dist/assets/ (静态资源)')
    if (existsSync('preview.png')) {
      console.log('   └── preview.png (预览图片)')
    }
    console.log('')
    console.log('✨ 主要特性:')
    console.log('   • 真正的 iOS 26 液态玻璃效果')
    console.log('   • 完美的移动端适配')
    console.log('   • 全局网速和流量统计')
    console.log('   • 智能主题切换')
    console.log('   • 网络状态通知')

  } catch (error) {
    console.error('')
    console.error('❌ 构建失败:', error.message)
    console.error('')
    console.error('💡 可能的解决方案:')
    console.error('   1. 确保 dist 目录存在且包含完整文件')
    console.error('   2. 确保 komari-theme.json 文件存在')
    console.error('   3. 检查文件权限')
    process.exit(1)
  }
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
      // Windows 使用 PowerShell 创建 ZIP
      const psCommand = `Compress-Archive -Path "theme-package\\*" -DestinationPath "komari-liquid-glass-theme.zip" -Force`
      execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' })
    } else {
      // Unix/Linux/Mac 使用 zip 命令
      execSync('cd theme-package && zip -r ../komari-liquid-glass-theme.zip .', { stdio: 'inherit' })
    }
    console.log('✅ ZIP 文件创建成功')
  } catch (error) {
    console.log('⚠️  自动创建 ZIP 失败，请手动压缩 theme-package 目录')
    console.log('')
    console.log('📁 手动压缩步骤:')
    console.log('   1. 右键点击 theme-package 文件夹')
    console.log('   2. 选择 "发送到" -> "压缩(zipped)文件夹" (Windows)')
    console.log('   3. 或选择 "压缩" (Mac)')
    console.log('   4. 将生成的 ZIP 文件重命名为 komari-liquid-glass-theme.zip')
  }
}

// 运行构建
buildTheme()