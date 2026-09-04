<script setup lang="ts">
import type { Technology } from '~~/shared/types'

interface Props {
	technologies: Technology[]
}

defineProps<Props>()
</script>

<template>
	<div class="stack-card">
		<div class="stack-card__wrapper">
			<div
				v-for="technology in technologies"
				:key="technology.id"
				class="stack-card__technology"
			>
				<img class="stack-card__logo" :src="technology.logo" alt="" />
				<span class="stack-card__label">{{ technology.label }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.stack-card {
	&__wrapper {
		margin: -4px -8px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	&__technology {
		margin: 4px 8px;
		display: flex;
		align-items: center;
	}

	&__logo {
		margin: 0 8px 0 0;
		max-width: 24px;
		min-width: 24px;
		height: auto;
		flex-shrink: 0;
	}

	&__label {
		@include typo-paragraph-3;

		font-weight: 600;
		white-space: nowrap;
	}
}
</style>
