import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function MagicButtonMotion() {
  const [isPressing, setIsPressing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);
  const handleMouseDown = () => {
    setIsPressing(true);
    setShowCopied(false);
  };

  const handleMouseUp = () => {
    setIsPressing(false);
    setShowCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  return (
    <div className="border-b-2 border-b-emerald-700 py-10">
      <h1>点击按钮</h1>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="overflow-hidden rounded-lg bg-amber-800 text-white active:scale-90"
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