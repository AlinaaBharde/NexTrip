import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import logo from '../images/logo.png';
import { Card, Button, Modal } from 'flowbite-react';
import { MdDelete } from "react-icons/md";

const TravelPlansList = () => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const [travelPlans, setTravelPlans] = useState([
        {
            tripName: 'North trip',
            cityToVisit: 'Kashmir',
            numberOfPeople: 5,
            budget: 12000
        },
        {
            tripName: 'South trip',
            cityToVisit: 'Kerala',
            numberOfPeople: 4,
            budget: 15000
        },
        {
            tripName: 'East trip',
            cityToVisit: 'Kolkata',
            numberOfPeople: 6,
            budget: 13000
        }
    ]);

    const handleDelete = () => {
        setOpenModal(false);
        if (deleteIndex !== null) {
            const updatedPlans = [...travelPlans];
            updatedPlans.splice(deleteIndex, 1);
            setTravelPlans(updatedPlans);
            setDeleteIndex(null); // Reset the deleteIndex after deletion
        }
    };

    return (
        <div>
            <Navbar />
            <h1 className="ml-12 mt-24 font-bold text-7xl underline w-full" style={{ 'backgroundColor': 'white', 'width': 'cover' }}>Your Travel Plans_______</h1>
            {travelPlans.length === 0 ? (
                <p>No travel plans available.</p>
            ) : (
                <ul>
                    {travelPlans.map((plan, index) => (
                        <Card key={index} className=" w-cover ml-12 mt-6 mb-6 mb" imgSrc={logo} horizontal >
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.tripName}</h3>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Destination: {plan.cityToVisit}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Group Size: {plan.numberOfPeople}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Budget: {plan.budget}</p>
                            <Button onClick={() => { setOpenModal(true); setDeleteIndex(index); }} className="mt-2 w-10 text-white  hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#5F2EEA' }}><MdDelete /></Button>
                            <Modal show={openModal} size="md" onClose={() => { setOpenModal(false); setDeleteIndex(null); }} popup>
                                <Modal.Header />
                                <Modal.Body>
                                    <div className="text-center">
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Are you sure you want to delete this plan?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button color="failure" onClick={handleDelete}>
                                                {"Yes, I'm sure"}
                                            </Button>
                                            <Button color="gray" onClick={() => { setOpenModal(false); setDeleteIndex(null); }}>
                                                No, cancel
                                            </Button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Card>
                    ))}
                </ul>
            )}
            <Footer />
        </div>
    );
};

export default TravelPlansList;



// import  { useState, useEffect } from 'react';
// import axios from 'axios';
//   useEffect(() => {
//     const fetchTravelPlans = async () => {
//       try {
//         const response = await axios.get('http://your-api-endpoint/plans'); // Replace with your actual API endpoint
//         setTravelPlans(response.data);
//       } catch (error) {
//         console.error('Error fetching travel plans:', error);
//       }
//     };

//     fetchTravelPlans();
//   }, []);