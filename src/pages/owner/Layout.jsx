import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'


const Layout = () => {
  const {isOwner, navigate, user, token} = useAppContext()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  useEffect(()=>{
    // Only redirect if we have user data and token, and user is not owner
    if (token && user !== null && !isOwner){
      navigate('/')
    }
  },[isOwner, user, token])

  // Show loading or nothing while user data is loading
  if (token && user === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <NavbarOwner toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      <div className='flex flex-1 overflow-hidden relative'>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        <div className='flex-1 overflow-y-auto bg-gray-50'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
