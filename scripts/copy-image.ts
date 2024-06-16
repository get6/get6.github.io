// script 중 copy-dir 대체 함수. sharp를 이용해서 이미지를 리사이징하고 복사하는 함수 만들기
// 원래 실행하던 스크립트 -> "copy-dir": "mkdir -p public/blog/assets && cp -r blog/assets/* public/blog/assets/"
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const copyImage = async (src: string, dest: string) => {
  const image = sharp(src)

  const resizedImage = image.webp()
  await resizedImage.toFile(dest)
}

const srcDir = path.resolve(__dirname, '..', 'blog', 'assets')
const destDir = path.resolve(__dirname, '..', 'public', 'blog', 'assets')

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

fs.readdirSync(srcDir).forEach(async (file) => {
  const imagePath = path.resolve(srcDir, file)
  const stat = fs.statSync(imagePath)
  if (stat.isFile() && /\.(PNG|JPG|JPEG|png|jpg|jpeg)$/.test(file)) {
    const copyPath = path
      .resolve(destDir, file)
      .replace(/\.(PNG|JPG|JPEG|png|jpg|jpeg)$/, '.webp')
    await copyImage(imagePath, copyPath)
  }
})
