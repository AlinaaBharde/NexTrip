import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/colorgradient.css';

export default function Home() {
  return (
    <div className=" h-full w-screen  bg-gradient-to-br from-cyan-100 via-white to-gray-300 background-animate">
      <Navbar />
      <Link to={'/form'} className="relative top-48 " >Form</Link>
      <Footer />
    </div>
  )}
