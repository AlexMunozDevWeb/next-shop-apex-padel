'use client'

import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'

interface Props {
  quantity: number
  onQuantityChanged: (value: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return
    onQuantityChanged(quantity + value)
  }

  return (
    <div className="border-surface-highest bg-surface-high flex items-center rounded-xl border p-1">
      <button
        onClick={() => onValueChanged(-1)}
        className="text-on-surface hover:bg-surface-highest flex h-10 w-10 items-center justify-center rounded-lg transition-transform active:scale-90 disabled:opacity-30"
        disabled={quantity <= 1}
        aria-label="Disminuir"
      >
        <IoRemoveOutline className="h-4 w-4" />
      </button>

      <span className="w-10 text-center text-sm font-extrabold text-white">{quantity}</span>

      <button
        onClick={() => onValueChanged(1)}
        className="text-on-surface hover:bg-surface-highest flex h-10 w-10 items-center justify-center rounded-lg transition-transform active:scale-90"
        aria-label="Aumentar"
      >
        <IoAddOutline className="h-4 w-4" />
      </button>
    </div>
  )
}
