import React from 'react';
import { Button, Label, TextInput, Datepicker, Carousel } from 'flowbite-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import userContext from '../contexts/userContext';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaPeopleGroup } from "react-icons/fa6";
import background from '../images/BG-Form.png';
import { Link } from 'react-router-dom';


function Form() {
  const [details, setdetails] = React.useState({
    tripName: "",
    GroupSize: 0,
    City : "",
    Budget: 0
  });

  const Plans = ['Kashmir trip', 'Jaipur trip', 'Mumbai trip'];

  const user = React.useContext(userContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/form', JSON.stringify(details), {
      headers: {
        'Content-Type': 'application/json',
      },
      });

      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // The request was made, but the server responded with an error
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
      // Handle the error, e.g., show an error message to the user
    }
  };

  function handleChange(event) {
    const { value, name } = event.target;

    setdetails((prevValue) => {
      if (name === "tripName") {
        return {
          tripName: value,
          City: prevValue.City,
          GroupSize: prevValue.GroupSize,
          Budget: prevValue.Budget
        };
      } else if (name === "City") {
        return {
          tripName: prevValue.tripName,
          City: value,
          GroupSize: prevValue.GroupSize,
          Budget: prevValue.Budget
        };
      } else if (name === "startDate") {
        return {
          tripName: prevValue.tripName,
          City: prevValue.City,
          GroupSize: prevValue.GroupSize,
          Budget: prevValue.Budget
        };
      }
      else if (name === "endDate") {
        return {
          tripName: prevValue.tripName,
          City: prevValue.City,
          GroupSize: prevValue.GroupSize,
          Budget: prevValue.Budget
        };
      }
      else if (name === "GroupSize") {
        return {
          tripName: prevValue.tripName,
          City: prevValue.City,
          GroupSize: value,
          Budget: prevValue.Budget
        };
      }
      else if (name === "Budget") {
        return {
          tripName: prevValue.tripName,
          City: prevValue.City,
          GroupSize: prevValue.GroupSize,
          Budget: value
        };
      }
    });
  }

  return (
    <div style={{ backgroundImage: `url(https://cdn.wallpapersafari.com/3/89/KDvmNW.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'luminosity' }} >
      
        <Navbar />
        <form className="max-w-lg mx-auto mt-20 container bg-transparent mb-48 "  >
          <div className="mb-2 block  pt-8" >
            <Label htmlFor="TripName" value="Trip Name" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="TripName" type="text" placeholder="Enter Trip Name" className='w-full  border border-gray-300 rounded-md text-xl' onChange={handleChange} name='tripName' value={details?.tripName} required  />
          <div className="mb-2 block mt-8" >
            <Label htmlFor="City" value="Destination Name" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="City" type="text" placeholder="Enter Destination(City) Name" className='w-full  border border-gray-300 rounded-md text-xl' onChange={handleChange} name='City' value={details?.City} required />
          <div className="mb-2 block mt-8">
            <Label htmlFor="groupSize" value="Group Size" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="groupSize" type="number" placeholder="Enter Group Size" className='w-full  border border-gray-300 rounded-md text-xl' defaultValue={1} min={1} name='GroupSize' icon={FaPeopleGroup} value={details?.GroupSize} onChange={handleChange} required />
          <div className="mb-2 block mt-8">
            <Label htmlFor="budget" value="Maximum Budget" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="budget" type="number" placeholder="Enter Your Maximum Budget" className='w-full  border border-gray-300 rounded-md text-xl' defaultValue={0} name='Budget' step={1000} min={0} value={details?.Budget} icon={LiaRupeeSignSolid} onChange={handleChange} required />
          <div className="block flex-wrap gap-4">
            <div className="mb-2 block mt-8">
              <Label htmlFor="startDate" value="From" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
            </div>
            <Datepicker id='startDate' className='w-full border border-gray-300 rounded-md text-xl' name='startDate'  onChange={handleChange} />
            <div className="mb-2 block">
              <Label htmlFor="endDate" value="Till" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
            </div>
            <Datepicker id='endDate' className='w-full border border-gray-300 rounded-md text-xl' name='endDate'  onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='submit' className='mx-4 mt-8 mb-8 rounded-full' style={{ backgroundColor: '#5F2EEA', 'font': 'poppins' }} onClick={handleSubmit}>
              {
                user? (
                  <Link to={'/'}>
                    Make Your own Itenary
                  </Link>
                ) : (
                  <Link to={'/auth/login'}>
                    Make Your own Itenary
                  </Link>
                )
              }
            </Button>
            <Button type='submit' className='mx-4 mt-8 mb-8 rounded-full' style={{ backgroundColor: '#5F2EEA', 'font': 'poppins' }} onClick={handleSubmit}>
            {
                user? (
                  <Link to={'/'}>
                    Let AI Make Your Itenary
                  </Link>
                ) : (
                  <Link to={'/auth/login'}>
                    Let AI Make Your Itenary
                  </Link>
                )
              }
            </Button>
          </div>
          <div className='mx-auto text-center block font-semibold text-lg underline' style={{ 'color': 'white', 'font': 'poppins' }}>{
                user? (
                  <Link to={'/'} >
                    Select from Your Previous Plans
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 pt-4 ">
                      <Carousel>
                        {
                          Plans.map((plan,index) => {
                            return (
                              <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700 dark:text-white">
                                {plan}
                              </div>
                            )
                          })
                        }
                      </Carousel>
                    </div>
                  </Link>
                ) : (
                  <Link to={'/auth/login'}>
                    Select from Your Previous Plans
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 ">
                      <Carousel>
                      {
                          Plans.map((plan,index) => {
                            return (
                              <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700 dark:text-white">
                                {plan}
                              </div>
                            )
                          })
                        }
                      </Carousel>
                    </div>
                  </Link>
                )
              }
          </div>
          
      </form>
      <Footer />
      </div>
      
    );
}

export default Form;

