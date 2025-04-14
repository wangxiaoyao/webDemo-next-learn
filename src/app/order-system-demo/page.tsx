'use client';

import { useState } from 'react';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

export default function OrderSystem() {
  const [cart, setCart] = useState<{
    items: { name: string; price: number; quantity: number }[];
    total: number;
  }>({
    items: [],
    total: 0,
  });

  const addToCart = (item: { name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((i) => i.name === item.name);

      if (existingItem) {
        // Item already exists, increase quantity
        const updatedItems = prevCart.items.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i,
        );

        return {
          items: updatedItems,
          total: prevCart.total + item.price,
        };
      } else {
        // Add new item
        return {
          items: [...prevCart.items, { ...item, quantity: 1 }],
          total: prevCart.total + item.price,
        };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <h1 className="mb-8 text-center text-3xl font-bold">點餐系統</h1>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-md md:col-span-2">
            <MenuList onAddToCart={addToCart} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <Cart cart={cart} setCart={setCart} />
          </div>
        </div>
      </div>
    </div>
  );
}
