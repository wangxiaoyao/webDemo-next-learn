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
        className="overflow-hidden rounded-lg bg-amber-800 text-white active:scale-90"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        点击冒泡
        <AnimatePresence>
          {isPressing && (
            <motion.span
              animate={{ scale: 3, opacity: 0.9 }}
              className="absolute inset-0 rounded-full bg-white"
              initial={{ scale: 0, opacity: 0.5 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {showCopied && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 rounded-lg bg-green-500 px-3 py-1 text-white shadow"
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            翻译已复制 ✅
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
