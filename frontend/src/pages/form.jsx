import React from 'react';
import { Button, Label, TextInput, Carousel, Card } from 'flowbite-react';
import axios from 'axios';
import { FaPeopleGroup } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/colorgradient.css';
import srcimg from '../images/form.jpg';

function Form() {

  const { user } = useAuthContext();

  const [details, setdetails] = React.useState({
    tripName: "",
    numberOfPeople: 1,
    cityToVisit: ""
  });

  const today = new Date().toISOString().split('T')[0];
  const [selectedDates, setSelectedDates] = React.useState({
    startDate: today,
    endDate: today,
  });

  const navigate = useNavigate();

  const redirectTopreviousplan = () => {
    navigate('/yourplans');
  };


  const username = user?.username;
  const [PlanID, setPlanId] = React.useState(null);
  const history = useNavigate();

  React.useEffect(() => {
    if (PlanID) {
      history(`/plan/${PlanID}`);
    }
  }, [PlanID, history]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:4000/api/form",
        JSON.stringify({ ...details, ...selectedDates, username }),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Form submitted successfully:", response.data);

        if (response.data && typeof response.data === 'string') {
          setPlanId(response.data);
        } else {
          console.error('Invalid plan ID received from the server:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        if (error.response) {

          console.error('Server responded with:', error.response.data);
        } else if (error.request) {
          console.error('No response received');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      })
  };



  const handleChange = (event) => {
    const { value, name } = event.target;

    setdetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleDateChange = (name, value) => {
    setSelectedDates((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  function formatDate(date) {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-[#8299d2] via-[#eda8af] to-[#ecca8c]  w-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] align-middle items-center border-black bg-white'>
        <Card className='bg-white border-none justify-center align-middle shadow-none items-center flex h-[450px] m-10'>
          <p className='text-black text-center mt-5 text-5xl font-bold' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}>Plan a Trip ✈️ </p>
          <p className='text-black text-center'>Just one step away from your new adventure !</p>
          <form>
            <div>
              <Label htmlFor="TripName" value="Trip Name" className='font-bold' style={{ 'color': '#5F2EEA', 'font': 'poppins' }} />
              <TextInput id="TripName" type="text" placeholder="Enter Trip Name" className='w-full  border border-gray-300 rounded-md text-xl shadow-lg m-2' onChange={handleChange} name='tripName' value={details?.tripName} required />
            </div>
            <div>
              <Label htmlFor="cityToVisit" value="Choose your destination" className='font-bold' style={{ 'color': '#5F2EEA', 'font': 'poppins' }} />
              <TextInput id="cityToVisit" type="text" placeholder="Enter destination" className='w-full  border border-gray-300 rounded-md text-xl shadow-lg m-2' onChange={handleChange} name='cityToVisit' value={details?.cityToVisit} required />
            </div>
            <div>
              <Label htmlFor="numberOfPeople" value="Group Size" className='font-bold' style={{ 'color': '#5F2EEA', 'font': 'poppins' }} />
              <div className="flex  justify-center align-middle items-center">
                <button className="flex items-center justify-center w-8 h-8 bg-[#e0e3e5] rounded-l-md hover:bg-gray-300" onClick={(event) => { event.preventDefault(); handleChange({ target: { name: 'numberOfPeople', value: Math.max(1, parseInt(details.numberOfPeople) - 1) } }) }}>
                  <span className='font-bold text-black'>-</span>
                </button>
                <TextInput id="groupSize" type="number" placeholder="Enter Group Size" className='w-full  border border-gray-300 rounded-md text-xl shadow-lg m-2' defaultValue={1} min={1} name='numberOfPeople' icon={FaPeopleGroup} value={details?.numberOfPeople} onChange={handleChange} required />
                <button className="flex items-center justify-center w-8 h-8 bg-[#e0e3e5] rounded-l-md hover:bg-gray-300" onClick={(event) => { event.preventDefault(); handleChange({ target: { name: 'numberOfPeople', value: parseInt(details.numberOfPeople) + 1 } }) }}>
                  <span className='font-bold text-black'>+</span>
                </button>
              </div>
            </div>
            <div className='flex justify-center w-full'>
              <div className='m-1'>
                <Label htmlFor="startDate" value="Check-in" className='font-base text-base' style={{ 'color': '#5F2EEA', 'font': 'poppins' }} />
                <input type='date' id='startDate' className='w-full border border-gray-300 text-black rounded-md text-base shadow-lg bg-white' name='startDate' value={selectedDates?.startDate ? formatDate(selectedDates.startDate) : ''} min={today} onChange={(event) => handleDateChange('startDate', event.target.value)} />
              </div>
              <div className='m-1'>
                <Label htmlFor="endDate" value="Check-out" className='font-base text-base' style={{ 'color': '#5F2EEA', 'font': 'poppins' }} />
                <input type='date' id='endDate' className='w-full border border-gray-300  text-black rounded-md text-base shadow-lg bg-white' name='endDate' value={selectedDates?.endDate ? formatDate(selectedDates.endDate) : ''} min={today} onChange={(event) => handleDateChange('endDate', event.target.value)} />
              </div>
            </div>
            <div className='w-full flex justify-center'>
              <Button type='submit' className='mx-4 mt-2 mb-2 rounded-full hover:scale-110 transition-transform duration-300 text-white ' style={{ backgroundColor: '#5F2EEA', 'font': 'poppins' }} onClick={handleSubmit}>
                Start planning
              </Button>
            </div>
            <div className='text-center block text-teal-700 hover:text-teal-900 cursor-pointer' onClick={redirectTopreviousplan}>
              Select from Previous Plans ?
            </div>
          </form>
        </Card>
        <div className='w-full h-[550px] hidden md:block'>
          <img src={srcimg} alt="" className='w-full h-full' />
        </div>
      </div>
    </div>

  );
}

export default Form;

