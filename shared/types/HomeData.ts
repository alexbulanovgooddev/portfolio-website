import type { SeoMetaTagType } from 'vue-datocms'

import type { HeroData } from './HeroData'
import type { HomeQuickData } from './HomeQuickData'
import type { HomeRecentData } from './HomeRecentData'

export interface HomePage {
	_seoMetaTags: SeoMetaTagType[]
	hero: HeroData | null
	quick: HomeQuickData | null
	recent: HomeRecentData | null
}

export interface HomeData {
	homePage: HomePage | null
}
