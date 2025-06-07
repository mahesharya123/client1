import React from 'react'
import Hero from '../Components/Hero'
import FeaturedDestination from '../Components/featuredDestination'
import Testimonial from '../Components/Testimonial'
import Services from '../Components/Services'
const Home = () => {
  return (
    <div>
        <Hero/>
       <FeaturedDestination/>
       <Services/>
       <Testimonial/>
    </div>
  )
}

export default Home