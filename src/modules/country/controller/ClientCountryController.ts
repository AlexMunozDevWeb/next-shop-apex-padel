import { Countries, GetCountryOrderBy } from '../domain'
import { countryRepository, iCountryRepository } from '../infra'

export type CountryViewModel = Countries

interface iClientCountryController {
  getCountries: (query: GetCountryOrderBy) => void
  countries: Countries
  isCountriesLoading: boolean
}

const ClientCountryController = (api: iCountryRepository): iClientCountryController => ({
  getCountries: async (query) => {
    await api.getCountries(query)
  },
  countries: [],
  isCountriesLoading: false,
})

export const useClientCountryController = () => {
  return ClientCountryController(countryRepository)
}
