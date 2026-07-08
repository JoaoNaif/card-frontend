import type { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface LinkSideBarProps {
  text: string
  link: string
  icon: LucideIcon
  expand: boolean
}

export function LinkSideBar({ text, link, icon: Icon, expand }: LinkSideBarProps) {
  const { pathname } = useLocation()
  const isActive = pathname === link

  return (
    <li className="w-full group">
      <Link
        to={link}
        className={`flex items-center relative gap-2 w-full border-l-2 ${expand ? 'px-4 ' : 'px-0 justify-center'} py-3 ${isActive ? 'bg-bg-3  border-accent-brand ' : 'border-transparent hover:bg-bg-3 hover:border-text-primary'} transition-all duration-300 ease-out`}
      >
        <Icon size={16} className={isActive ? 'text-accent-brand' : 'text-text-secondary'} />
        <span
          className={` leading-[150%] ${isActive ? 'text-text-primary' : 'text-text-secondary'} ${expand ? 'text-[14px]' : 'absolute left-[110%] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 w-fit px-2 text-[12px] whitespace-nowrap border border-border-default'}`}
        >
          {text}
        </span>
      </Link>
    </li>
  )
}
