import type { SeoMetaTagType } from 'vue-datocms'
import type { Media } from './Media'
import type { Technology } from './Technology'

export interface ProjectPage {
	_seoMetaTags: SeoMetaTagType[]
	_createdAt: string
	slug: string | null
	title: string | null
	technologies: Technology[]
	text: StructuredTextField | null
	preview: Media | null
}

export interface ProjectData {
	projectPost: ProjectPage | null
}
