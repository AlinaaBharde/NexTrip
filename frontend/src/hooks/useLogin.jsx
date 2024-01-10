import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
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
                setError('An error occurred during login');
                throw Error('An error occurred during login');
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred during login');
            throw Error('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
