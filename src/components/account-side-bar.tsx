import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { getUser } from '../api/user/get-user'

interface AccountSideBarProps {
  expand: boolean
}

export function AccountSideBar({ expand }: AccountSideBarProps) {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })

  if (!user) return null

  return (
    <section className="flex items-center justify-between w-full cursor-pointer px-4 lg:py-2 group hover:bg-bg-3 transition-all duration-300 ease-out lg:border-y border-border-default">
      <div className="flex items-center gap-3">
        <div className="bg-accent-brand-muted group-hover:bg-accent-brand transition-all duration-300 ease-out w-6 h-7 -skew-x-12 flex items-center justify-center font-bold">
          <span className="skew-x-12 text-[14px] leading-[150%] font-bold font-display">
            {user.name.charAt(0)}
          </span>
        </div>
        {expand && (
          <div className="lg:flex flex-col hidden">
            <span className="text-[12px] font-medium leading-[150%] text-text-primary">
              {user.name}
            </span>
            <p className="text-text-tertiary text-[10px] leading-[150%] font-light">{user.email}</p>
          </div>
        )}

        <div className="flex flex-col lg:hidden">
          <span className="text-[12px] font-medium leading-[150%] text-text-primary">
            {user.name}
          </span>
          <p className="text-text-tertiary text-[10px] leading-[150%] font-light">{user.email}</p>
        </div>
      </div>
      {expand && (
        <ChevronRight
          size={16}
          className="text-text-tertiary group-hover:text-accent-brand transition-all duration-300 ease-out lg:block hidden"
        />
      )}
    </section>
  )
}
