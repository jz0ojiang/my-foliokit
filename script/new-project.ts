// scripts/new-project.ts
import fs from 'fs-extra'
import path from 'path'
import lodash from 'lodash'
import prompts from 'prompts'
import { createHash } from 'crypto'

// Default configuration
const scaffoldPath = 'scaffolds/project.md'

// 生成 abbrlink
function generateAbbrlink(title: string, date: string): string {
  const str = `${title}-${date}`
  const hash = createHash('md5').update(str).digest('hex')
  return hash.slice(0, 8)
}

async function main() {
  try {
    const { title, lang } = await prompts([
      {
        type: 'text',
        name: 'title',
        message: 'Project title?',
        validate: (val: string) => (val ? true : 'Title cannot be empty')
      },
      {
        type: 'select',
        name: 'lang',
        message: 'Select language version',
        choices: [
          { title: 'Chinese (zh)', value: 'zh' },
          { title: 'English (en)', value: 'en' }
        ],
        initial: 0
      }
    ])

    // 如果用户按 Ctrl+C 退出，title 和 lang 会是 undefined
    if (!title || !lang) {
      console.log('Operation cancelled by user')
      process.exit(0)
    }

    const kebab = lodash.kebabCase(title)
    const today = new Date().toISOString().slice(0, 10)
    const abbrlink = generateAbbrlink(title, today)
    const targetDir = `content/${lang}/projects`
    const targetPath = path.join(targetDir, `${kebab}.md`)

    // 检查文件是否已存在
    if (await fs.pathExists(targetPath)) {
      throw new Error(`File already exists: ${targetPath}`)
    }

    const scaffold = await fs.readFile(scaffoldPath, 'utf-8')
    const filled = scaffold
      .replace('{{ title }}', title)
      .replace('{{ date }}', today)
      .replace('{{ abbrlink }}', abbrlink)

    await fs.ensureDir(targetDir)
    await fs.writeFile(targetPath, filled)

    console.log(`✅ Project created successfully: ${targetPath}`)
    console.log(`   Abbrlink: ${abbrlink}`)
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Failed to create project:', err.message)
    } else {
      console.error('❌ Failed to create project:', err)
    }
    process.exit(1)
  }
}

main()
