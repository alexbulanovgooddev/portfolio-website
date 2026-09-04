import type { Link } from './Link'

export interface Nav extends Link {
	dropdownElements: Link[]
}
