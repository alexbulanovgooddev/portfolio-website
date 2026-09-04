import type { StructuredTextField } from './StructuredText'
import type { Category } from './Category'
import type { Media } from './Media'

export interface Project {
	id: string
	_createdAt: string
	slug: string | null
	title: string | null
	description: StructuredTextField | null
	categories: Category[]
	preview: Media | null
}
