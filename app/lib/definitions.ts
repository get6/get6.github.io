export type Tag = {
  name: string
  count: number
}

export const blog_title = '이때의 나'
export const blog_description = '이때를 살아가는 황성준(황이태)의 블로그'

export enum BookStatus {
  To_read = 'to_read', // 읽고 싶어
  Reading = 'reading', // 읽고 있어
  Finished = 'finished', // 읽었어
}
