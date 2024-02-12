import { useState } from 'react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import srcimg from '../images/newsignup.jpg';

const Signup = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, email, password);

        } catch (error) {
            console.error('Error during signup:', error);
        }
    }

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='w-screen h-screen flex bg-[#f5f5f5]'>
            <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] align-middle items-center rounded-lg'>
                <div className='w-full h-[550px] hidden md:block'>
                    <img src={srcimg} alt="" className='w-full h-full rounded-lg' />
                </div>
                <Card className="flex p-4 flex-col justify-around items-center align-middle bg-opacity-100 h-full rounded">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <h2 className='text-center text-7xl font-bold mb-8 text-black'>SIGN UP</h2>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username1" value="Your username" className='text-black' />
                            </div>
                            <TextInput id="username" value={username} type="username" placeholder="mario" required onChange={(e) => setUsername(e.target.value)} className='text-black' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" className='text-black' />
                            </div>
                            <TextInput id="email" value={email} type="email" placeholder="mario@gmail.com" required onChange={(e) => setEmail(e.target.value)} className='text-black' />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" className='text-black' />
                            </div>
                            <TextInput id="password" value={password} type="password" required onChange={(e) => setPassword(e.target.value)} className='text-black' />
                        </div>
                        <div className='text-center mb-2 p-2'>
                            <Button type="submit" disabled={isLoading} className=' bg-[#143d8e] hover:bg-[#254e9f]  p-2 mx-auto h-[40px] my-2 w-full'>Sign Up</Button>
                        </div>
                        <div className='text-center mb-2 block text-teal-700 hover:text-teal-900 cursor-pointer' onClick={redirectToLogin}>
                            Already have an account? Login
                        </div>
                        {error && (
                            <p style={{ color: 'red', textAlign: 'center' }}>{error || 'An error occurred during login'}</p>
                        )}
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Signup;

