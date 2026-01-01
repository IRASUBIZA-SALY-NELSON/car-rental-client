import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import main_car from "./main_car.png"
import banner_car_image from "./banner_car_image.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import car_image1 from "./car_image1.png"
import car_image2 from "./car_image2.png"
import car_image3 from "./car_image3.png"
import car_image4 from "./car_image4.png"

// special imports.

import car1a from "./cars/1a.jpg";
import car1b from "./cars/1b.jpg";
import car1c from "./cars/1c.jpg";
import car1d from "./cars/1d.jpg";
import car1e from "./cars/1e.jpg";
import car1f from "./cars/1f.jpg";
import car1g from "./cars/1g.jpg";
import car2a from "./cars/2a.jpg";
import car2b from "./cars/2b.jpg";
import car2c from "./cars/2c.jpg";
import car2d from "./cars/2d.jpg";
import car3a from "./cars/3a.jpg";
import car3b from "./cars/3b.jpg";
import car3c from "./cars/3c.jpg";
import car3d from "./cars/3d.jpg";
import car3e from "./cars/3e.jpg";
import car3f from "./cars/3f.jpg";
import car3g from "./cars/3g.jpg";
import car4a from "./cars/4a.jpg";
import car4b from "./cars/4b.jpg";
import car4c from "./cars/4c.jpg";
import car4d from "./cars/4d.jpg";
import car4e from "./cars/4e.jpg";
import car5a from "./cars/5a.jpg";
import car5b from "./cars/5b.jpg";
import car5c from "./cars/5c.jpg";
import car6a from "./cars/6a.jpg";
import car6b from "./cars/6b.jpg";
import car6c from "./cars/6c.jpg";
import car6d from "./cars/6d.jpg";
import car6e from "./cars/6e.jpg";
import car6f from "./cars/6f.jpg";


export const cityList = ['Kigali', 'Musanze', 'Rubavu', 'MUhanga']

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_image4,
    car1a,
    car1b,
    car1c,
    car1d,
    car2a,
    car2b,
    car2c,
    car2d,
    car3a,
    car3b,
    car3c,
    car3d,
    car3e,
    car3f,
    car3g,
    car4a,
    car4b,
    car4c,
    car4d,
    car4e,
    car5a,
    car5b,
    car5c,
    car6a,
    car6b,
    car6c,
    car6d,
    car6e,
    car6f,
};

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "My Bookings", path: "/my-bookings" },
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add car", path: "/owner/add-car", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Cars", path: "/owner/manage-cars", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "GreatStack",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}

export const dummyCarData = [
    {
        "_id": "car1_" + Math.random().toString(36).substr(2, 9),
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Toyota",
        "model": "Land Cruiser",
        "images": [car1a, car1b, car1c, car1d],
        "year": 2022,
        "category": "SUV",
        "seating_capacity": 7,
        "fuel_type": "Diesel",
        "transmission": "Automatic",
        "pricePerDay": 250,
        "purchasePrice": 85000,
        "location": "Kigali",
        "description": "2022 Toyota Land Cruiser in excellent condition. Perfect for both city and off-road adventures.",
        "isAvailable": true,
        "createdAt": new Date().toISOString()
    },
    {
        "_id": "car2_" + Math.random().toString(36).substr(2, 9),
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Range Rover",
        "model": "Sport",
        "images": [car2a, car2b, car2c, car2d],
        "year": 2023,
        "category": "Luxury SUV",
        "seating_capacity": 5,
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "pricePerDay": 350,
        "purchasePrice": 95000,
        "location": "Kigali",
        "description": "2023 Range Rover Sport with premium features and luxurious interior.",
        "isAvailable": true,
        "createdAt": new Date().toISOString()
    },
    {
        "_id": "car3_" + Math.random().toString(36).substr(2, 9),
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Mercedes-Benz",
        "model": "GLE",
        "images": [car3a, car3b, car3c, car3d, car3e, car3f, car3g],
        "year": 2023,
        "category": "Luxury SUV",
        "seating_capacity": 5,
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "pricePerDay": 300,
        "purchasePrice": 90000,
        "location": "Kigali",
        "description": "2023 Mercedes-Benz GLE with advanced technology and premium comfort.",
        "isAvailable": true,
        "createdAt": new Date().toISOString()
    },
    {
        id: "car4_" + Math.random().toString(36).substr(2, 9),
        brand: "Audi",
        model: "A4",
        images: [car4a, car4b, car4c, car4d],
        year: 2023,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 280,
        purchasePrice: 45000,
        location: "Kigali",
        description: "2023 Audi A4 with premium features and luxurious interior.",
        isAvailable: true,
        createdAt: new Date().toISOString()
    },
    {
        id: "car5_" + Math.random().toString(36).substr(2, 9),
        brand: "Honda",
        model: "Civic",
        images: [car5a, car5b, car5c],
        year: 2023,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 150,
        purchasePrice: 25000,
        location: "Kigali",
        description: "2023 Honda Civic with excellent fuel efficiency and reliability.",
        isAvailable: true,
        createdAt: new Date().toISOString()
    },
];

export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "car": dummyCarData[0],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-13T00:00:00.000Z",
        "returnDate": "2025-06-14T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "car": dummyCarData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 130,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "car": dummyCarData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 600,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d94",
        "car": dummyCarData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]

export const dummyDashboardData = {
    "totalCars": 4,
    "totalBookings": 2,
    "pendingBookings": 0,
    "completedBookings": 2,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1]
    ],
    "monthlyRevenue": 840
}
