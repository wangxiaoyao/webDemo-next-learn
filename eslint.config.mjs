import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 兼容老版本写法：FlatCompat
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      // ⭐ 开启属性排序（支持 --fix）
      'react/jsx-sort-props': [
        'warn',
        {
          shorthandFirst: true, // 简写属性（{foo}）放前面
          multiline: 'last', // 多行属性排最后
          noSortAlphabetically: false, // true = 自定义顺序，false = 字母序
          callbacksLast: true, // onClick 放最后
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // allow `as any`
    },
  },
];

export default eslintConfig;
