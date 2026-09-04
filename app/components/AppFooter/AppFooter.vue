<script setup lang="ts">
import { storeLayout } from '~/stores/storeLayout'

const { copyright } = storeToRefs(storeLayout())

const copyText = computed<string>(
	() => `© ${new Date().getFullYear()} ${copyright.value}`
)
</script>

<template>
	<footer class="footer">
		<div class="container">
			<p class="footer__copyright">{{ copyText }}</p>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	position: relative;
	display: flex;
	justify-content: space-between;
	padding: 20px 0 12px;
	color: var(--color-ink);
	background-color: var(--color-chrome);

	@media screen and (min-width: $md) {
		text-align: center;
	}

	@media screen and (min-width: $lg) {
		padding: 12px 0;
		text-align: left;
	}

	&::after {
		content: '';
		position: absolute;
		top: -4px;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: var(--color-canvas);
	}

	&__copyright {
		@include typo-paragraph-3;
	}
}
</style>
