import { startCase, find } from 'lodash'

const locations = [
  {
    city: 'New York City',
    initials: 'NYC',
    state: 'NY'
  },
  {
    city: 'San Francisco',
    initials: 'SF',
    state: 'CA'
  },
  {
    city: 'Salt Lake City',
    initials: 'SLC',
    state: 'UT'
  }
]
export const getTsheetsFormat = (camelCase) => {
  const { city, state } = find(locations, { city: startCase(camelCase) })
  return `(${city}, ${state}?)`
}
export const getCity = (initials) => find(locations, { initials })

export const getInitials = (city) => find(locations, { city })

export default { getTsheetsFormat }
