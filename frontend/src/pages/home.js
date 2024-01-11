import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";


export default function Home() {

    return (
      <div>
        <Navbar />
        <SearchBar />
        <Link to={'/form'} className="relative top-24 z-50" >Form</Link>
        <Footer />
      </div>
    );
}