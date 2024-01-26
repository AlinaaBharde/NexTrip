import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import List from "../components/List";


export default function Home() {

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <SearchBar />
        {/* <Link to={'/form'} className="mt-4 " >Form</Link> */}
        <List />
        <Footer />
      </div>
    );
}