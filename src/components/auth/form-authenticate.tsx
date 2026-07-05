import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { authenticateUser } from '../../api/authenticate-user'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const signInForm = z.object({
  email: z.email('Digite um email válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInForm = z.infer<typeof signInForm>

export function FormAuthenticate() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: authenticateUserFn } = useMutation({
    mutationFn: authenticateUser,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticateUserFn({
        email: data.email,
        password: data.password,
      })

      toast.success('Usuário autenticado com sucesso!')
      navigate('/')
    } catch {
      toast.error('Erro ao autenticar usuário!')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-3 w-full mt-7">
      <input
        type="text"
        placeholder="Email"
        {...register('email')}
        className="p-2 border-border-default border outline-none focus:border-accent-brand w-full"
      />
      <input
        type="text"
        placeholder="Senha"
        {...register('password')}
        className="p-2 border-border-default border outline-none focus:border-accent-brand w-full "
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-10 bg-accent-brand  hover:scale-102 transition-all duration-500 ease-out cursor-pointer"
      >
        Entrar
      </button>
    </form>
  )
}
