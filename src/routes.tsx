import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './pages/_layout/auth'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello, World!</h1>,
    children: [{ path: '/', element: <h2>Bom dia!</h2> }],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
