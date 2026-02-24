import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';

const CarDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, currency } = useAppContext();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState(searchParams.get('mode') || 'rent'); // 'rent' or 'buy'
  // Carousel state is now managed by the Carousel component

  // Rent form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [rentalDuration, setRentalDuration] = useState('1');
  const [insuranceOption, setInsuranceOption] = useState('basic');
  const [warrantyOption, setWarrantyOption] = useState('1year');
  const [financingOption, setFinancingOption] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [billingAddress, setBillingAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Find car from context or fallback to dummy data

  useEffect(() => {
    let foundCar = cars.find((c) => c._id === id);
    if (!foundCar) {
      foundCar = dummyCarData.find((c) => c._id === id);
    }
    setCar(foundCar);
  }, [cars, id]);

  // Carousel auto-play and navigation is now handled by the Carousel component

  const handleRentSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate,
        location,
        phoneNumber: phone,
        driverLicense,
        rentalDuration,
        insuranceOption,
      });

      if (data.success) {
        toast.success(data.message || 'Booking created successfully!');
        navigate('/my-bookings');
      } else {
        toast.error(data.message || 'Failed to create booking');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Network error');
    }
  };

  const handleBuySubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/purchases/create', {
        car: id,
        fullName,
        email,
        idNumber,
        dateOfBirth,
        deliveryAddress,
        city,
        postalCode,
        country,
        location,
        phoneNumber: phone,
        alternatePhone,
        preferredDeliveryDate,
        insuranceOption,
        warrantyOption,
        financingOption,
        paymentMethod,
        billingAddress,
        termsAccepted,
        privacyAccepted,
      });

      if (data.success) {
        toast.success(data.message || 'Purchase created successfully!');
        navigate('/my-bookings'); // Or a purchases page
      } else {
        toast.error(data.message || 'Failed to create purchase');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Network error');
    }
  };

  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="back" className="rotate-180 opacity-70 h-5" />
        Back to all cars
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Car Image & Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2"
        >
          {/* Car Image Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Carousel
              images={[car.image, ...(car.subImages || [])]}
              autoPlay={true}
              interval={5000}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="space-y-8"
          >
            {/* Title & Category */}
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h1 className="text-4xl font-bold">{car.brand} {car.model}</h1>
              <p className="text-gray-500 text-xl mt-2">{car.category} • {car.year}</p>
            </motion.div>

            <hr className="border-gray-200 my-6" />

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }, index) => (
                <motion.div
                  key={text}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  className="flex flex-col items-center bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <img src={icon} alt="" className="h-6 mb-3" />
                  <span className="text-sm font-medium text-gray-700">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{car.description || 'No description available.'}</p>
            </motion.div>

            {/* Features */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['360 Camera', 'Bluetooth', 'GPS', 'Heated Seats', 'Rear View Mirror'].map((item, index) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <img src={assets.check_icon} alt="check" className="h-5 mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Booking Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={mode === 'rent' ? handleRentSubmit : handleBuySubmit}
          className="lg:sticky lg:top-24 h-max bg-white shadow-2xl rounded-3xl p-8 border border-gray-100"
        >
          {/* Mode Selection */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              type="button"
              onClick={() => setMode('rent')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'rent' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              🚗 Rent
            </button>
            <button
              type="button"
              onClick={() => setMode('buy')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'buy' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              🔑 Buy
            </button>
          </div>

          {mode === 'rent' && (
            <>
              {/* Pricing Display */}
              <div className="bg-gradient-to-r from-primary to-primary-dull rounded-2xl p-6 text-white mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">
                    {currency}{car.pricePerDay.toLocaleString()}
                  </span>
                  <span className="text-xl opacity-90">/ day</span>
                </div>
                <p className="text-white/80 text-sm">
                  Flexible rental terms available
                </p>
              </div>

              {/* Booking Steps */}
              <div className="space-y-6">
                {/* Step 1: Date Selection */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <h3 className="text-lg font-semibold text-gray-800">Select Your Dates</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span className="text-lg">📅</span> Pickup Date
                      </label>
                      <input
                        value={pickupDate}
                        onChange={(e) => {
                          const newPickupDate = e.target.value;
                          setPickupDate(newPickupDate);
                          if (returnDate && newPickupDate && newPickupDate >= returnDate) {
                            setReturnDate('');
                          }
                        }}
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white hover:bg-gray-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span className="text-lg">📅</span> Return Date
                      </label>
                      <input
                        value={returnDate}
                        onChange={(e) => {
                          const newReturnDate = e.target.value;
                          setReturnDate(newReturnDate);
                          if (pickupDate && newReturnDate && pickupDate >= newReturnDate) {
                            setReturnDate('');
                          }
                        }}
                        type="date"
                        required
                        min={pickupDate ? new Date(new Date(pickupDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white hover:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Driver Info */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <h3 className="text-lg font-semibold text-gray-800">Driver Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span className="text-lg">🪪</span> Driver's License
                      </label>
                      <input
                        value={driverLicense}
                        onChange={(e) => setDriverLicense(e.target.value)}
                        type="text"
                        placeholder="Enter your driver's license number"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white hover:bg-gray-50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <span className="text-lg">📞</span> Phone
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          placeholder="+250 7XX XXX XXX"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white hover:bg-gray-50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <span className="text-lg">📍</span> Pickup Location
                        </label>
                        <input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          type="text"
                          placeholder="e.g. Kigali, Rwanda"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white hover:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Rental Options */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <h3 className="text-lg font-semibold text-gray-800">Rental Options</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Rental Duration</label>
                    <select
                      value={rentalDuration}
                      onChange={(e) => setRentalDuration(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white hover:bg-gray-50 appearance-none cursor-pointer"
                    >
                      <option value="1">1 Day</option>
                      <option value="3">3 Days</option>
                      <option value="7">1 Week</option>
                      <option value="30">1 Month</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>🚗</span>
                  <span>Book Now</span>
                </div>
              </motion.button>

              {/* Trust Badge */}
              <div className="text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <span className="text-green-500">🔒</span>
                  No credit card required to reserve
                </p>
              </div>
            </>
          )}

          {mode === 'buy' && (
            <div className="text-center py-12">
              <div className="mb-6">
                <span className="text-6xl">🚧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Purchase Option Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                Our car purchase service is currently under development. Please use the rental option for now.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Need to buy a car?</strong> Contact our sales team directly at
                  <a href="tel:+250788123456" className="text-primary hover:underline ml-1">+250 788 123 456</a>
                </p>
              </div>
            </div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default CarDetails;
