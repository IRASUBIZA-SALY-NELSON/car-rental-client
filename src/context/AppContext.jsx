import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { dummyCarData } from '../assets/assets';
import LoadingScreen from "../components/LoadingScreen";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
console.log('🌐 Axios baseURL set to:', axios.defaults.baseURL)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let message = 'Something went wrong. Please try again.';
    if (error.response) {
        // Server responded with non-2xx code
        message = error.response.data?.message || 'Server error occurred.';
    } else if (error.request) {
        // No response received
        message = 'Network connection problem. Please check your internet.';
    } else {
        message = error.message;
    }
    error.message = message; // Update the error object's message
    return Promise.reject(error);
  }
);

export const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [cars, setCars] = useState([])
    const [appLoading, setAppLoading] = useState(true)

    // Function to check if user is logged in
    const fetchUser = async ()=>{
        try {
           const {data} = await axios.get('/api/user/data')
           if (data.success) {
            setUser(data.user)
            setIsOwner(data.user.role === 'owner')
           }else{
            navigate('/')
           }
        } catch (error) {
            // Quietly fail or handle specific errors, avoid generic toast on load
            console.error(error.message)
        }
    }

    const fetchCars = async () =>{
        try {
            console.log('🚗 Fetching cars from:', axios.defaults.baseURL + '/api/user/cars')
            const {data} = await axios.get('/api/user/cars')
            console.log('✅ Cars data received:', data)
            if (data.success) {
                setCars(data.cars)
            } else {
                console.log('❌ Backend failed, using dummy data')
                setCars(dummyCarData)
            }
        } catch (error) {
            console.error('❌ Error fetching cars, using dummy data:', error.message)
            setCars(dummyCarData)
        }
    }

    // Function to log out the user
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        navigate('/')
        toast.success('You have been logged out')
    }

    // Initialize App
    useEffect(()=>{
        const initApp = async () => {
            // Keep loading screen for at least 3 seconds (animation effect) + data fetch time
            const minLoadTime = new Promise(resolve => setTimeout(resolve, 2500));

            setAppLoading(true);
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);

            const fetchPromises = [fetchCars()];

            if (storedToken) {
                axios.defaults.headers.common['Authorization'] = storedToken;
                fetchPromises.push(fetchUser());
            }

            try {
                await Promise.all([minLoadTime, ...fetchPromises]);
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                setAppLoading(false);
            }
        };
        initApp();
    },[])

    // Separate useEffect for when token changes later (e.g. login)
    useEffect(()=>{
        if(token && !appLoading){ // Don't double fetch on init
            axios.defaults.headers.common['Authorization'] = `${token}`
             // If we just logged in (appLoading is false), fetch user
             if(!user) fetchUser();
        }
    },[token])

    const value = {
        navigate, currency, axios, user, setUser,
        token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars,
        pickupDate, setPickupDate, returnDate, setReturnDate, appLoading, setAppLoading
    }

    return (
    <AppContext.Provider value={value}>
        { appLoading ? <LoadingScreen /> : children }
    </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}
