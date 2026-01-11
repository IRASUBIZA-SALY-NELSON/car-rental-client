import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import LoadingScreen from '../components/LoadingScreen'

const Home = () => {

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000);
    return ()=> clearTimeout(timer)
  },[])

  if(loading){
    return <LoadingScreen />
  }

  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <Newsletter />
    </>
  )
}

export default Home
