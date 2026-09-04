export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-config-recommended-vue',
		'stylelint-prettier/recommended'
	],
	overrides: [
		{
			files: ['**/*.vue'],
			customSyntax: 'postcss-html',
			rules: {
				// Правило парсит значение как чистый CSS и падает на SCSS-переменных
				// в shorthand: transition, border, font, background, margin.
				'declaration-property-value-no-unknown': null
			}
		},
		{
			files: ['**/*.scss'],
			customSyntax: 'postcss-scss',
			rules: {
				'declaration-property-value-no-unknown': null
			}
		}
	],
	rules: {
		'at-rule-no-unknown': null,
		'media-query-no-invalid': null,
		'declaration-property-value-no-unknown': true,
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
			}
		],
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['deep', 'global', 'slotted']
			}
		],
		'selector-class-pattern': [
			'^([a-z][a-z0-9-]*)(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
			{
				message:
					'Expected class selector to be kebab-case or BEM (block__element--modifier)'
			}
		],
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'theme',
					'source',
					'utility',
					'variant',
					'custom-variant',
					'reference',
					'apply',
					'plugin',
					'config'
				]
			}
		]
	}
}
