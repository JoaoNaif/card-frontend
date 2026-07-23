import { Outlet } from 'react-router-dom'
import { SeparateBorder } from '../../components/separete-border'
import { GoogleIcon } from '../../components/icons/google-icon'
import { LogoIcon } from '../../components/icons/logo-icon'

export function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center w-full">
      <div className="flex flex-col items-center px-4 py-6 lg:p-6 mx-2 lg:mx-0 max-w-[384px] w-full min-h-125 bg-bg-1 border border-border-default shadow-[0_0_700px_5px_rgba(0,0,0,0.5)] shadow-accent-brand-muted">
        <div className="flex flex-col items-center gap-3">
          <LogoIcon width={56} height={56} />
          <h1 className="uppercase text-[20px] leading-[150%] font-bold">Origin</h1>
          <p className="text-[14px] leading-[150%] text-center text-text-tertiary">
            acesse sua conta
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 border border-border-default hover:border-border-strong bg-bg-2 p-3 my-7 cursor-pointer w-full ">
          <GoogleIcon />

          <span className="text-text-primary leading-[150%] font-normal text-[14px]">
            Acesse com o google
          </span>
        </div>

        <SeparateBorder />

        <Outlet />
      </div>
    </main>
  )
}
