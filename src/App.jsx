import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import EditCar from './pages/owner/EditCar'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const App = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
     <Toaster />
      {showLogin && <Login/>}

      {!isOwnerPath && <Navbar/>}

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/car-details/:id' element={<CarDetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
      <Route path='/owner' element={<Layout />}>
        <Route index element={<Dashboard />}/>
        <Route path="add-car" element={<AddCar />}/>
        <Route path="manage-cars" element={<ManageCars />}/>
        <Route path="edit-car/:id" element={<EditCar />}/>
        <Route path="manage-bookings" element={<ManageBookings />}/>
      </Route>
    </Routes>

    {!isOwnerPath && <Footer />}

      {/* Floating Contact Button */}
      {!isOwnerPath && (
        <motion.button
          onClick={() => setContactModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#E91E63] text-white rounded-full shadow-lg hover:bg-[#D81B60] transition-all duration-300 flex items-center justify-center group hover:scale-110"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Phone className="w-6 h-6" />
          </motion.div>

          {/* Ripple effect */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#FCE4EC] opacity-75 animate-ping"></span>
        </motion.button>
      )}

      {/* Contact Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setContactModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Contact Us</h3>
                  <button
                    onClick={() => setContactModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500 transition-colors rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Phone */}
                  <motion.a
                    href="tel:+250788888577"
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#FFF7ED] hover:bg-[#FFEDD5] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-3 bg-[#FF6F00] rounded-full">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Call us</p>
                      <p className="text-lg font-semibold text-gray-900">+250 788 888 577</p>
                    </div>
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    href="mailto:info@rodstcompany.rw"
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#FFF7ED] hover:bg-[#FFEDD5] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-3 bg-[#FF6F00] rounded-full">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Email us</p>
                      <p className="text-lg font-semibold text-gray-900">info@rodstcompany.rw</p>
                    </div>
                  </motion.a>

                  {/* Location */}
                  <motion.div
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#FFF7ED]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-3 bg-[#FF6F00] rounded-full">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Visit us</p>
                      <p className="text-lg font-semibold text-gray-900">Kigali, Rwanda</p>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="space-y-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6F00] focus:border-transparent"
                      rows={4}
                    />
                    <button
                      onClick={() => {
                        if (message.trim()) {
                          toast.success('Thank you for your message! We\'ll get back to you soon.')
                          setMessage('')
                          setContactModalOpen(false)
                        } else {
                          toast.error('Please enter a message before sending.')
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6F00] text-white rounded-lg hover:bg-[#E65C00] transition-colors font-medium"
                    >
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}

export default App
