'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <>
      <p className="dark:text-amber-600">hello world</p>
      <div className="h-10 w-10 border"></div>

      <div>
        <button onClick={() => setDark(!dark)}>{dark ? '切换为浅色' : '切换为暗色'}</button>
      </div>
    </>
  );
}
