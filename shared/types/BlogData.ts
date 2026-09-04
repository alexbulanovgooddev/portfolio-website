import type { SeoMetaTagType } from 'vue-datocms'

import type { HeroData } from './HeroData'
import type { CollectionMeta } from './GraphQl'
import type { Post } from './Post'

export interface BlogPage {
	_seoMetaTags: SeoMetaTagType[]
	hero: HeroData | null
}

export interface BlogData {
	_allBlogPostsMeta: CollectionMeta
	allBlogPosts: Post[]
	blogPage: BlogPage | null
}
