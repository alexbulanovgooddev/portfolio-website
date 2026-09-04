import type { SeoMetaTagType } from 'vue-datocms'
import type { HeroData } from './HeroData'
import type { AboutAchievementData } from './AboutAchievementData'

export interface AboutPage {
	_seoMetaTags: SeoMetaTagType[]
	hero: HeroData
	achievement: AboutAchievementData
}

/** Ответ CMS как есть: одиночная запись может отсутствовать целиком. */
export interface AboutData {
	aboutPage: AboutPage | null
}
