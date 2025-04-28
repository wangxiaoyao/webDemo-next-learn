const commitlint = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 自定义示例：subject 必须小写
    'subject-case': [2, 'always', 'lower-case'],
  },
};

export default commitlint;
