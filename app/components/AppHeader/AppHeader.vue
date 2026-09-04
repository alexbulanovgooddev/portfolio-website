<template>
	<header class="header">
		<div class="header__wrapper">
			<AppHeaderLogo class="header__logo" />

			<div class="header__actions">
				<AppColorMode class="header__color-mode" />
				<AppHeaderMenu class="header__menu" />
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	position: relative;
	width: 100%;
	min-height: 60px;

	@media screen and (min-width: $lg) {
		position: fixed;
		top: 20px;
		z-index: 50;
		width: calc(100% - 48px);
		min-height: 68px;

		&::before {
			content: '';
			position: absolute;
			top: -20px;
			left: 0;
			z-index: 0;
			width: 100%;
			height: 24px;
			background-color: var(--color-canvas);
		}
	}

	&__wrapper {
		position: relative;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		display: flex;
		justify-content: space-between;
		color: var(--color-ink);
		background-color: var(--color-chrome);

		&::after {
			content: '';
			position: absolute;
			bottom: -4px;
			left: 0;
			width: 100%;
			height: 4px;
			background-color: var(--color-canvas);
		}
	}

	&__actions {
		display: flex;

		@media screen and (min-width: $lg) {
			flex-direction: row-reverse;
			flex: 1;
		}
	}
}
</style>
