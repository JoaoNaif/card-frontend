import { Outlet } from 'react-router-dom'
import { SideBar } from '../../components/side-bar'

export function AppLayout() {
  return (
    <div className="flex lg:flex-row flex-col-reverse min-h-screen">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
