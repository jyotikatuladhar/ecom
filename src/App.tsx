import { Outlet } from 'react-router'
import './App.css'
import { useEffect } from 'react'
import CatalogPage from './pages/CatalogPage'

const AppLayout = () => {

  return (
    <>
      {/* Structure for Global layout */}
      {/* Header */}
      <header>
        Page Header
      </header>
      <Outlet />
      {/* Add any global modal or toasts here */}
    </>
  )
}

export default AppLayout
