import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { registerUser } from '../../api/register-user'
import { toast } from 'sonner'

const signInForm = z.object({
  email: z.email('Digite um email válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInForm = z.infer<typeof signInForm>

export function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await registerUserFn({
        email: data.email,
        password: data.password,
      })

      toast.success('Usuário registrado com sucesso!')
    } catch {
      toast.error('Erro ao registrar usuário!')
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
