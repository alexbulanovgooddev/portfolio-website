<script setup lang="ts">
import { storeLayout } from '~/stores/storeLayout'

const { navigation } = storeToRefs(storeLayout())

function handleDropdownToggle(event: Event) {
	const toggle = event.target as HTMLElement
	const dropdown = toggle.closest('[data-header-dropdown]')

	if (dropdown) {
		dropdown.classList.toggle('is-active')

		if (dropdown.classList.contains('is-active')) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}
	}
}

function handleClickOutside(event: Event): void {
	const target = event.target as HTMLElement

	if (!target.matches('[data-header-dropdown-toggle]')) {
		document.querySelectorAll('[data-header-dropdown]').forEach(dropdown => {
			if (dropdown.classList.contains('is-active')) {
				dropdown.classList.remove('is-active')
				document.removeEventListener('click', handleClickOutside)
			}
		})
	}
}
</script>

<template>
	<nav class="app-header-navigation">
		<ul class="app-header-navigation__list">
			<template v-for="nav in navigation" :key="nav.id">
				<template v-if="!nav.to && nav.dropdownElements.length > 0">
					<li
						class="app-header-navigation__item app-header-navigation__dropdown"
						data-header-dropdown
					>
						<a
							class="app-header-navigation__link app-header-navigation__link_lg"
							href="/"
							data-header-dropdown-toggle
							@click.stop.prevent="handleDropdownToggle"
						>
							{{ nav.label }}
						</a>
						<div class="app-header-navigation__dropdown-container">
							<template v-for="elem in nav.dropdownElements" :key="elem.id">
								<a
									v-if="elem.to"
									class="app-header-navigation__link app-header-navigation__link_sm"
									:href="elem.to"
									target="_blank"
									rel="nofollow noopener"
								>
									{{ elem.label }}
								</a>
							</template>

							<NuxtLink
								class="app-header-navigation__link app-header-navigation__link_sm"
								to="/contact"
							>
								Написать
							</NuxtLink>
						</div>
					</li>
				</template>
				<template v-if="nav.to">
					<li class="app-header-navigation__item">
						<NuxtLink
							class="app-header-navigation__link app-header-navigation__link_lg"
							:to="nav.to"
							>{{ nav.label }}</NuxtLink
						>
					</li>
				</template>
			</template>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
.app-header-navigation {
	@media screen and (min-width: $lg) {
		border-top: none;
		width: 100%;
		height: 100%;
	}

	&__list {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
		list-style: none;

		@media screen and (min-width: $lg) {
			flex-direction: row;
			height: 100%;
		}
	}

	&__item {
		border-bottom: 4px solid var(--color-canvas);
		display: flex;
		flex-wrap: wrap;

		@media screen and (min-width: $lg) {
			border: 0;
		}
	}

	&__link {
		@include cursor-pointer;

		border: 0;
		outline: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		color: var(--color-ink);
		background-color: var(--color-chrome);
		text-decoration: none;

		&:hover,
		&:focus-visible {
			color: var(--color-surface);
			background-color: var(--color-canvas);
		}

		&.router-link-active.router-link-exact-active {
			@include cursor-default;

			color: var(--color-surface);
			background-color: var(--color-canvas);

			html.dark & {
				color: var(--color-ink);
				background-color: var(--color-canvas);
			}
		}

		html.dark & {
			&:hover,
			&:focus-visible {
				color: var(--color-ink);
				background-color: var(--color-canvas);
			}
		}
	}

	&__link_lg {
		@include typo-display-3;

		padding: 20px 16px;

		@media screen and (min-width: $lg) {
			padding: 0 20px;
		}
	}

	&__link_sm {
		@include typo-paragraph-1;

		padding: 12px 16px;
		font-weight: 800;
	}

	&__dropdown {
		position: relative;
	}

	&__dropdown-container {
		border: 4px solid var(--color-canvas);
		width: 100%;
		display: none;
		visibility: hidden;
		background-color: var(--color-chrome);
		box-shadow: 8px 8px 0 0 var(--color-canvas);

		@media screen and (min-width: $lg) {
			position: absolute;
			top: 100%;
			left: 0;
			z-index: 40;
			min-width: 100%;
			width: max-content;
		}
	}

	&__dropdown.is-active &__dropdown-container {
		display: block;
		visibility: visible;
	}
}
</style>
