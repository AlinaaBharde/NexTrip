import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, Button, Modal } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import srcimg1 from "../images/travel1.jpg"
import srcimg2 from "../images/travel2.jpg"
import srcimg3 from "../images/travel3.jpg"
import srcimg4 from "../images/travel4.jpg"
import srcimg5 from "../images/travel5.jpg"
import srcimg6 from "../images/travel6.jpg"
import srcimg7 from "../images/travel7.jpg"
import srcimg8 from "../images/travel8.jpg"
import srcimg9 from "../images/travel9.jpg"
import srcimg10 from "../images/travel10.jpg"
import { Link } from "react-router-dom";

const imgarray = [
    srcimg1,
    srcimg2,
    srcimg3,
    srcimg4,
    srcimg5,
    srcimg6,
    srcimg7,
    srcimg8,
    srcimg9,
    srcimg10
]

const TravelPlansList = () => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [travelPlans, setTravelPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();

    const fetchTravelPlans = async () => {
        try {
            setLoading(true);
            const authToken = user.token;
            const response = await axios.get(`https://nextrip-api.onrender.com/api/yourPlans/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setTravelPlans(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching travel plans:', error);
        }
    };

    useEffect(() => {
        if (loading) {
            fetchTravelPlans();
        }
    }, [user, loading]);

    const handleDelete = async () => {
        setOpenModal(false);
        if (deleteIndex !== null) {
            const planToDelete = travelPlans[deleteIndex];
            try {
                setLoading(true);
                await axios.delete(`https://nextrip-api.onrender.com/api/yourPlans/${planToDelete._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                const updatedPlans = travelPlans.filter((_, index) => index !== deleteIndex);
                setTravelPlans(updatedPlans);
                setDeleteIndex(null);
                setLoading(false);
            } catch (error) {
                console.error('Error deleting travel plan:', error);
            }
        }
    };

    return (
        <div className='w-screen h-full bg-[#f5f5f5]'>
            <div className="w-full">
                <Navbar />
            </div>
            <hr />
            <h1 className="pl-6 pt-16 pb-4 font-bold text-7xl rounded-md shadow text-center text-blue-500">Saved Plans 🧳</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                {!travelPlans || travelPlans.length === 0 ? (
                    <p className="pl-12 mt-12 mb-12 font-bold text-7xl w-2/3 text-indigo-700">No travel plans made.</p>
                ) : (
                    travelPlans.map((plan, index) => (
                        <Card key={index} className="bg-white shadow-lg rounded-md p-1">
                            <div className="flex justify-between">
                                <h3 className="text-base font-bold text-gray-900">{plan.tripName}</h3>
                                <Button onClick={() => { setOpenModal(true); setDeleteIndex(index); }} className="text-white hover:scale-110 transition-transform duration-300 bg-red-500"><MdDelete className="w-[10px] h-[10px]" /></Button>
                            </div>
                            <div className="justify-center align-middle items-center flex">
                                <img src={imgarray[index % imgarray.length]} alt="image" className="h-auto max-w-xs rounded-md" />
                            </div>
                            <p className="text-gray-700  font-bold text-center">Destination: {plan.cityToVisit}</p>
                            <p className="text-gray-700  text-center">Group Size: {plan.numberOfPeople}</p>
                            <div className="flex justify-end">
                                <Button className="text-white font-bold hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#5F2EEA' }}><Link to={`/yourplan/${plan._id}`} className="text-white">Edit</Link></Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            <Modal show={openModal} size="md" onClose={() => { setOpenModal(false); setDeleteIndex(null); }} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            Are you sure you want to delete this plan?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => { setOpenModal(false); setDeleteIndex(null); }}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Footer />
        </div>
    );
};

export default TravelPlansList;


