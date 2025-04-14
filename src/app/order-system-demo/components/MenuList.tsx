'use client';

import React from 'react';

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

type MenuListProps = {
  onAddToCart: (item: { name: string; price: number }) => void;
};

const MenuList: React.FC<MenuListProps> = ({ onAddToCart }) => {
  // Sample menu items
  const menuItems: MenuItem[] = [
    { id: 1, name: 'Bagel', price: 5 },
    { id: 2, name: 'Sandwich', price: 8 },
    { id: 3, name: 'Coffee', price: 3 },
    { id: 4, name: 'Donut', price: 2 },
    { id: 5, name: 'Croissant', price: 4 },
    { id: 6, name: 'Salad', price: 6 },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">菜單</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors hover:bg-gray-50"
            onClick={() => onAddToCart({ name: item.name, price: item.price })}
          >
            <p className="text-lg font-medium">{item.name}</p>
            <p className="text-xl font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
