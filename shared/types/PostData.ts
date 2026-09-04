import type { SeoMetaTagType } from 'vue-datocms'
import type { Media } from './Media'

export interface PostPage {
	_seoMetaTags: SeoMetaTagType[]
	_createdAt: string
	slug: string | null
	title: string | null
	content: StructuredTextField | null
	preview: Media | null
}

export interface PostData {
	blogPost: PostPage | null
}
