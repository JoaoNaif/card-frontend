import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './pages/_layout/auth'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layout/app'
import { Roster } from './pages/home/roster'
import { CharacterDetail } from './pages/home/character-detail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/roster', element: <Roster /> },
      { path: '/character/:characterId', element: <CharacterDetail /> },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
])
