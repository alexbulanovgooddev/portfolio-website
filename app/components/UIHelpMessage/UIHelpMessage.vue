<script setup lang="ts">
interface Props {
	message?: string | undefined
	status?: 'success' | 'error' | 'warning'
}

defineProps<Props>()
</script>

<template>
	<div
		class="ui-help-message"
		:class="{
			[`is-${status}`]: status
		}"
	>
		{{ message }}
	</div>
</template>

<style lang="scss" scoped>
.ui-help-message {
	@include typo-paragraph-4;

	&.is-error {
		color: var(--color-error);
	}

	&.is-warning {
		color: var(--color-warning);
	}

	&.is-success {
		color: var(--color-success);
	}
}
</style>
