import { Link } from 'react-router-dom'
import { FormAuthenticate } from '../../components/auth/form-authenticate'
import { GoogleIcon } from '../../components/icons/google-icon'
import { LogoIcon } from '../../components/icons/logo-icon'
import { SeparateBorder } from '../../components/separete-border'

export function SignIn() {
  return (
    <div className="flex flex-col items-center px-4 py-6 lg:p-6 mx-2 lg:mx-0 max-w-[384px] w-full h-125 bg-bg-1 border border-border-default shadow-[0_0_700px_5px_rgba(0,0,0,0.5)] shadow-accent-brand-muted">
      <div className="flex flex-col items-center gap-3">
        <LogoIcon />
        <h1 className="uppercase text-[20px] leading-[150%] font-bold">Origin</h1>
        <p className="text-[14px] leading-[150%] text-center text-text-tertiary">
          acesse sua conta
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 border border-border-default hover:border-border-strong bg-bg-2 p-3 mt-7 cursor-pointer w-full ">
        <GoogleIcon />

        <span className="text-text-primary leading-[150%] font-normal text-[14px]">
          Acesse com o google
        </span>
      </div>

      <SeparateBorder />

      <FormAuthenticate />

      <span className="text-text-tertiary text-[12px] leading-[150%] font-normal mt-2">
        Sem conta?{' '}
        <Link
          to="/sign-up"
          className="text-accent-brand underline cursor-pointer font-medium hover:text-accent-brand/80 transition-all duration-200 ease-linear"
        >
          Cadastre-se
        </Link>
      </span>
    </div>
  )
}
