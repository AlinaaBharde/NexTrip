import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://nextrip-api.onrender.com/api/user/signup', { username, email, password });

            if (response.status === 200) {
                const json = response.data;

                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
            } else {
                setIsLoading(false);
                setError(response.data.error || 'An error occurred during signup');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
                setError(error.response.data.error);
            } else if (error.request) {
                console.error('No response received from the server');
                setError('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
                setError('An error occurred during signup');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};

