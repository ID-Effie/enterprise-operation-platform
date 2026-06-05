import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  // 跳过构建产物和依赖目录，避免 ESLint 扫描无关文件。
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  // 基础 JS、TypeScript、Vue 推荐规则，负责发现常见代码质量问题。
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  // 关闭会和 Prettier 冲突的格式类规则，让 ESLint 专注代码质量。
  prettier,
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      // 当前项目存在单词组件名页面，例如 404.vue，因此关闭 Vue 组件名多单词限制。
      'vue/multi-word-component-names': 'off'
    }
  }
]
