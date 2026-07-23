import { Category, GetCategoryOrderBy } from '../domain'

export interface iCategoryRepository {
  getCategories: (query: GetCategoryOrderBy) => Promise<Category[]>
}
