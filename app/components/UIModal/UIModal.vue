<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'

interface Props {
	modalProps?: Record<string, unknown>
	headerProps?: {
		title?: string
	}
}

const props = defineProps<Props>()

const emits = defineEmits<{
	(e: 'update:modelValue', modelValue: boolean): void
	(e: 'onClosed'): void
}>()

const modalClass = computed(() => props.modalProps?.class as string | undefined)
const vueFinalModalProps = computed(() => {
	if (!props.modalProps) {
		return {}
	}

	const { class: _class, ...rest } = props.modalProps

	return rest
})

const { openedModals } = useVfm()
const { scrollLock, scrollUnLock } = useLock()

// Вернуть вместе с блоком modal__body в шаблоне.
// const { default: defaultSlot } = useSlots()

function handleBeforeOpen(): void {
	scrollLock()
}

function handleClosed(): void {
	const isAnyModalOpen = openedModals.length > 0
	if (isAnyModalOpen) {
		return
	}
	scrollUnLock()
}

function handleModal(event: Event): void {
	event.stopPropagation()
}
</script>

<template>
	<VueFinalModal
		class="ui-modal final-modal"
		:class="modalClass"
		v-bind="vueFinalModalProps"
		content-class="ui-modal__content"
		overlay-class="ui-modal__overlay"
		:overlay-transition="'vfm-fade'"
		@before-open="handleBeforeOpen"
		@closed="handleClosed"
		@update:model-value="val => emits('update:modelValue', val)"
		@click="handleModal"
	>
		<WindowPanel>
			<template #header>
				<WindowPanelHeader
					:title="headerProps?.title || ''"
					closed
					@close="emits('update:modelValue', false)"
				/>
			</template>

			<template #default>
				<slot />
			</template>
		</WindowPanel>
	</VueFinalModal>
</template>

<style lang="scss">
.ui-modal {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;

	&__overlay {
		backdrop-filter: blur(4px);
	}

	&__content {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-height: 100%;
		max-width: 100%;
		padding: 24px;
		overflow: hidden auto;
		background-color: var(--color-white);

		@media screen and (min-width: $md) {
			max-width: 600px;
			padding: 40px;
		}
	}
}
</style>
