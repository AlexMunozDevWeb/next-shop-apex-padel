import { GetCountryOrderBy, Countries } from '../domain'

export interface iCountryRepository {
  getCountries: (query: GetCountryOrderBy) => Promise<Countries>
}
