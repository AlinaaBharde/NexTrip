// Create a context in a separate file (e.g., LocationContext.js)
import { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [locationName, setLocationName] = useState('');

    return (
        <LocationContext.Provider value={{ locationName, setLocationName }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);
