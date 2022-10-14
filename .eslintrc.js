module.exports = {
  extends: [
    'standard-vue-ts'
  ],
  // 如果你还需要检测 ts 文件则添加该项，并且保证根目录有 tsconfig.json 文件
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'vue/no-v-model-argument': 'off',
    'vue/no-multiple-template-root': 'off'
  },
  globals: {
    window: true,
    document: true,
    navigator: true,
    ActiveXObject: true
  }
};
