import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from 'sonner'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  )
}

export default App
