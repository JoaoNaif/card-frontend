import { api } from '../../lib/axios'

export interface GetUserResponse {
  id: string
  email: string
  name: string
  createdAt: Date
}

export async function getUser() {
  const response = await api.get<GetUserResponse>('/users/me')

  return response.data
}
