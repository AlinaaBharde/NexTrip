import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Cities from './cities.json';

export default function SearchBar({onSearch}) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);

  function handleChange(value) {
    setInput(value);
    fetchData(value);
  }

  const fetchData = (value) => {
    const results = Cities.filter(
      (city) =>
        value &&
        city &&
        city.name.toLowerCase().includes(value)
      );

      setResult(results);
      
  }

  function handleSubmit() {
    console.log('Search submitted:', input);
    if(onSearch){
      onSearch(input);
    }
  }

  return (
  <div> 
    <div className='left-0 right-0 pt-2 h-20 top-20 z-10 bg-transparent  '>
      <div className='flex items-center max-w-md mx-auto ' >
        <input
          id="search"
          type="search"
          placeholder=" Type to search cities..."
          className='ml-2 border p-2 pl-4 rounded-full flex-1 focus:outline-none'
          onChange={(e) => handleChange(e.target.value)}
          value={input}
          required
        />
        <button
          className='ml-2 h-10 w-12 rounded-full bg-indigo-700 text-white p-2 hover:bg-indigo-800'
          onClick={handleSubmit}
        >
          <FaSearch className='mx-auto'/>
        </button>
      </div>
      <div className=' mx-auto mt-2 border-2 bg-white border-indigo-700 max-w-sm rounded-lg shadow-lg max-h-48 overflow-y-auto'>
        {result.map((res, id) => (
          <div
            className='p-2 hover:bg-indigo-100 cursor-pointer bg-transparent'
            key={id}
            onClick={() => handleChange(res.name)}
          >
            {res.name}
          </div>
        ))}
      </div>
      </div> 
    </div>
  );
}