import { Outlet } from 'react-router'
import { Navbar } from './Navbar/Navbar'

const AppLayout = () => {

  return (
    <>
      {/* Structure for Global layout */}
      {/* Header */}
      <header>
        <Navbar />
      </header>

      <main className='container'>
        <Outlet />
      </main>
      {/* Add any global modal or toasts here */}
    </>
  )
}

export default AppLayout
