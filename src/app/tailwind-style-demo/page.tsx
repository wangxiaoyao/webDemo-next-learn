'use client';

/**
 * flex-1 的布局
 */
// export default function Page() {
//   return (
//     <div className="flex h-screen flex-col bg-amber-600 pb-10">
//       <header className="flex h-14 items-center gap-2 px-6 py-4">
//         <h1 className="text-[18px] font-bold">翻译助手</h1>
//       </header>
//       <div className="mx-2 flex flex-4">
//         <div className="w-1/2 rounded-tl-3xl rounded-bl-3xl border bg-white px-6 py-4">
//           left
//         </div>
//         <div className="w-1/2 rounded-tr-3xl rounded-br-3xl border px-6 py-4">
//           right
//         </div>
//       </div>
//     </div>
//   );
// }

/**
 * 使用motion，动画效果
 */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [isPressing, setIsPressing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const timerRef = useRef(null);

  const handleMouseDown = () => {
    setIsPressing(true);
    setShowCopied(false);
  };

  const handleMouseUp = () => {
    setIsPressing(false);
    setShowCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="relative mt-20 h-10 w-20 overflow-hidden rounded-lg bg-amber-800 text-white active:scale-90"
      >
        点击冒泡
        <AnimatePresence>
          {isPressing && (
            <motion.span
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0.9 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-white"
            />
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-lg bg-green-500 px-3 py-1 text-white shadow"
          >
            翻译已复制 ✅
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
