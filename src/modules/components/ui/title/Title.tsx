import { titleFont } from '@/modules/config/fonts'

interface Props {
  title: string
  subtitle?: string
  className?: string
}

export const Title = ({ title, subtitle, className = '' }: Props) => {
  return (
    <div className={`mt-4 mb-6 ${className}`}>
      <h1 className={`${titleFont.className} text-3xl font-extrabold tracking-tight text-[#1a1b1f] sm:text-4xl`}>
        {title}
      </h1>
      {subtitle && <p className="mt-1.5 text-sm font-medium text-[#4c4546]">{subtitle}</p>}
    </div>
  )
}
