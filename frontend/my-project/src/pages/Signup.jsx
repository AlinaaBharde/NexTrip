import { useState } from 'react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import srcimg from '../assets/image.jpg';

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
            console.error('Error during signup:', error.message);
        }
    }

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='w-screen h-screen flex'>
            <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
                <div className='w-full h-[550px] hidden md:block'>
                    <img src={srcimg} alt="" className='w-full h-full' />
                </div>
                <Card className="flex p-4 flex-col justify-around items-center">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <h2 className='text-center text-4xl font-bold mb-8'>SIGN UP</h2>
                        <div>
                            <div className="mb-2 block text-center">
                                <Label htmlFor="username1" value="Your username" />
                            </div>
                            <TextInput id="username" value={username} type="username" placeholder='mario' required onChange={(e) => setUsername(e.target.value)} className='text-black p-2' />
                        </div>
                        <div>
                            <div className="mb-2 block text-center">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput id="email" value={email} type="email" placeholder="mario@gmail.com" required onChange={(e) => setEmail(e.target.value)} className='text-black p-2' />
                        </div>
                        <div>
                            <div className="mb-2 block text-center">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password" value={password} type="password" required onChange={(e) => setPassword(e.target.value)} className='text-black p-2' />
                        </div>
                        <div className='text-center mb-2 block'>
                            <Button type="submit" disabled={isLoading} className=' bg-teal-700 hover:bg-teal-900 w-full p-2'>Submit</Button>
                        </div>
                        <div className='text-center mb-2 block'>
                            <Button onClick={redirectToLogin} className='text-teal-700 hover:text-teal-900 w-full p-2 text-center'>Already have an account? Login</Button>
                        </div>
                        {error && (
                            <p style={{ color: 'red', textAlign: 'center' }}>{error.message || 'An error occurred during login'}</p>
                        )}
                    </form>
                </Card>
            </div>
        </div >
    );
}

export default Signup;