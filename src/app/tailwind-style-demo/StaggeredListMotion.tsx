import { motion } from 'motion/react';

// 定义父容器的 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 设置子元素的交错延迟
    },
  },
};

// 定义列表项的 variants
const itemVariants = {
  hidden: { opacity: 0, x: -50 }, // 初始状态：隐藏并向左偏移
  visible: { opacity: 1, x: 0 }, // 目标状态：显示并回到原位
};

export default function StaggeredListMotion({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={containerVariants} // 将 containerVariants 传递给父容器
      initial="hidden" // 初始状态设为 hidden
      animate="visible" // 动画到 visible 状态
      style={{ listStyle: 'none', padding: 0 }}
    >
      {items.map((item, i) => (
        <motion.li
          key={i} // 重要：在列表中使用 key
          variants={itemVariants} // 将 itemVariants 传递给子元素
          style={{ marginBottom: 10, backgroundColor: '#eee', padding: 10 }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
