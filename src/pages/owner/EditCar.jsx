import React, { useState, useRef, useEffect } from 'react';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { FaUpload, FaCar, FaInfoCircle, FaMoneyBillWave, FaCog, FaGasPump, FaUsers, FaMapMarkerAlt, FaAlignLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const EditCar = () => {

  const { id } = useParams();
  const { axios, currency, isOwner, navigate, fetchCars, cars } = useAppContext();

  const [mainImage, setMainImage] = useState(null)
  const [subImages, setSubImages] = useState([])
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    purchasePrice: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (!isOwner) {
      navigate('/')
      return
    }

    const fetchCarDetails = async () => {
        setIsFetching(true);
        try {
            // Check if car exists in context first
            let foundCar = cars.find(c => c._id === id);

            if (!foundCar) {
                const { data } = await axios.get(`/api/owner/cars`);
                if (data.success) {
                    foundCar = data.cars.find(c => c._id === id);
                }
            }

            if (foundCar) {
                setCar({
                    brand: foundCar.brand,
                    model: foundCar.model,
                    year: foundCar.year,
                    pricePerDay: foundCar.pricePerDay,
                    purchasePrice: foundCar.purchasePrice,
                    category: foundCar.category,
                    transmission: foundCar.transmission,
                    fuel_type: foundCar.fuel_type,
                    seating_capacity: foundCar.seating_capacity,
                    location: foundCar.location,
                    description: foundCar.description,
                });
                setMainImage(foundCar.image);
                setSubImages(foundCar.subImages || []);
            } else {
                toast.error("Car not found");
                navigate('/owner/manage-cars');
            }
        } catch (error) {
            toast.error("Failed to fetch car details");
            console.error(error);
        } finally {
            setIsFetching(false);
        }
    };

    fetchCarDetails();
  }, [id, isOwner, navigate, axios, cars])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()

      // Handle main image
      if (mainImage instanceof File) {
        formData.append('image', mainImage);
      }

      // Handle sub images
      const existingSubImages = [];
      subImages.forEach((img) => {
        if (img instanceof File) {
          formData.append('subImages', img);
        } else {
          existingSubImages.push(img);
        }
      });

      // Include existing sub-images and car ID in carData
      formData.append('carData', JSON.stringify({
        ...car,
        carId: id,
        subImages: existingSubImages
      }));

      const { data } = await axios.post('/api/owner/update-car', formData)

      if (data.success) {
        toast.success(data.message)
        fetchCars(); // Refresh global car list
        navigate('/owner/manage-cars')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
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
      toast.error('You can only have up to 5 additional images');
      return;
    }
    setSubImages([...subImages, ...files]);
  };

  const removeSubImage = (index) => {
    const newImages = subImages.filter((_, i) => i !== index);
    setSubImages(newImages);
  };

  if (isFetching) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
    <div className='px-4 pt-10 md:px-10 w-full bg-gray-50 min-h-screen pb-12'>
      <div className='w-full'>
        <Title
          title="Edit Your Car"
          subTitle="Update the details of your vehicle to keep information accurate for customers."
        />

        <form onSubmit={onSubmitHandler} className='mt-6 w-full bg-white rounded-xl shadow-sm border border-borderColor overflow-hidden'>
          {/* Header */}
          <div className='px-6 py-4 border-b border-gray-100 bg-gray-50'>
            <h2 className='text-lg font-semibold text-gray-800'>Car Information</h2>
            <p className='text-sm text-gray-500'>Update the basic details of your vehicle</p>
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
                      src={typeof mainImage === 'string' ? mainImage : URL.createObjectURL(mainImage)}
                      alt="Main car photo"
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='text-center p-4'>
                      <FaUpload className='mx-auto h-10 w-10 text-gray-400' />
                      <p className='mt-2 text-sm text-gray-600 font-medium'>Upload Main Image</p>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <p className='text-white text-sm font-medium'>Change Image</p>
                  </div>
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
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
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
                  <label className='block text-sm font-medium text-gray-700'>Daily Rate ({currency})</label>
                  <input
                    type="number"
                    required
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                    value={car.pricePerDay}
                    onChange={e => setCar({...car, pricePerDay: e.target.value})}
                  />
                </div>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Purchase Price ({currency})</label>
                  <input
                    type="number"
                    required
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                    value={car.purchasePrice}
                    onChange={e => setCar({...car, purchasePrice: e.target.value})}
                  />
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
                  <input
                    type="number"
                    required
                    className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                    value={car.seating_capacity}
                    onChange={e => setCar({...car, seating_capacity: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className='space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>Location</label>
                <select
                onChange={e => setCar({...car, location: e.target.value})}
                value={car.location}
                className='block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white'
                >
                <option value="">Select a city</option>
                <option value="Kigali">Kigali</option>
                <option value="Musanze">Musanze</option>
                <option value="Rubavu">Rubavu</option>
                <option value="Muhanga">Muhanga</option>
                <option value="Huye">Huye</option>
                <option value="Rusizi">Rusizi</option>
                <option value="Nyagatare">Nyagatare</option>
                </select>
            </div>

            <div className='space-y-1'>
              <label className='block text-sm font-medium text-gray-700'>Description</label>
              <textarea
                rows={5}
                required
                className='block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                value={car.description}
                onChange={e => setCar({...car, description: e.target.value})}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className='pt-6 border-t border-gray-200'>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                >
                  {isLoading ? 'Updating...' : 'Update Car Details'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCar;
