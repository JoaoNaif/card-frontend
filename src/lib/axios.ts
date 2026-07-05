import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  withCredentials: true,
})

if (import.meta.env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, Math.round(Math.random() * 3000)))

    return config
  })
}
