import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { registerUser } from '../../api/user/register-user'
import { toast } from 'sonner'
import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

const signUpForm = z.object({
  email: z.email('Digite um email válido'),
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignUpForm = z.infer<typeof signUpForm>

export function FormRegister() {
  const [showPass, setShowPass] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      toast.success('Usuário cadastrado!')
      navigate('/')
    } catch {
      toast.error('Erro ao cadastrar usuário!')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-3 w-full mt-7">
      <input
        type="text"
        placeholder="Email"
        {...register('email')}
        className="p-2 border-border-default border outline-none focus:border-accent-brand w-full"
      />
      <input
        type="text"
        placeholder="Nome"
        {...register('name')}
        className="p-2 border-border-default border outline-none focus:border-accent-brand w-full"
      />
      <div className="relative">
        <input
          type={showPass ? 'text' : 'password'}
          placeholder="Senha"
          {...register('password')}
          className="p-2 border-border-default border outline-none focus:border-accent-brand w-full"
        />
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {showPass ? <Eye /> : <EyeClosed />}
        </button>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-10 bg-accent-brand hover:scale-102 transition-all duration-500 ease-out cursor-pointer"
      >
        Cadastrar
      </button>
    </form>
  )
}
