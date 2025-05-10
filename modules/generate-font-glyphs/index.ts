import { defineNuxtModule } from '@nuxt/kit';
import { generateGlyphs } from './generate';

interface ModuleOptions {
  debug?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'generate-font-glyphs',
    configKey: 'generateFontGlyphs',
  },
  defaults: {
    debug: false
  },
  setup(options, nuxt) {
    // 在构建后钩子执行字体子集化
    nuxt.hook('build:done', () => {
      console.log('🚀 正在生成字体子集...');
      generateGlyphs({ debug: options.debug });
    });
  }
});