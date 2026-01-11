import { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarCardNew = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

    // Use actual car images from database if available, otherwise fallback to numbered images
    const getCarImages = (car) => {
      console.log('Full car object:', JSON.stringify(car, null, 2));
      
      // If car has images array from database, use those
      if (car.images && car.images.length > 0) {
        return car.images;
      }
      
      // Otherwise fallback to numbered images
      const carNumber = car.carNumber || '1';
      switch (carNumber) {
        case '1':
          return [assets.car1a, assets.car1b, assets.car1c, assets.car1d, assets.car1e, assets.car1f];
        case '2':
          return [assets.car2a, assets.car2b, assets.car2c, assets.car2d];
        case '3':
          return [assets.car3a, assets.car3b, assets.car3c, assets.car3d, assets.car3e, assets.car3g];
        case '4':
          return [assets.car4a, assets.car4b, assets.car4c, assets.car4e];
        case '5':
          return [assets.car5a, assets.car5b, assets.car5c];
        case '6':
          return [assets.car6a, assets.car6b, assets.car6c, assets.car6d, assets.car6e, assets.car6f];
        case '7':
          return [assets.car7a, assets.car7b, assets.car7c, assets.car7d, assets.car7e];
        case '8':
          return [assets.car8a, assets.car8b, assets.car8c, assets.car8d, assets.car8e];
        case '9':
          return [assets.car9a, assets.car9b, assets.car9c, assets.car9d];
        case '10':
          return [assets.car10a, assets.car10b, assets.car10c];
        default:
          console.warn(`No image set found for car number: ${carNumber}, using default images`);
          return [assets.car1a, assets.car1b, assets.car1c, assets.car1d, assets.car1e, assets.car1f];
      }
    };

    const images = getCarImages(car);
    console.log(`Using images for car ${car._id}:`, images);
  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        window.scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
       <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
            </SwiperSlide>
          ))}
        </Swiper>

        {car.isAvailable ? (
          <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full z-10">
            Available Now
          </span>
        ) : null}

        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs z-10">
          <div>
            Rent: <b>{currency}{car.pricePerDay}</b>/day
          </div>
          <div>
            Buy: <b>{currency}{car.purchasePrice}</b>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">
          {car.category} • {car.year}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center">
            <img src={assets.users_icon} className="h-4 mr-2" />
            {car.seating_capacity} Seats
          </div>
          <div className="flex items-center">
            <img src={assets.fuel_icon} className="h-4 mr-2" />
            {car.fuel_type}
          </div>
          <div className="flex items-center">
            <img src={assets.car_icon} className="h-4 mr-2" />
            {car.transmission}
          </div>
          <div className="flex items-center">
            <img src={assets.location_icon} className="h-4 mr-2" />
            {car.location}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/car-details/${car._id}?mode=rent`);
            }}
            className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
          >
            Rent
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/car-details/${car._id}?mode=buy`);
            }}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCardNew;
