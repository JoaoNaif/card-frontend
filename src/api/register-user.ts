import { api } from '../lib/axios'

export interface RegisterUserBody {
  email: string
  password: string
}

export async function registerUser({ email, password }: RegisterUserBody) {
  await api.post('/users/authenticate', { email, password })
}
