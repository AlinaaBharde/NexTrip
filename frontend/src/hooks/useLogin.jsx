import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:4000/api/user/login', { email, password });

            if (response.status === 200) {
                const json = response.data;

                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
            } else {
                console.log(error);
                setError(response.data.error || 'An error occurred during login');
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
                setError('An error occurred during login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
