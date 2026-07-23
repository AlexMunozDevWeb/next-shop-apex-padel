import { Countries, GetCountryOrderBy } from '../domain'
import { countryRepository, iCountryRepository } from '../infra'

export type CountryViewModel = Countries

interface iServerCountryController {
  getCountries: (query: GetCountryOrderBy) => Promise<Countries>
}

const ServerCountryController = (api: iCountryRepository): iServerCountryController => ({
  getCountries: (query) => api.getCountries(query),
})

export const implementServerCountryController = () => {
  return ServerCountryController(countryRepository)
}
