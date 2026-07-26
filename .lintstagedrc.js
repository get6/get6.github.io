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

  // JSON/YAML files — exclude package manager lockfiles
  '*.{json,yaml,yml}': (filenames) => {
    const files = filenames.filter(
      (f) => !/(^|\/)(pnpm-lock\.yaml|package-lock\.json|yarn\.lock)$/.test(f),
    )
    return files.length ? [`prettier --write ${files.join(' ')}`] : []
  },
}
