import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../images/hero.jpg';

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent/0"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-17xl">Plan your next big trip in India.</h1>
          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Embark on a Journey of Discovery: Crafting Unforgettable Memories Across Country.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
            <Link
              to={'/form'}
              className="block w-full rounded bg-[#143d8e] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#137dc7] focus:outline-none focus:ring active:bg-rose-500 sm:w-auto hover:text-black"
            >
              Get Started
            </Link>
            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-black focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



