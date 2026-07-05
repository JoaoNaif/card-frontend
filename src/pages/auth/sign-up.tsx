import { Link } from 'react-router-dom'
import { FormRegister } from '../../components/auth/form-register'

export function SignUp() {
  return (
    <>
      <FormRegister />

      <span className="text-text-tertiary text-[12px] leading-[150%] font-normal mt-3">
        Já tem conta?{' '}
        <Link
          to="/sign-in"
          className="text-accent-brand underline cursor-pointer font-medium hover:text-accent-brand/80 transition-all duration-200 ease-linear"
        >
          Faça login
        </Link>
      </span>
    </>
  )
}
