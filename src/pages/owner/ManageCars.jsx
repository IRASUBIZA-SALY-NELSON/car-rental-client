import React, { useEffect, useState } from 'react'
import { assets} from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {

  const {isOwner, axios, currency, navigate, user} = useAppContext()

  const [cars, setCars] = useState([])

  const fetchOwnerCars = async ()=>{
    try {
      const {data} = await axios.get('/api/user/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId, carOwnerId)=>{
    try {
      // Only allow owner to modify their own cars
      if (carOwnerId !== user?._id) {
        toast.error('You can only modify your own cars')
        return
      }

      const {data} = await axios.post('/api/owner/toggle-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId, carOwnerId)=>{
    try {

      // Only allow owner to delete their own cars
      if (carOwnerId !== user?._id) {
        toast.error('You can only delete your own cars')
        return
      }

      const confirm = window.confirm('Are you sure you want to delete this car?')

      if(!confirm) return null

      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
      return
    }
    if(isOwner){
      fetchOwnerCars()
    }
  },[isOwner, navigate])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>

      <Title title="Manage Cars" subTitle="View all listed cars, update their details, or remove them from the booking platform."/>

      <div className='w-full rounded-lg shadow-sm border border-borderColor mt-6 bg-white overflow-x-auto'>

        <table className='w-full min-w-[600px] border-collapse text-left text-sm text-gray-700'>
          <thead className='bg-gray-50 text-gray-600 uppercase text-xs font-semibold'>
            <tr>
              <th className="px-6 py-4">Car Details</th>
              <th className="px-6 py-4 max-md:hidden">Category</th>
              <th className="px-6 py-4">Rent Price</th>
              <th className="px-6 py-4 max-md:hidden">Buy Price</th>
              <th className="px-6 py-4 max-md:hidden">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {cars.map((car, index)=>(
              <tr key={index} className='hover:bg-gray-50 transition-colors duration-150'>

                <td className='p-3 flex items-center gap-3'>
                  <img src={car.images && car.images.length > 0 ? car.images[0] : assets.car_image1} alt="" className="h-12 w-12 aspect-square rounded-md object-cover"/>
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} • {car.transmission}</p>
                  </div>
                </td>

                <td className='px-6 py-4 max-md:hidden'>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {car.category}
                  </span>
                </td>

                <td className='px-6 py-4 font-medium text-gray-900'>
                  {currency}{car.pricePerDay}<span className="text-gray-500 font-normal text-xs">/day</span>
                </td>

                <td className='px-6 py-4 max-md:hidden text-gray-600'>
                   {car.purchasePrice ? `${currency}${car.purchasePrice}` : '-'}
                </td>

                <td className='px-6 py-4 max-md:hidden'>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${car.isAvaliable ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${car.isAvaliable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {car.isAvaliable ? "Available" : "Unavailable" }
                  </span>
                </td>

                <td className='px-6 py-4'>
                   <div className="flex items-center gap-4">
                    <button
                      onClick={()=> toggleAvailability(car._id, car.owner)}
                      className={`p-3.5 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                        car.isAvaliable
                          ? 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                      title={car.isAvaliable ? "Mark Unavailable" : "Mark Available"}
                    >
                      <img
                        src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
                        alt=""
                        className='w-6 h-6 min-w-[24px] object-contain'
                      />
                    </button>

                    <button
                      onClick={()=> deleteCar(car._id, car.owner)}
                      className="p-3.5 rounded-xl border border-red-100 bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-red-100 hover:border-red-200"
                      title="Delete Car"
                    >
                      <img src={assets.delete_icon} alt="" className='w-6 h-6 min-w-[24px] object-contain'/>
                    </button>
                   </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default ManageCars
