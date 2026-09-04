# portfolio-website

[Сайт-портфолио](<>)

![Превью](preview.webp)

## Стек

|                   |                                                  |
| ----------------- | ------------------------------------------------ |
| Фреймворк         | Nuxt 4.5, Vue 3.5, vue-router 5                  |
| Стили             | SCSS (Sass), BEM-именование классов              |
| Типы              | TypeScript 6, `vue-tsc`                          |
| Линтеры           | ESLint 9 (flat config), Stylelint 17, Prettier 3 |
| Хуки              | husky + lint-staged                              |
| Пакетный менеджер | pnpm 11                                          |

## Требования

- Node.js `^22.19.0 || ^24.11.0 || >=26.0.0` — версия для разработки зафиксирована в `.nvmrc`
- pnpm `>=11` — подхватывается автоматически через `packageManager` в `package.json`

```bash
nvm use          # возьмёт версию из .nvmrc
corepack enable  # возьмёт pnpm из packageManager
```

## Установка

```bash
pnpm install
```

`postinstall` сам вызовет `nuxt prepare` (генерация типов в `.nuxt/`), а `prepare` — развернёт git-хуки husky.

## Разработка

```bash
pnpm dev
```

Дев-сервер поднимется на `http://localhost:3000`. В него встроен `vite-plugin-checker`: ошибки ESLint и Stylelint показываются прямо в браузере и в терминале.

## Скрипты

| Команда                      | Что делает                                           |
| ---------------------------- | ---------------------------------------------------- |
| `pnpm dev`                   | Дев-сервер с HMR и проверками на лету                |
| `pnpm build`                 | Продакшен-сборка в `.output/`                        |
| `pnpm preview`               | Локальный запуск собранного приложения               |
| `pnpm generate`              | Статическая генерация                                |
| `pnpm typecheck`             | Проверка типов через `vue-tsc`                       |
| `pnpm lint`                  | ESLint + Stylelint без правок                        |
| `pnpm lint:fix`              | То же с автоисправлением                             |
| `pnpm lint:scripts` / `:fix` | Только ESLint (`.js`, `.mjs`, `.cjs`, `.ts`, `.vue`) |
| `pnpm lint:styles` / `:fix`  | Только Stylelint (`.css`, `.scss`, `.vue`)           |
| `pnpm format`                | Проверка форматирования Prettier                     |
| `pnpm format:fix`            | Форматирование Prettier                              |

Учти: `pnpm lint` **не** проверяет типы — ESLint настроен без type-aware правил. Ошибки вида `const x: number = 'строка'` ловит только `pnpm typecheck`.

## Структура

```
app/
├── app.vue              # Корневой компонент
├── layouts/             # Лейауты (default.vue)
├── pages/               # Файловый роутинг
├── components/          # Компоненты (авто-импорт)
├── composables/         # Композаблы (авто-импорт)
├── plugins/             # Плагины Nuxt
├── stores/              # Сторы
└── assets/
    ├── css/main.css
    ├── fonts/Roboto/
    └── scss/
        ├── main.scss    # Точка входа, подключена в nuxt.config
        ├── abstracts/   # mixins.scss
        └── general/     # variables, fonts, scaffolding, typography, user-content
public/                  # Отдаётся как есть: favicon.ico, robots.txt
```

## Работа со стилями

`variables.scss` и `mixins.scss` инжектятся автоматически в каждый SCSS-блок через `additionalData` в [nuxt.config.ts](nuxt.config.ts) — импортировать их вручную не нужно:

```vue
<style lang="scss" scoped>
.card {
	@include line-clamp(2);

	transition-duration: $transition-duration;

	@media (min-width: $md) {
		padding: 2rem;
	}
}
</style>
```

Глобальные стили добавляй в `app/assets/scss/general/` и подключай через `@use` в `main.scss`.

Имена классов проверяются Stylelint по паттерну kebab-case или BEM: `block`, `block__element`, `block--modifier`.

## Git-хуки

На каждый коммит `husky` запускает `lint-staged` только по проиндексированным файлам:

- `eslint --fix` для `.js`, `.mjs`, `.cjs`, `.ts`, `.vue`
- `stylelint --fix` для `.css`, `.scss`, `.vue`
- `prettier --write` для них же плюс `.json`, `.md`, `.yaml`, `.yml`

Автоисправимое чинится молча; коммит падает только на том, что машина починить не может.

## Деплой

```bash
pnpm build
node .output/server/index.mjs
```

Подробности по пресетам — в [документации Nuxt](https://nuxt.com/docs/getting-started/deployment).
