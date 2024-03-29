import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonial';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/colorgradient.css';
import Carousel from '../components/Carousel';



function Home() {
  return (
    <div className='bg-[#f5f5f5] h-full w-screen'>
      <Navbar />
      <Hero />
      <Carousel />

      <Testimonials />

      <Banner />
      <Footer />


    </div>
  );
}

export default Home;