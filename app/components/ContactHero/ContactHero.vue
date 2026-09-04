<script setup lang="ts">
import type { HeroData } from '~~/shared/types'

import { StructuredText as DatocmsStructuredText } from 'vue-datocms'

interface Props {
	content: HeroData
}

defineProps<Props>()

const { renderBlock } = useDatoRender()
const { openModal } = useUIModal()

function handleSubmitFailure(_error: unknown): void {
	openModal({
		headerProps: {
			title: 'Ошибка'
		},
		component: h('div', [
			h('h2', 'Что-то пошло не так...'),
			h('p', 'Попробуйте ещё раз или повторите попытку позже.')
		])
	})
}

function handleSubmitSuccess(): void {
	openModal({
		headerProps: {
			title: 'Успешно'
		},
		component: h('div', [
			h('h2', 'Спасибо, что написали!'),
			h('p', 'Ответ скоро появится в вашем почтовом ящике.')
		])
	})
}
</script>

<template>
	<PageSection class="contact-hero" pattern>
		<div class="container">
			<WindowPanel>
				<template #header>
					<WindowPanelHeader :title="`contact.html`" />
				</template>

				<template #default>
					<div class="container">
						<h2 class="contact-hero__title">{{ content.title }}</h2>
						<DatocmsStructuredText
							class="contact-hero__text"
							:data="content.text"
							:render-block="renderBlock"
						/>

						<ContactForm
							@submit-success="handleSubmitSuccess"
							@submit-failure="handleSubmitFailure"
						/>
					</div>
				</template>
			</WindowPanel>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.contact-hero {
	&__title {
		@include typo-display-2;

		margin: 0 0 12px;
	}

	&__text {
		margin: 0 0 24px;
	}
}
</style>
