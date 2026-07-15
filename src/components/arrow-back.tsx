import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ArrowBackProps {
  link: string
  text: string
}

export function ArrowBack({ link, text }: ArrowBackProps) {
  return (
    <Link to={link} className="flex items-center gap-2 w-fit group">
      <ArrowLeft
        size={14}
        className="text-text-tertiary group-hover:text-text-primary transition-colors duration-700 ease-out"
      />
      <span className="text-[14px] leading-[150%] text-text-tertiary group-hover:text-text-primary transition-colors duration-700 ease-out">
        {text}
      </span>
    </Link>
  )
}
