<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
	error: NuxtError
}>()

function handleError() {
	clearError({ redirect: '/' })
}
</script>

<template>
	<NuxtLayout>
		<main v-if="error" class="error">
			<div class="container">
				<div class="error__heading">
					<h1 class="error__title">Ошибка: {{ error.status }}</h1>
				</div>
				<p class="error__description">{{ error.message }}</p>
				<UIButton label="Вернуться на главную" @click="handleError" />
			</div>
		</main>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
.error {
	@include pattern;

	padding: 148px 0 74px;
	background-color: var(--color-surface);

	&__heading {
		margin: 0 0 16px;

		@media screen and (min-width: $md) {
			margin: 0 0 32px;
		}
	}

	&__title {
		@include typo-display-2;
	}

	&__description {
		@include typo-paragraph-1;

		margin: 0 0 36px;
	}
}
</style>
