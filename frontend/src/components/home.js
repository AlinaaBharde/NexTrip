import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Home() {

    return (
      <div>
        <Navbar />
        <Link to={'/form'} className="relative top-24 z-50" >Form</Link>
        <Footer />
      </div>
    );
}