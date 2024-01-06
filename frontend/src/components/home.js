import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Home() {
    return (
      <div>
        <Navbar />
        <Link to={'/api/form'} className="relative top-16 z-50" >Form</Link>
        <Footer />
      </div>
    );
}