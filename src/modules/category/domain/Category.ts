import { CategoryDto } from '../infra/dto/CategoryDto'

export interface Category {
  id: string
  name: string
}

export type GetCategoryOrderBy = {
  orderBy: 'asc' | 'desc'
}

export const buildCategory = (dto: CategoryDto): Category[] => dto || []
