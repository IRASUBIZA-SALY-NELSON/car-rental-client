import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCardNew from './CarCardNew'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

const FeaturedSection = () => {

    const navigate = useNavigate()
    const {cars} = useAppContext()

  return (
    <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>

        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        >
            <Title title='Featured Vehicles' subTitle='Explore our selection of premium vehicles available for your next adventure.'/>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 w-full'>
        {
            cars.length === 0 ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                    <div className="p-6 bg-gray-50 rounded-full mb-4">
                        <img src={assets.cautionIconColored} alt="" className="w-12 h-12 opacity-30" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No cars yet in the Platform ,Please check later</h3>
                    <p className="text-gray-500 max-w-sm">
                        Our fleet is currently offline. Please check back shortly for new listings.
                    </p>
                </div>
            ) : (
                cars.slice(0,6).map((car)=> (
                    <motion.div key={car._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut"  }}
                    >
                        <CarCardNew car={car}/>
                    </motion.div>
                ))
            )
        }
        </motion.div>

        {cars.length > 0 && (
            <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            onClick={()=> {
                navigate('/cars'); scrollTo(0,0)
            }}
            className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
                Explore all cars <img src={assets.arrow_icon} alt="arrow" />
            </motion.button>
        )}

    </motion.div>
  )
}

export default FeaturedSection
