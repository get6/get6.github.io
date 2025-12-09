module.exports = {
  // JavaScript/TypeScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'app/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  // CSS/Style files
  '*.{css,scss,styl}': ['prettier --write'],
  'app/**/*.{css,scss,styl}': ['prettier --write'],

  // Markdown files
  '*.md': ['prettier --write'],
  'blog/**/*.md': ['prettier --write'],

  // JSON/YAML files
  '*.{json,yaml,yml}': ['prettier --write'],
}
