// 客户端专用插件，负责全局滚动条控制
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'scroll-control',
  enforce: 'pre', // 在应用初始化的早期阶段执行
  setup(nuxtApp) {
    // 处理首页滚动条超时
    let scrollTimeoutId: number | null = null;
    
    // 标记是否是首次加载应用
    const isFirstVisit = !sessionStorage.getItem('app_visited');
    
    /**
     * 处理路由变化
     * @param path 当前路径
     * @param isInitial 是否是初始加载
     */
    const handleRouteChange = (path: string, isInitial = false) => {
      const isHomePage = path === '/' || path === '';
      
      // 清除可能存在的先前超时
      if (scrollTimeoutId !== null) {
        clearTimeout(scrollTimeoutId);
        scrollTimeoutId = null;
      }
      
      // 只有首次访问首页才禁用滚动
      if (isHomePage && isInitial && isFirstVisit) {
        // 是首页且是首次访问：禁用滚动
        document.documentElement.classList.remove('enable-scroll');
        document.body.classList.remove('enable-scroll');
        
        // 设置10秒后自动启用滚动条
        scrollTimeoutId = window.setTimeout(() => {
          document.documentElement.classList.add('enable-scroll');
          document.body.classList.add('enable-scroll');
        }, 10000);
        
        // 设置访问标记
        sessionStorage.setItem('app_visited', 'true');
      } else {
        // 其他情况：启用滚动
        document.documentElement.classList.add('enable-scroll');
        document.body.classList.add('enable-scroll');
      }
    };
    
    // 处理初始路由
    handleRouteChange(window.location.pathname, true);
    
    // 监听路由变化
    nuxtApp.hook('page:start', () => {
      handleRouteChange(window.location.pathname, false);
    });
  }
}) 