'use client'

import { generatePaginationNumbers } from '@/modules/shared/ui/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? '1'
  const currentPage = isNaN(+pageString) ? 1 : +pageString

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname)
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }
    if (+pageNumber <= 0) {
      return `${pathname}`
    }
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="mt-10 mb-12 flex justify-center text-center">
      <nav aria-label="Navegación de páginas">
        <ul className="flex items-center space-x-1">
          <li>
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e3e2e7] bg-white text-[#1a1b1f] transition-all hover:bg-black hover:text-[#c1f100]"
              href={createPageUrl(currentPage - 1)}
              aria-label="Página anterior"
            >
              <IoChevronBackOutline className="h-4 w-4" />
            </Link>
          </li>

          {allPages.map((page, idx) => (
            <li key={idx}>
              <Link
                className={clsx(
                  'flex h-10 min-w-[40px] items-center justify-center rounded-lg px-3 text-xs font-bold transition-all',
                  {
                    'bg-black text-[#c1f100] shadow-sm': page === currentPage,
                    'border border-[#e3e2e7] bg-white text-[#1a1b1f] hover:bg-[#f4f3f8]':
                      page !== currentPage && page !== '...',
                    'pointer-events-none text-[#4c4546]': page === '...',
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li>
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e3e2e7] bg-white text-[#1a1b1f] transition-all hover:bg-black hover:text-[#c1f100]"
              href={createPageUrl(currentPage + 1)}
              aria-label="Página siguiente"
            >
              <IoChevronForwardOutline className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
