import type { StructuredTextDocument } from 'vue-datocms'

import type { Media } from './Media'
import type { Technology } from './Technology'

export type ImageBlockRecord = {
	__typename: 'ImageBlockRecord'
	id: string
	image: Media | null
}

export type StackRecord = {
	__typename: 'StackRecord'
	id: string
	technologies: Technology[]
}

export type StructuredTextBlock = ImageBlockRecord | StackRecord

export interface StructuredTextField {
	value: StructuredTextDocument
	blocks?: StructuredTextBlock[]
}
