import React, { useState, useRef, useEffect } from 'react';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { FaUpload, FaCar, FaInfoCircle, FaMoneyBillWave, FaCog, FaGasPump, FaUsers, FaMapMarkerAlt, FaAlignLeft } from 'react-icons/fa';

const AddCar = () => {

  const {axios, currency, isOwner, navigate} = useAppContext()

  useEffect(() => {
    if (!isOwner) {
      navigate('/')
      return
    }
  }, [isOwner, navigate])

  const [mainImage, setMainImage] = useState(null)
  const [subImages, setSubImages] = useState([])
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: [],
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()

      if (mainImage) {
        formData.append('image', mainImage);
      }

      subImages.forEach((image) => {
        formData.append('subImages', image);
      });

      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData)

      if(data.success){
        toast.success(data.message)
        setMainImage(null)
        setSubImages([])
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: [],
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  const fileInputRef = useRef(null);
  const subImagesInputRef = useRef(null);

  const handleMainImageChange = (e) => {
    if (e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (subImages.length + files.length > 5) {
      toast.error('You can only upload up to 5 additional images');
      return;
    }
    setSubImages([...subImages, ...files]);
  };

  const removeSubImage = (index) => {
    const newImages = subImages.filter((_, i) => i !== index);
    setSubImages(newImages);
  };

  return (
    <div className='px-4 pt-10 md:px-10 w-full bg-gray-50 min-h-screen pb-12'>
      <div className='w-full'>
        <Title
          title="List Your Car"
          subTitle="Fill in the details below to add your car to our rental fleet. Make sure all information is accurate to attract more customers."
        />

        <form onSubmit={onSubmitHandler} className='mt-6 w-full bg-white rounded-xl shadow-sm border border-borderColor overflow-hidden'>
          {/* Header */}
          <div className='px-6 py-4 border-b border-gray-100 bg-gray-50'>
            <h2 className='text-lg font-semibold text-gray-800'>Car Information</h2>
            <p className='text-sm text-gray-500'>Basic details about your vehicle</p>
          </div>

          <div className='p-6 space-y-8'>
            {/* Car Image Upload */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Main Image */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>Main Car Photo</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all overflow-hidden flex items-center justify-center ${mainImage ? 'border-blue-200 bg-blue-50' : 'border-gray-300 hover:border-blue-500 bg-gray-50'}`}
                >
                  {mainImage ? (
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Main car photo"
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='text-center p-4'>
                      <FaUpload className='mx-auto h-10 w-10 text-gray-400' />
                      <p className='mt-2 text-sm text-gray-600 font-medium'>Upload Main Image</p>
                      <p className='text-xs text-gray-400 mt-1'>This will be the primary photo shown to users</p>
                    </div>
                  )}
                  {mainImage && (
                    <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
                      <p className='text-white text-sm font-medium'>Change Image</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className='sr-only'
                  onChange={handleMainImageChange}
                />
              </div>

              {/* Sub Images */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>Gallery Photos (Additional 4-5 images)</label>
                <div className='grid grid-cols-3 gap-3'>
                  {subImages.map((image, index) => (
                    <div key={index} className='relative group h-24'>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Sub photo ${index + 1}`}
                        className='w-full h-full object-cover rounded-lg'
                      />
                      <button
                        type='button'
                        onClick={() => removeSubImage(index)}
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors'
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                  ))}

                  {subImages.length < 5 && (
                    <div
                      onClick={() => subImagesInputRef.current?.click()}
                      className='h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 bg-gray-50 flex flex-col items-center justify-center transition-colors'
                    >
                      <FaUpload className='h-6 w-6 text-gray-400' />
                      <span className='text-[10px] font-medium text-gray-500 mt-1'>Add Photo</span>
                    </div>
                  )}
                </div>
                <p className='text-xs text-gray-500'>Add more photos for the details section carousel</p>
                <input
                  ref={subImagesInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className='sr-only'
                  onChange={handleSubImagesChange}
                />
              </div>
            </div>

            {/* Basic Information Section */}
            <div className='space-y-6'>
              <div className='flex items-center space-x-2 text-gray-700'>
                <FaCar className='text-blue-500' />
                <h3 className='text-base font-medium'>Basic Information</h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Toyota, BMW, Mercedes"
                    required
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                    value={car.brand}
                    onChange={e => setCar({...car, brand: e.target.value})}
                  />
                </div>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Camry, X5, C-Class"
                    required
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                    value={car.model}
                    onChange={e => setCar({...car, model: e.target.value})}
                  />
                </div>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Year</label>
                  <input
                    type="number"
                    min="1900"
                    max="2099"
                    step="1"
                    placeholder="2025"
                    required
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                    value={car.year}
                    onChange={e => setCar({...car, year: e.target.value})}
                  />
                </div>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Category</label>
                  <select
                    onChange={e => setCar({...car, category: e.target.value})}
                    value={car.category}
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white'
                  >
                    <option value="">Select a category</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Pickup">Pickup Truck</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sports">Sports Car</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className='space-y-6 pt-4'>
              <div className='flex items-center space-x-2 text-gray-700'>
                <FaMoneyBillWave className='text-green-500' />
                <h3 className='text-base font-medium'>Pricing</h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Daily Rate ({currency})
                    <span className='ml-1 text-xs text-gray-500'>(required)</span>
                  </label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="100.00"
                      required
                      className='block w-full pl-7 pr-12 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                      value={car.pricePerDay}
                      onChange={e => setCar({...car, pricePerDay: e.target.value})}
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>{currency}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className='space-y-6 pt-4'>
              <div className='flex items-center space-x-2 text-gray-700'>
                <FaCog className='text-purple-500' />
                <h3 className='text-base font-medium'>Specifications</h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Transmission</label>
                  <select
                    onChange={e => setCar({...car, transmission: e.target.value})}
                    value={car.transmission}
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white'
                  >
                    <option value="">Select transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Semi-Manual">Semi-Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Fuel Type</label>
                  <select
                    onChange={e => setCar({...car, fuel_type: e.target.value})}
                    value={car.fuel_type}
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white'
                  >
                    <option value="">Select fuel type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                    <option value="LPG">LPG</option>
                    <option value="Biofuel">Biofuel</option>
                  </select>
                </div>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Seating Capacity</label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <FaUsers className='text-gray-400' />
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="4"
                      required
                      className='block w-full pl-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                      value={car.seating_capacity}
                      onChange={e => setCar({...car, seating_capacity: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className='space-y-6 pt-4'>
              <div className='flex items-center space-x-2 text-gray-700'>
                <FaMapMarkerAlt className='text-red-500' />
                <h3 className='text-base font-medium'>Available Cities</h3>
              </div>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors'>
                    <input
                      type="checkbox"
                      checked={car.location.includes('all-cities')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCar({...car, location: ['all-cities']});
                        } else {
                          setCar({...car, location: []});
                        }
                      }}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">All Cities</span>
                  </label>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {[
                    'Kigali', 'Musanze', 'Rubavu', 'Muhanga',
                    'Huye', 'Rusizi', 'Nyagatare', 'Nyabugogo',
                    'Gicumbi', 'Kirehe', 'Gatsibo', 'Kayonza'
                  ].map(city => (
                    <label key={city} className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors'>
                      <input
                        type="checkbox"
                        checked={car.location.includes(city)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCar({...car, location: [...car.location.filter(loc => loc !== 'all-cities'), city]});
                          } else {
                            setCar({...car, location: car.location.filter(loc => loc !== city)});
                          }
                        }}
                        disabled={car.location.includes('all-cities')}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary disabled:opacity-50"
                      />
                      <span className="text-sm font-medium text-gray-700">{city}</span>
                    </label>
                  ))}
                </div>

                {car.location.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Selected: {car.location.includes('all-cities') ? 'All Cities' : car.location.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className='space-y-6 pt-4'>
              <div className='flex items-center space-x-2 text-gray-700'>
                <FaAlignLeft className='text-yellow-500' />
                <h3 className='text-base font-medium'>Description</h3>
              </div>

              <div className='space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>
                  Car Description
                  <span className='ml-1 text-xs text-gray-500'>(Tell renters about your car)</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your car in detail. Include features, condition, special instructions, and anything else renters should know."
                  required
                  className='block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                  value={car.description}
                  onChange={e => setCar({...car, description: e.target.value})}
                ></textarea>
                <p className='mt-1 text-xs text-gray-500'>
                  Minimum 50 characters. Include details that make your listing stand out.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className='pt-6 border-t border-gray-200'>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                >
                  {isLoading ? (
                    <>
                      <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className='-ml-1 mr-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                      </svg>
                      List My Car
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default AddCar;
