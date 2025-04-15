import { createHash } from 'crypto'

/**
 * 生成项目的 abbrlink
 * @param title 项目标题
 * @param date 项目日期
 * @returns 8位的十六进制字符串
 */
export function generateAbbrlink(title: string, date: Date): string {
  const str = `${title}-${date.toISOString()}`
  const hash = createHash('md5').update(str).digest('hex')
  return hash.slice(0, 8) // 取前8位作为 abbrlink
} 