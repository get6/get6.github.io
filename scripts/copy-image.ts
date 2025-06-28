// script 중 copy-dir 대체 함수. sharp를 이용해서 이미지를 리사이징하고 복사하는 함수 만들기
// 원래 실행하던 스크립트 -> "copy-dir": "mkdir -p public/blog/assets && cp -r blog/assets/* public/blog/assets/"
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const copyImage = async (src: string, dest: string) => {
  const image = sharp(src)
  const resizedImage = image.webp({ quality: 85 })
  await resizedImage.toFile(dest)
}

const shouldUpdateImage = (srcPath: string, destPath: string): boolean => {
  if (!fs.existsSync(destPath)) return true
  
  const srcStat = fs.statSync(srcPath)
  const destStat = fs.statSync(destPath)
  
  return srcStat.mtime > destStat.mtime
}

const srcDir = path.resolve(__dirname, '..', 'blog', 'assets')
const destDir = path.resolve(__dirname, '..', 'public', 'blog', 'assets')

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

const processedFiles: string[] = []
const skippedFiles: string[] = []

fs.readdirSync(srcDir).forEach(async (file) => {
  const imagePath = path.resolve(srcDir, file)
  const stat = fs.statSync(imagePath)
  
  if (stat.isFile() && /\.(PNG|JPG|JPEG|WEBP|png|jpg|jpeg|webp)$/.test(file)) {
    const copyPath = path
      .resolve(destDir, file)
      .replace(/\.(PNG|JPG|JPEG|png|jpg|jpeg)$/, '.webp')
    
    if (shouldUpdateImage(imagePath, copyPath)) {
      await copyImage(imagePath, copyPath)
      processedFiles.push(file)
    } else {
      skippedFiles.push(file)
    }
  }
})

console.log(`✅ Images processed: ${processedFiles.length}`)
console.log(`⏩ Images skipped (up-to-date): ${skippedFiles.length}`)
console.log('🎉 Image processing completed!')
