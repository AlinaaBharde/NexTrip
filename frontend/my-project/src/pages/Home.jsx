import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home">
                <h1>Welcome to the Testing Site</h1>
                <p>This is a simple testing site with login and signup pages.</p>
            </div>
        </div>
    );
};

export default Home;
