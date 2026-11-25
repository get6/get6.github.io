import assert from 'assert'

import { BASE_URL } from '../app/lib/definitions'
import {
  absoluteLocaleUrl,
  encodePathSegments,
  localePrefixedPath,
  sitemapLocaleUrl,
} from '../app/lib/site-url'

assert.strictEqual(localePrefixedPath('/', 'ko'), '/')
assert.strictEqual(localePrefixedPath('/', 'en'), '/en')
assert.strictEqual(localePrefixedPath('/', 'ja'), '/ja')
assert.strictEqual(localePrefixedPath('/about', 'en'), '/en/about')
assert.strictEqual(localePrefixedPath('/posts/1', 'ja'), '/ja/posts/1')

assert.strictEqual(absoluteLocaleUrl('/', 'en'), `${BASE_URL}/en`)
assert.strictEqual(absoluteLocaleUrl('/', 'ja'), `${BASE_URL}/ja`)
assert.strictEqual(absoluteLocaleUrl('/', 'ko'), BASE_URL)
assert.strictEqual(absoluteLocaleUrl('/about', 'en'), `${BASE_URL}/en/about`)

assert.strictEqual(sitemapLocaleUrl('/', 'ko'), `${BASE_URL}/`)
assert.strictEqual(sitemapLocaleUrl('/', 'en'), `${BASE_URL}/en`)
assert.strictEqual(sitemapLocaleUrl('/', 'ja'), `${BASE_URL}/ja`)

const book = sitemapLocaleUrl('/books/추천 시스템 입문', 'ko')
assert.strictEqual(book.includes(' '), false)
assert.strictEqual(book.includes('추천'), false)
assert.ok(book.startsWith(`${BASE_URL}/books/`))
assert.ok(book.includes('%20'))

const enBook = sitemapLocaleUrl('/books/추천 시스템 입문', 'en')
assert.ok(enBook.startsWith(`${BASE_URL}/en/books/`))
assert.strictEqual(enBook.endsWith('/'), false)

const percent = encodePathSegments('/books/99%가')
assert.ok(percent.includes('%25'))
assert.strictEqual(percent.includes('가'), false)

console.log('site-url tests passed')
