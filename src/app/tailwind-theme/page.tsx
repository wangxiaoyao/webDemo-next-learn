'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  // 第二步：服务器把组件 预渲染成静态 HTML，然后把这段 HTML 发给浏览器了。
  // 在SSR阶段：typeof window !== 'undefined' 得到dark值为false。HTML首帧渲染：“切换为暗色”
  // 在CSR运行：useEffect中：const mediaQuery 为true ，得dark值为true。HTML首帧渲染：“切换为浅色”
  // SSR和CSR 渲染的HTML内容不同。冲突！Hydration failed （水合失败）
  // 通过mounted 则推迟了CSR首帧率渲染
  const [mounted, setMounted] = useState(false);

  // 第一步：
  // 1 解决闪烁问题，不论你设置dark的初始值为false还是true。当和系统不一致都会出现”闪烁“。所以useState初始化第一帧率必须和系统一致
  // 2 解决ReferenceError: matchMedia is not defined。SSR过程中 不能识别 window.matchMedia。通过判断：typeof window !== 'undefined'
  const [dark, setDark] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false,
  );

  useEffect(() => {
    // --- 添加系统主题变化监听器 ---
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // 取系统是否为暗黑的值
    setDark(mediaQuery.matches);

    // 定义监听处理函数
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // 当系统主题变化时，更新组件的 dark 状态以匹配系统
      setDark(e.matches);
    };
    // 添加监听器
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    setMounted(true);
    // cleanup function: 在组件卸载时或依赖变化前移除监听器
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  if (!mounted) return null;

  return (
    <>
      <p className="dark:text-amber-600">hello world</p>
      <div>
        <button onClick={() => setDark(!dark)}>{dark ? '切换为浅色' : '切换为暗色'}</button>
      </div>
    </>
  );
}
