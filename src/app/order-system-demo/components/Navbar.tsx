'use client';

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="mb-6 bg-white px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/order-system" className="text-2xl font-bold">
          餐廳點餐系統
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/"
            className="rounded px-4 py-2 transition-colors hover:bg-gray-100"
          >
            回到首頁
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
