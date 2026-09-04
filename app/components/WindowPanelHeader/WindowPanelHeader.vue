<script setup lang="ts">
interface Props {
	title?: string
	closed?: boolean
	expandable?: boolean
}

defineProps<Props>()

const emits = defineEmits<{
	(e: 'close'): void
	(e: 'expand'): void
}>()
</script>

<template>
	<div class="window-panel-header">
		<div class="window-panel-header__button-circles-wrap">
			<button
				v-if="closed"
				class="window-panel-header__button-circles window-panel-header__button-circles_close"
				@click="emits('close')"
			>
				<Icon class="window-panel-header__icon" name="icons:x" size="12" />
			</button>
			<div v-else class="window-panel-header__button-circles"></div>
			<button
				v-if="expandable"
				class="window-panel-header__button-circles window-panel-header__button-circles_expand"
				@click="emits('expand')"
			>
				<Icon
					class="window-panel-header__icon"
					name="icons:chevrons-left-right"
					size="12"
				/>
			</button>
			<div v-else class="window-panel-header__button-circles"></div>
		</div>
		<p v-if="title" class="window-panel-header__title typo-p2">{{ title }}</p>
	</div>
</template>

<style lang="scss" scoped>
.window-panel-header {
	position: relative;
	border-bottom: 4px solid var(--color-canvas);
	padding: 14px 20px;
	background-color: var(--color-chrome);

	&__button-circles-wrap {
		position: absolute;
		top: 50%;
		left: 20px;
		z-index: 10;
		display: flex;
		align-items: center;
		transform: translateY(-50%);

		& > * + * {
			margin-left: 8px;
		}
	}

	&__button-circles {
		border: 4px solid var(--color-canvas);
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		background-color: var(--color-chrome);
	}

	&__button-circles_close {
		@include cursor-pointer;

		background-color: var(--color-error);
	}

	&__button-circles_expand {
		@include cursor-pointer;

		background-color: var(--color-success);
	}

	&__icon {
		opacity: 0;
	}

	&__button-circles:hover &__icon,
	&__button-circles:focus-visible &__icon {
		opacity: 1;
	}

	&__title {
		@include line-clamp(1);

		margin: 0;
		font-weight: 800;
		text-align: center;
	}
}
</style>
