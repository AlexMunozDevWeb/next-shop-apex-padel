import type { Size } from '@/modules/products/domain'
import clsx from 'clsx'

interface Props {
  selectedSize?: Size
  availableSizes: Size[]
  onSizeChanged: (size: Size) => void
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-on-surface text-xs font-extrabold tracking-wider uppercase">Seleccionar Talla</label>
        {selectedSize && <span className="text-primary-fixed text-xs font-bold">Talla Elegida: {selectedSize}</span>}
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx(
              'flex h-12 items-center justify-center rounded-xl border text-xs font-extrabold transition-all',
              {
                'border-primary-fixed bg-primary-fixed text-on-primary-fixed scale-105 shadow-lg':
                  size === selectedSize,
                'bg-surface-high text-on-surface hover:border-surface-highest hover:bg-surface-highest border-transparent':
                  size !== selectedSize,
              }
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
