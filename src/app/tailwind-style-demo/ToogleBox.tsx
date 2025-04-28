'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function ToggleBox() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="border-b-2 border-b-emerald-700 py-10">
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '隐藏方块' : '显示方块'}
      </button>

      {/* AnimatePresence 阻止默认组件卸载，确保exit执行 */}
      <AnimatePresence>
        {isVisible && ( // 条件渲染
          <motion.div
            animate={{ opacity: 1, scale: 1 }} // 进入时的目标状态
            exit={{ opacity: 0, scale: 0.8 }} // 退出时的目标状态
            initial={{ opacity: 0, scale: 0.8 }} // 进入时的初始状态
            key="myBox" // 必须有 key
            transition={{ duration: 0.3 }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'green',
              marginTop: 20,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
