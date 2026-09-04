import type { Link } from './Link'
import type { StructuredTextField } from './StructuredText'

export interface HeroData {
	title: string | null
	text: StructuredTextField | null
	button: Link | null
}
