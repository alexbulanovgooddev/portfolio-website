import vitePluginChecker from 'vite-plugin-checker'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/icon',
		'@nuxtjs/seo',
		'@pinia/nuxt',
		'@nuxtjs/color-mode',
		'@vee-validate/nuxt'
	],
	icon: {
		size: '24px',
		class: 'icon',
		mode: 'css',
		localApiEndpoint: '/_nuxt_icon',
		customCollections: [
			{
				prefix: 'icons',
				dir: './app/assets/icons/',
				normalizeIconName: false
			}
		],
		clientBundle: {
			scan: true,
			includeCustomCollections: true
		}
	},
	site: {
		// url берётся из NUXT_SITE_URL — см. .env.example
		name: 'Александр Буланов — портфолио',
		description:
			'Сайт-портфолио Александра Буланова: проекты, опыт и контакты.',
		defaultLocale: 'ru'
	},
	sitemap: {
		// Динамические маршруты /blog/[slug] и /portfolio/[slug] отдаёт CMS
		sources: ['/api/__sitemap__/urls']
	},
	ogImage: {
		// og:image приходит из _seoMetaTags DatoCMS — генератор не нужен
		enabled: false
	},
	schemaOrg: {
		identity: {
			type: 'Person',
			name: 'Александр Буланов'
		}
	},
	colorMode: {
		preference: 'system', // default value of $colorMode.preference
		fallback: 'light', // fallback value if not system preference found
		globalName: '__NUXT_COLOR_MODE__',
		componentName: 'ColorScheme',
		classPrefix: '',
		classSuffix: '',
		storage: 'cookie', // 'localStorage' | 'sessionStorage' | 'cookie'
		storageKey: 'nuxt-color-mode',
		cookieAttrs: {
			'max-age': '31536000',
			path: '/',
			SameSite: 'Lax',
			Secure: ''
		}
	},
	css: [
		'vue-final-modal/style.css',
		'~/assets/css/main.css',
		'~/assets/scss/main.scss'
	],
	vite: {
		plugins: [
			vitePluginChecker({
				eslint: {
					useFlatConfig: true,
					lintCommand: 'eslint "./**/*.{js,mjs,cjs,ts,vue}"'
				},
				stylelint: {
					lintCommand: 'stylelint "**/*.{vue,css,scss}"'
				}
			})
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "~/assets/scss/general/variables.scss" as *; @use "~/assets/scss/abstracts/mixins.scss" as *;`
				}
			}
		}
	},
	runtimeConfig: {
		datoCmsUrl: '',
		datoCmsReadOnlyPublishToken: '',
		telegramBotToken: '',
		telegramChatId: '',
		allowedOrigins: ''
	},
	app: {
		head: {
			// DatoCMS уже отдаёт title с именем сайта — шаблон seo-utils отключён
			titleTemplate: '%s',
			link: [
				{ rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon-57x57.png' },
				{ rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon-60x60.png' },
				{ rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon-72x72.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon-76x76.png' },
				{
					rel: 'apple-touch-icon',
					sizes: '114x114',
					href: '/favicon-114x114.png'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '120x120',
					href: '/favicon-120x120.png'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '144x144',
					href: '/favicon-144x144.png'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '152x152',
					href: '/favicon-152x152.png'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/favicon-180x180.png'
				},
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: '/favicon-16x16.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: '/favicon-32x32.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '96x96',
					href: '/favicon-96x96.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '192x192',
					href: '/favicon-192x192.png'
				},
				{ rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'manifest', href: '/manifest.json' }
			],
			meta: [
				{
					name: 'msapplication-TileColor',
					content: '#000000'
				},
				{
					name: 'msapplication-TileImage',
					content: '/favicon-144x144.png'
				},
				{
					name: 'msapplication-config',
					content: '/browserconfig.xml'
				},
				{ name: 'apple-mobile-web-app-title', content: 'А. Буланов' },
				{
					name: 'theme-color',
					media: '(prefers-color-scheme: light)',
					content: '#000000'
				},
				{
					name: 'theme-color',
					media: '(prefers-color-scheme: dark)',
					content: '#0d0f12'
				}
			]
		}
	}
})
