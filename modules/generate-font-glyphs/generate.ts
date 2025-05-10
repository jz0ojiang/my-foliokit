import fs from 'fs';
import path from 'path';
import rename from 'gulp-rename';
import { globby } from 'globby';
import Fontmin from 'fontmin';
import { FONT_PATH, OUTPUT_PATH, FILE_EXTENSIONS } from './font-config';

// 默认配置
interface GenerateOptions {
  debug?: boolean;
}

// 日志辅助函数
function log(message: string, type: 'info' | 'success' | 'warn' | 'error', debug = false, forceShow = false) {
  const emojis = {
    info: '🔍',
    success: '✅',
    warn: '⚠️',
    error: '❌'
  };

  // 仅在debug模式或强制显示时输出日志
  if (debug || forceShow) {
    console.log(`${emojis[type]} ${message}`);
  }
}

/**
 * 提取项目文件中的字符
 * @param debug 是否开启调试模式
 * @returns 项目中使用的所有字符（已去重）
 */
async function extractCharsFromFiles(debug = false): Promise<string> {
  try {
    // 构建扫描的文件匹配模式
    const patterns = FILE_EXTENSIONS.flatMap(ext => [
      `src/**/*.${ext}`,
      `content/**/*.${ext}`
    ]);
    log(`正在查找文件类型: ${patterns.join(', ')}`, 'info', debug);

    // 查找所有匹配的文件
    const files = await globby(patterns);
    log(`找到 ${files.length} 个文件需要处理`, 'info', debug);

    if (files.length === 0) {
      log('没有找到需要扫描的文件！', 'warn', true);
      return '';
    }

    // 存储所有提取的字符
    let allChars = '';

    // 遍历文件并提取字符
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        allChars += content;
      } catch (err) {
        log(`读取文件 ${file} 失败: ${err}`, 'error', debug);
      }
    }

    // 去重字符
    const uniqueChars = [...new Set(allChars)].join('');
    log(`从文件中提取了 ${uniqueChars.length} 个唯一字符`, 'success', debug);
    
    return uniqueChars;
  } catch (err) {
    log(`提取字符时出错: ${err}`, 'error', true);
    return '';
  }
}

/**
 * 确保输出目录存在
 * @param debug 是否开启调试模式
 */
function ensureOutputDirectory(debug = false): void {
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
    log(`创建输出目录: ${OUTPUT_PATH}`, 'info', debug);
  }
}

/**
 * 使用Fontmin生成字体子集
 * @param chars 需要包含在字体子集中的字符
 * @param debug 是否开启调试模式
 */
async function generateFontSubset(chars: string, debug = false): Promise<void> {
  if (!chars) {
    log('没有提取到字符，无法生成字体子集', 'warn', true);
    return;
  }

  ensureOutputDirectory(debug);

  try {
    // 获取所有ttf字体文件
    const fontFiles = fs.readdirSync(FONT_PATH)
      .filter(file => file.endsWith('.ttf'))
      .map(file => path.join(FONT_PATH, file));

    log(`找到 ${fontFiles.length} 个字体文件需要处理`, 'info', debug);

    if (fontFiles.length === 0) {
      log(`在 ${FONT_PATH} 目录下没有找到 .ttf 字体文件`, 'warn', true);
      return;
    }

    // 处理每个字体文件
    for (const fontFile of fontFiles) {
      try {
        const fontName = path.basename(fontFile);
        log(`正在处理字体: ${fontName}`, 'info', true);

        // 创建Fontmin实例
        const fontmin = new Fontmin()
          .src(fontFile)
          .use(Fontmin.glyph({
            text: chars,
            hinting: false // 禁用hinting以减小文件大小
          }))
          .use(Fontmin.ttf2woff2()) // 转换为woff2格式
          .dest(OUTPUT_PATH);

        // 执行转换
        await new Promise<void>((resolve, reject) => {
          fontmin.run((err, files) => {
            if (err) {
              log(`处理字体 ${fontName} 失败: ${err}`, 'error', true);
              reject(err);
              return;
            }
            
            log(`成功生成字体子集: ${fontName}`, 'success', true);
            
            // 删除public/fonts中可能存在的ttf文件
            const outputTtfPath = path.join(OUTPUT_PATH, path.basename(fontFile, '.ttf') + '-subset.ttf');
            if (fs.existsSync(outputTtfPath)) {
              fs.unlinkSync(outputTtfPath);
              log(`已删除输出目录中的ttf文件: ${path.basename(fontFile)}`, 'info', debug);
            }
            
            resolve();
          });
        });
      } catch (err) {
        log(`处理字体文件 ${fontFile} 时出错: ${err}`, 'error', true);
      }
    }
  } catch (err) {
    log(`生成字体子集时出错: ${err}`, 'error', true);
  }
}

/**
 * 主函数：生成字体子集
 * @param options 配置选项
 */
export async function generateGlyphs(options: GenerateOptions = {}): Promise<void> {
  const { debug = false } = options;
  
  log('=== 开始字体子集化处理 ===', 'info', true);
  log(`源字体目录: ${FONT_PATH}`, 'info', debug);
  log(`输出目录: ${OUTPUT_PATH}`, 'info', debug);
  
  try {
    // 提取字符
    const chars = await extractCharsFromFiles(debug);
    
    // 生成字体子集
    await generateFontSubset(chars, debug);
    
    log('=== 字体子集化处理完成 ===', 'success', true);
  } catch (err) {
    log(`字体子集化处理失败: ${err}`, 'error', true);
  }
}