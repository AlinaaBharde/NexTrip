import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Checklist from './components/Checklist';
import Testimonials from './components/Testimonials';
import Carousel from './components/Carousel';
import Banner from './components/Banner';
import Footer from './components/Footer';
import './styles/colorgradient.css';



function App() {
  return (
    <div className='bg-gradient-to-br from-[#E7D4FA] via-white to-gray-300 background-animate w-screen h-full'>
      <Navbar />
      <div className='bg-gradient-to-br from-[#A742CC] via-white to-gray-300 background-animate w-screen h-full'>
      <Hero />
      
      <Gallery />
      
      <Testimonials />
      
      <Banner />
      <Footer />
      </div>
      
    </div>
  );
}

export default App;
