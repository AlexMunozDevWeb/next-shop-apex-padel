import { Category, GetCategoryOrderBy } from '../domain'
import { categoryRepository } from '../infra'
import { iCategoryRepository } from '../infra/iCategoryRepository'

interface iCategoryController {
  getCategories: (query: GetCategoryOrderBy) => Promise<Category[]>
}

const iCategoryController = (api: iCategoryRepository): iCategoryRepository => ({
  getCategories: async (query) => {
    return api.getCategories(query)
  },
})

export const implementCategoryController = () => {
  return iCategoryController(categoryRepository)
}
