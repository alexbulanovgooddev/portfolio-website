import type { SeoMetaTagType } from 'vue-datocms'

import type { HeroData } from './HeroData'

export interface ContactPage {
	_seoMetaTags: SeoMetaTagType[]
	hero: HeroData | null
}

export interface ContactData {
	contactPage: ContactPage | null
}
