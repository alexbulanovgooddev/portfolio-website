import type { SeoMetaTagType } from 'vue-datocms'

import type { HeroData } from './HeroData'
import type { CollectionMeta } from './GraphQl'
import type { Project } from './Project'

export interface PortfolioPage {
	_seoMetaTags: SeoMetaTagType[]
	hero: HeroData | null
}

export interface PortfolioData {
	_allProjectPostsMeta: CollectionMeta
	allProjectPosts: Project[]
	portfolioPage: PortfolioPage | null
}
