import { useState } from 'react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import srcimg from '../assets/best.jpg';
import '../styles/colorgradient.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);

        } catch (error) {
            console.error('Error during login:', error);
        }

    }

    const redirectToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className='w-screen h-screen flex bg-[#f5f5f5]'>
            <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] align-middle items-center border-black'>
                <div className='w-full h-[550px] hidden md:block'>
                    <img src={srcimg} alt="" className='w-full h-full' />
                </div>
                <Card className="flex p-4 flex-col justify-around items-center align-middle h-full">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <h2 className='text-center text-17xl font-bold mb-8 text-black'>LOG IN</h2>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" className='text-black' />
                            </div>
                            <TextInput id="email" type="email" value={email} placeholder="mario@gmail.com" required onChange={(e) => setEmail(e.target.value)} className='text-black' />
                        </div>
                        <div className='py-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" className='text-black' />
                            </div>
                            <TextInput id="password1" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} className='text-black' />
                        </div>
                        <div className='text-center flex justify-center'>
                            <Button type="submit" disabled={isLoading} className='bg-[#143d8e] hover:bg-[#254e9f] text-center mx-auto h-[40px] w-full my-2'>Sign In</Button>
                        </div>
                        <div className='text-center mb-2 block text-teal-700 hover:text-teal-900 cursor-pointer' onClick={redirectToSignup}>
                            Don't have an account? Sign up
                        </div>
                        {error && (
                            <p style={{ color: 'red' }} className='text-center'>{error || 'An error occurred during login'}</p>
                        )}
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Login;