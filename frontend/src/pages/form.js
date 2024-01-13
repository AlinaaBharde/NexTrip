import React from 'react';
import { Button, Label, TextInput, Carousel, Card } from 'flowbite-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import userContext from '../contexts/userContext';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';



function Form() {

  const [details, setdetails] = React.useState({
    tripName: "",
    numberOfPeople: 0,
    cityToVisit : "",
    budget: 0
  });

  const today = new Date().toISOString().split('T')[0];
  const [selectedDates, setSelectedDates] = React.useState({
    startDate: today,
    endDate: today,
  });


  const Plans = ['Kashmir trip', 'Jaipur trip', 'Mumbai trip'];
  const {isuserAuthenticated, username} = React.useContext(userContext);
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
      "http://localhost:8000/form",
      JSON.stringify({ ...details, ...selectedDates, username }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("Form submitted successfully:", response.data);

      // Ensure that the response.data is a valid plan ID
      if (response.data && typeof response.data === 'string') {
        setPlanId(response.data);
      } else {
        console.error('Invalid plan ID received from the server:', response.data);
      }
    })
    .catch((error)=>{
      console.error('Error submitting form:', error);
      if (error.response) {
        
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
      } 
    } )
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

      <div>
        <Navbar />
        
          <Card className="p-4 mx-auto mt-32 mb-8 md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] flex flex-col justify-around border shadow-lg">
          <h1 className=' ml-12  mx-auto font-bold text-7xl w-full' >Travel Details</h1>
        <form className="max-w-lg mx-auto container bg-transparent mb-24 "  >
          <div className="mb-2 block  pt-8" >
            <Label htmlFor="TripName" value="Trip Name" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="TripName" type="text" placeholder="Enter Trip Name" className='w-full  border border-gray-300 rounded-md text-xl shadow-lg' onChange={handleChange} name='tripName' value={details?.tripName} required  />
          <div className="mb-2 block mt-8" >
            <Label htmlFor="cityToVisit" value="Destination Name" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="City" type="text" placeholder="Enter Destination(City) Name" className='w-full  border border-gray-300 rounded-md text-xl  shadow-lg' onChange={handleChange} name='cityToVisit' value={details?.cityToVisit} required />
          <div className="mb-2 block mt-8">
            <Label htmlFor="numberOfPeople" value="Group Size" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="groupSize" type="number" placeholder="Enter Group Size" className='w-full  border border-gray-300 rounded-md text-xl shadow-lg' defaultValue={1} min={1} name='numberOfPeople' icon={FaPeopleGroup} value={details?.numberOfPeople} onChange={handleChange} required />
          <div className="mb-2 block mt-8">
            <Label htmlFor="budget" value="Maximum Budget" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
          </div>
          <TextInput id="budget" type="number" placeholder="Enter Your Maximum Budget" className='w-full  border border-gray-300 rounded-md text-xl shadow-lg' defaultValue={0} name='budget' step={1000} min={0} value={details?.budget} icon={LiaRupeeSignSolid} onChange={handleChange} required />
          <div className="block flex-wrap gap-4">
            
            <div className="mb-2 block mt-8">
              <Label htmlFor="startDate" value="From" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
            </div>
            <input type='date'  id='startDate' className='w-full border border-gray-300 rounded-md text-xl shadow-lg bg-slate-50' name='startDate' value={selectedDates?.startDate ? formatDate(selectedDates.startDate) : ''} min={today} onChange={(event) => handleDateChange('startDate', event.target.value)}/>
            <div className="mb-2 block">
              <Label htmlFor="endDate" value="Till" className='font-bold text-xl' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}/>
            </div>
            <input type='date'  id='endDate' className='w-full border border-gray-300 rounded-md text-xl shadow-lg bg-slate-50' name='endDate' value={selectedDates?.endDate ? formatDate(selectedDates.endDate) : ''} min={today} onChange={(event) => handleDateChange('endDate', event.target.value)}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                  isuserAuthenticated ? (
                    <Button  type='submit' className='mx-4 mt-8 mb-8 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg'   style={{ backgroundColor: '#5F2EEA', 'font': 'poppins' }} onClick={handleSubmit}>
                    <Link to={PlanID? `/plan/${PlanID}` : '/form'}   >
                      Make Your own Itinerary
                    </Link>
                    </Button>
                  ) : (
                    <Button  type='submit' className='mx-4 mt-8 mb-8 rounded-full hover:scale-110 transition-transform duration-300'  style={{ backgroundColor: '#5F2EEA', 'font': 'poppins' }} >
                    <Link to={'/signup'}   >
                      Make Your own Itinerary
                    </Link>
                    </Button>
                  )
                }
              
                {
                  isuserAuthenticated ? (
                    <Button  type='submit' className='mx-4 mt-8 mb-8 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg'   style={{ backgroundColor: '#5F2EEA', 'font': 'poppins' }} onClick={handleSubmit}>
                    <Link to={'/'}   >
                      Let AI Make your Itenary
                    </Link>
                    </Button>
                  ) : (
                    <Button  type='submit' className='mx-4 mt-8 mb-8 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg'  style={{ backgroundColor: '#5F2EEA', 'font': 'poppins' }} >
                    <Link to={'/signup'}   >
                      Let AI Make your Itenary
                    </Link>
                    </Button>
                  )
                }
        </div>
          <div className='mx-auto text-center block font-semibold text-lg underline' style={{ 'color': '#5F2EEA', 'font': 'poppins' }}>{
                isuserAuthenticated? (
                <>
                  <Link to={'/yourPlans'} >
                    Select from Your Previous Plans
                  </Link>
                  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 pt-4 ">
                      <Carousel className='shadow-lg'>
                        {
                          Plans.map((plan,index) => {
                            return (
                              <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700 dark:text-white shadow-lg">
                                {plan}
                              </div>
                            )
                          })
                        }
                      </Carousel>
                    </div>
                  </>
                ) : (
                  <>
                  <Link to={'/signup'} >
                    Select from Your Previous Plans
                  </Link>
                  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 pt-4 ">
                      <Carousel>
                        {
                          Plans.map((plan,index) => {
                            return (
                              <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700 dark:text-white shadow-lg">
                                {plan}
                              </div>
                            )
                          })
                        }
                      </Carousel>
                    </div>
                  </>
                )
              }
          </div>
          
      </form>
      </Card>
      <Footer />
      </div>
      
    );
}

export default Form;

