import { CountryDto } from '../infra/dto/CountryDto'

export type Country = {
  id: string
  name: string
}

export type Countries = Country[]

export const buildCountries = (dto: CountryDto): Countries => dto || []
