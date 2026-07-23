import { mainFont } from '@/modules/config/fonts'

interface Props {
  title: string
  subtitle?: string
  className: string
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${mainFont} my-7 text-4xl font-semibold antialiased`}>{title}</h1>
      {subtitle && <h3 className="mb-5 text-xl">{subtitle}</h3>}
    </div>
  )
}
