import { prisma } from '@/modules/shared/lib/prisma'
import { iCountryRepository } from './iCountryRepository'
import { buildCountries } from '../domain'
import { GetCountryOrderBy } from '../domain'

export const countryRepository: iCountryRepository = {
  getCountries: async (query: GetCountryOrderBy) => {
    try {
      const dto = await prisma.country.findMany({
        orderBy: { name: query.orderBy },
      })
      return buildCountries(dto)
    } catch (error) {
      throw new Error('Failed to fetch countries from database')
    }
  },
}
