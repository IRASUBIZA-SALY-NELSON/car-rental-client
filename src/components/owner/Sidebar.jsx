import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { confirmAction } from '../../utils/confirmAction';

const Sidebar = ({ isOpen, closeSidebar }) => {

    const {user, axios, fetchUser, logout} = useAppContext()
    const location = useLocation()
    const [image, setImage] = useState('')

    const updateImage = async ()=>{
        try {
          const formData = new FormData()
          formData.append('image', image)

          const {data} = await axios.post('/api/owner/update-image', formData)

          if(data.success){
            fetchUser()
            toast.success(data.message)
            setImage('')
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

  return (
    <>
        {/* Mobile Backdrop */}
        {isOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
                onClick={closeSidebar}
            />
        )}

        {/* Sidebar Container */}
        <div className={`
            fixed md:static top-0 left-0 z-30 h-full w-64 bg-white border-r border-borderColor flex flex-col items-center pt-8 text-sm transition-transform duration-300 ease-in-out px-4 overflow-y-auto
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>

            <div className='group relative'>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : user?.image ||  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"} alt="" className='h-20 w-20 rounded-full mx-auto object-cover border-2 border-gray-100'/>
                    <input type="file" id='image' accept="image/*" hidden onChange={e=> setImage(e.target.files[0])}/>

                    <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/20 rounded-full group-hover:flex items-center justify-center cursor-pointer transition-all'>
                        <img src={assets.edit_icon} alt="" className="w-6 h-6 invert brightness-0" />
                    </div>
                </label>
            </div>
            {image && (
                <button className='flex items-center gap-1.5 mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium' onClick={updateImage}>
                    Save Change <img src={assets.check_icon} width={12} alt="" />
                </button>
            )}
            <p className='mt-3 text-lg font-medium text-gray-800'>{user?.name}</p>
            <p className='text-xs text-gray-500 mb-6'>Owner Panel</p>

            <div className='w-full space-y-1'>
                {ownerMenuLinks.map((link, index)=>(
                    <NavLink
                        key={index}
                        to={link.path}
                        onClick={closeSidebar}
                        className={({ isActive }) => `
                            relative flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-all duration-200
                            ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}
                        `}
                    >
                        <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="icon" className='w-5 h-5 object-contain' />
                        <span className='text-sm'>{link.name}</span>
                        {/* Active Indicator moved to simple background style above, simplified structure */}
                    </NavLink>
                ))}
            </div>

            <div className='w-full mt-auto pb-8 pt-4 border-t border-gray-100/50'>
                <button
                    onClick={()=> confirmAction('Are you sure you want to logout?', logout)}
                    className='flex items-center gap-3 w-full py-3 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-all duration-200 group'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:text-red-600 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span className='text-sm font-medium'>Logout</span>
                </button>
            </div>
        </div>
    </>
  )
}

export default Sidebar
