const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  // JavaScript/TypeScript files
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  'app/**/*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],

  // CSS/Style files
  '*.{css,scss,styl}': ['prettier --write'],
  'app/**/*.{css,scss,styl}': ['prettier --write'],

  // Markdown files
  '*.md': ['prettier --write'],
  'blog/**/*.md': ['prettier --write'],

  // JSON/YAML files
  '*.{json,yaml,yml}': ['prettier --write'],
}
