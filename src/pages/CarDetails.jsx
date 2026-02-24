import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { assets } from '../assets/assets';
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
  const [mode, setMode] = useState('rent'); // Always rent mode
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
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Find car from context or fallback to dummy data

  useEffect(() => {
    let foundCar = cars.find((c) => c._id === id);
    setCar(foundCar);
  }, [cars, id]);

  // Carousel auto-play and navigation is now handled by the Carousel component

  const handleRentSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!phone.trim()) {
      toast.error('Phone number is required');
      return;
    }

    if (!fullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    try {
      // Calculate pickup and return dates
      const pickupDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(pickupDate.getDate() + parseInt(rentalDuration));

      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate: pickupDate.toISOString(),
        returnDate: returnDate.toISOString(),
      });

      if (data.success) {
        toast.success(data.message || 'Booking created successfully!');
        setShowBookingModal(false);
        navigate('/my-bookings');
      } else {
        toast.error(data.message || 'Failed to create booking');
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

      <div className="w-full">
        {/* Car Image & Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
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

        {/* Book Now CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary to-primary-dull rounded-3xl p-12 text-center text-white my-12 shadow-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-4xl font-bold mb-4"
          >
            Ready to Drive Your Dream Car?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xl mb-8 opacity-90"
          >
            Book now and experience luxury and performance on the road
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingModal(true)}
            className="bg-white text-primary font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Book Now - {currency}{car.pricePerDay.toLocaleString()}/day
          </motion.button>
        </motion.div>

      {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Complete Your Booking</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleRentSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+250 7XX XXX XXX"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Kigali, Rwanda"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rental Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Rental Details</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rental Duration (days)</label>
                      <input
                        type="number"
                        value={rentalDuration}
                        onChange={(e) => setRentalDuration(e.target.value)}
                        min="1"
                        placeholder="Enter number of days"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans text-base [appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        required
                        className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600">I agree to the Terms and Conditions</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        required
                        className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600">I accept the Privacy Policy</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-dull text-white font-semibold rounded-lg hover:from-primary-dull hover:to-primary transition-all"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
