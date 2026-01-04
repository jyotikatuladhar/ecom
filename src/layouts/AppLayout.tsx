import { Outlet } from 'react-router'
import { Navbar } from './Navbar/Navbar'
// import { SearchBar } from '@/features/catalog/components/SearchBar/SearchBar'

const AppLayout = () => {

  return (
    <>
      {/* Structure for Global layout */}
      {/* Header */}
      <header>
        <Navbar />
      </header>
      {/* <SearchBar /> */}

      <main className='container'>
        <Outlet />
      </main>
      {/* Add any global modal or toasts here */}
    </>
  )
}

export default AppLayout
