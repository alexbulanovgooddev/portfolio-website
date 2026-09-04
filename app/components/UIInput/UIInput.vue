<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const inputId = useId()

interface Props {
	modelValue?: string | number
	label?: string
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	label: undefined
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: string | number): void
}>()

const inputAttrs = computed(() => {
	const { class: _class, value: _value, ...rest } = attrs

	return rest
})

const model = computed<string | number>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>

<template>
	<div class="ui-input" :class="attrs.class">
		<label v-if="label" class="ui-input__label" :for="inputId">
			{{ label }}
		</label>
		<input
			:id="inputId"
			v-model="model"
			class="ui-input__field"
			v-bind="inputAttrs"
		/>
	</div>
</template>

<style lang="scss" scoped>
.ui-input {
	&__label {
		@include typo-paragraph-3;

		font-weight: 800;
	}

	&__field {
		@include typo-paragraph-3;

		outline: none;
		border: 4px solid var(--color-canvas);
		display: block;
		width: 100%;
		height: 60px;
		padding: 8px 16px;
		color: var(--color-ink);
		background-color: var(--color-chrome);

		&::placeholder {
			@include typo-paragraph-3;
		}

		/* &:not(:placeholder-shown), */
		&:focus-visible {
			background-color: var(--color-surface);
		}

		&:disabled {
			@include cursor-default;

			opacity: 0.6;
			pointer-events: none;
		}
	}

	/* autofill fix */

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus-visible,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus-visible,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus-visible {
		-webkit-text-fill-color: var(--color-ink) !important;
		box-shadow: 0 0 0 1000px var(--color-chrome) inset;
		transition:
			background-color 50000s ease-in-out 0s,
			color 5000s ease-in-out 0s;
		background-color: transparent !important;
	}
}
</style>
