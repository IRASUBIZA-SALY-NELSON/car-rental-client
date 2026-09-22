import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FaBars } from 'react-icons/fa';

const NavbarOwner = ({ toggleSidebar }) => {

    const {user} = useAppContext()

  return (
    <div className='flex items-center justify-between px-4 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all bg-white z-20'>
      <div className='flex items-center gap-4'>
        <button onClick={toggleSidebar} className='md:hidden text-gray-600 hover:text-blue-600 p-1'>
          <FaBars size={24} />
        </button>
        <Link to='/'>
          <img src={assets.logo} alt="" className="h-7"/>
        </Link>
      </div>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner
