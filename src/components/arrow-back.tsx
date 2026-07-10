import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ArrowBackProps {
  link: string
  text: string
}

export function ArrowBack({ link, text }: ArrowBackProps) {
  return (
    <Link to={link} className="flex items-center gap-2">
      <ArrowLeft size={14} className="text-text-tertiary" />
      <span className="text-[14px] leading-[150%] text-text-tertiary">{text}</span>
    </Link>
  )
}
