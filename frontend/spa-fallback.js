import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, 'dist')
const routes = [
  'bulk-valuation',
  'privacy-policy',
  'terms-of-service',
  'cookie-policy'
]

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function main() {
  const indexPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    console.error('index.html not found in dist. Run build first.')
    process.exit(1)
  }
  const indexContent = fs.readFileSync(indexPath, 'utf8')

  // Create 404.html as SPA fallback (Vercel will serve this for unknown routes)
  const notFoundPath = path.join(distDir, '404.html')
  fs.writeFileSync(notFoundPath, indexContent, 'utf8')
  console.log(`Created SPA 404 fallback: ${notFoundPath}`)
  routes.forEach((route) => {
    const targetDir = path.join(distDir, route)
    ensureDirSync(targetDir)
    const targetPath = path.join(targetDir, 'index.html')
    fs.writeFileSync(targetPath, indexContent, 'utf8')
    console.log(`Created SPA fallback: ${targetPath}`)
  })
  console.log('SPA fallback pages created successfully.')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export default main
