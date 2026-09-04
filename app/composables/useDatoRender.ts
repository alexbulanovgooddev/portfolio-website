import type { RenderBlockContext } from 'vue-datocms'
import type { StructuredTextBlock } from '~~/shared/types'

import { h } from 'vue'
import StackCard from '~/components/StackCard/StackCard.vue'

export default function useDatoRender() {
	const renderBlock = (context: RenderBlockContext<StructuredTextBlock>) => {
		const { record } = context

		if (record.__typename === 'ImageBlockRecord' && record.image) {
			return h('img', { src: record.image.url, alt: record.image.alt || ' ' })
		}

		if (record.__typename === 'StackRecord') {
			return h(StackCard, { technologies: record.technologies })
		}

		return null
	}

	return {
		renderBlock
	}
}
