import { startCase, find } from 'lodash'

const locations = [
  {
    city: 'New York City',
    state: 'NY'
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
    city: 'San Fransisco',
    state: 'CA'
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
  console.log('tsheets format:', `(${city}, ${state}?)`)
  return `(${city}, ${state}?)`
}
export default { getTsheetsFormat }
