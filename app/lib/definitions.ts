export type Tag = {
  name: string
  count?: number
}

export type Post = {
  slug: string
  title: string
  date: Date
  content: string
  tags: Tag[]
}
