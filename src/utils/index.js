import { startCase, find } from 'lodash'

const locations = [
  {
    city: 'New York City',
    state: 'NY'
  },
  {
    city: 'San Francisco',
    state: 'CA'
  },
  {
    city: 'Lehi',
    state: 'UT'
  },
  {
    city: 'Orem',
    state: 'UT'
  },
  {
    city: 'Manassas',
    state: 'VA'
  },
  {
    city: 'Mount Laurel',
    state: 'NJ'
  }
]

export const getTsheetsFormat = (camelCase) => {
  const { city, state } = find(locations, { city: startCase(camelCase) })
  return `(${city}, ${state}?)`
}
export default { getTsheetsFormat }
