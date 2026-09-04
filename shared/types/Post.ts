import type { Media } from './Media'

export interface Post {
	id: string
	_createdAt: string
	slug: string | null
	title: string | null
	preview: Media | null
}
