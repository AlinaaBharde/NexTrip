import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from '../images/logo.png';
import { Card, Button, Modal } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const TravelPlansList = () => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const [travelPlans, setTravelPlans] = useState([]);

    const { user } = useAuthContext();

    const fetchTravelPlans = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/yourPlans/${user.email}`);
            console.log('Response data:', response.data);
            setTravelPlans(response.data);
            console.log('Travel Plans:', travelPlans);

        } catch (error) {
            console.error('Error fetching travel plans:', error);
        }
    };


    React.useEffect(() => {
        fetchTravelPlans();
    }, [user]);


    const handleDelete = async () => {
        setOpenModal(false);
        if (deleteIndex !== null) {
            const planToDelete = travelPlans[deleteIndex];

            try {
                await axios.delete(`http://localhost:8000/api/yourPlans/${planToDelete._id}`);

                const updatedPlans = [...travelPlans];
                updatedPlans.splice(deleteIndex, 1);
                setTravelPlans(updatedPlans);
                setDeleteIndex(null);
            } catch (error) {
                console.error('Error deleting travel plan:', error);
            }
        }
    };


    return (
        <div className=' w-screen h-full bg-gradient-to-br from-cyan-100 via-white to-gray-300 background-animate'>
            <Navbar />
            <h1 className="pl-12 mt-20 pt-16 pb-4 font-bold text-7xl rounded-md shadow underline" style={{ 'backgroundColor': 'transparent', 'width': 'cover' ,'color': '#5F2EEA' }}>Your Travel Plans_______</h1>
            {travelPlans.length === 0 ? (
                <p className="pl-12 mt-12 mb-12 font-bold text-7xl w-2/3 text-indigo-700">No travel plans made.
                </p>
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

