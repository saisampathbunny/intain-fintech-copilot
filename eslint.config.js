import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  { files: ['src/**/*.{js,jsx}'], plugins: { 'react-hooks': reactHooks, react }, settings: { react: { version: 'detect' } }, languageOptions: { ecmaVersion: 2022, sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } }, globals: { fetch: 'readonly', console: 'readonly', window: 'readonly', document: 'readonly' } }, rules: { ...reactHooks.configs.recommended.rules, 'react/jsx-uses-vars': 'error', 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
  { files: ['server/**/*.js'], languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: { console: 'readonly', structuredClone: 'readonly' } }, rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } }
]
