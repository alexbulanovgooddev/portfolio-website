<script setup lang="ts"></script>

<template>
	<div class="header-logo">
		<NuxtLink class="header-logo__link" to="/">
			<Icon class="header-logo__icon" name="icons:logo" size="auto" />
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.header-logo {
	&__link {
		@include cursor-pointer;

		outline: none;
		display: flex;
		justify-self: center;
		align-items: center;
		height: 56px;
		padding: 0 20px;
		transition-property: color, background-color;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				color: var(--color-surface);
				background-color: var(--color-canvas);
			}
		}

		@media screen and (min-width: $lg) {
			height: 68px;
		}
	}

	&__icon {
		width: 40px;
		height: 40px;
	}
}
</style>
