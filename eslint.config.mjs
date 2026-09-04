import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default defineConfig(
	globalIgnores([
		'dist/',
		'.nuxt/',
		'.output/',
		'.nitro/',
		'.data/',
		'.cache/'
	]),
	js.configs.recommended,
	tseslint.configs.recommended,
	pluginVue.configs['flat/recommended'],
	{
		// Префикс _ помечает намеренно неиспользуемое: выброшенный ключ при
		// деструктуризации с rest, обязательный по сигнатуре аргумент.
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			]
		}
	},
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.vue']
			}
		},
		rules: {
			// typescript-eslint глушит no-undef в .ts, но не в SFC. ESLint не знает
			// ни автоимпортов Nuxt (ref, useHead), ни браузерных глобалей (window).
			// Необъявленные идентификаторы ловит vue-tsc: pnpm typecheck.
			'no-undef': 'off'
		}
	},
	{
		// Nuxt именует страницы и лейауты одним словом: index.vue, default.vue
		files: [
			'app/app.vue',
			'app/error.vue',
			'app/pages/**/*.vue',
			'app/layouts/**/*.vue'
		],
		rules: {
			'vue/multi-word-component-names': 'off'
		}
	},
	prettier
)
