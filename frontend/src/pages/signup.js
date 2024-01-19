import { Button, Card, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import imageSrc from '../images/bg.jpeg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Signup() {
    return (
    <div >
        <Navbar />
      <div className="w-full h-screen flex">
        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
          <div className='w-full h-[550px] hidden md:block'>
            <img src={imageSrc} alt="Your Image" className='w-full h-full' />
          </div>
          <Card className="p-4 flex flex-col justify-around">
            <form>
              <div>
                <h2 className='text-4xl font-bold text-center mb-8'>SIGN IN</h2>
                <div className="mb-2 block ">
                  <Label htmlFor="name" value="Your Username" />
                </div>
                <TextInput id="name" type="text" placeholder="username" name='name' required className='border p-2 mr-2 rounded' />
                <div className="mb-2 block ">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput id="email1" type="email" placeholder="name@flowbite.com" name='email' required className='border p-2 mr-2 rounded' />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required name='password' className='border p-2 mr-2 rounded' />
              </div>
              <Button type="submit" className='w-full py-2 my-4 bg-green-600 hover:bg-green-500'>Submit</Button>

            </form>
            <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
    );
  }
   
  export default Signup;
  