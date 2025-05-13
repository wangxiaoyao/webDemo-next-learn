'use client';
import { motion } from 'motion/react';

export default function FlipCardMotion() {
  return (
    <div className="perspective m-10 h-40 w-64">
      <motion.div
        animate={{ rotateY: 180 }}
        className="flex h-full w-full items-center justify-center rounded bg-blue-500 text-xl font-bold text-white shadow-lg"
        initial={{ rotateY: 0 }}
        transition={{ duration: 1 }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000, // 可选：也可以写在外层容器
        }}
      >
        正面内容
      </motion.div>
    </div>
  );
}
