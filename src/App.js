import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Checklist from './components/Checklist';
import Testimonials from './components/Testimonials';
import Carousel from './components/Carousel';
import Banner from './components/Banner';
import Footer from './components/Footer';


function App() {
  return (
    <div >
      <Navbar />
      <Hero />
      <Gallery />
      
      <Testimonials />
      {/* <Carousel /> */}
      <Banner />
      <Footer />
    </div>
  );
}

export default App;
