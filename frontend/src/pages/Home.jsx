import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero';
// import Gallery from '../components/Gallery';
// import Checklist from '../components/Checklist';
import Testimonials from '../components/Testimonial';
// import Carousel from '../components/Carousel';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/colorgradient.css';
import Carousel from '../components/Carousel';



function Home() {
  return (
    <div className='bg-gradient-to-br from-[#A742CC] via-white to-gray-300 background-animate w-screen h-full'>
      <Navbar />
      <Hero />
      <Carousel />
      {/* <Gallery /> */}
      
      <Testimonials />
      
      <Banner />
      <Footer />
      
      
    </div>
  );
}

export default Home;