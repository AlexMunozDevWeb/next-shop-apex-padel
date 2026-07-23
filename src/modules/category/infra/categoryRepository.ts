import { prisma } from '@/modules/shared/lib/prisma'
import { iCategoryRepository } from './iCategoryRepository'
import { buildCategory, GetCategoryOrderBy } from '../domain'

export const categoryRepository: iCategoryRepository = {
  getCategories: async (query: GetCategoryOrderBy) => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: query.orderBy },
      })

      return buildCategory(categories)
    } catch {
      return []
    }
  },
}
