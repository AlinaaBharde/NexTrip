import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Cities from './cities.json';

export default function SearchBar() {
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
        city.name.toLowerCase().includes(value.toLowerCase())
      );

      setResult(results);
      
  }

  function handleSubmit() {
    console.log('Search submitted:', input);
  }

  return (
    <div className='w-2/3 mx-auto'>
      <div className='flex items-center mx-auto mt-24 bg-transparent'>
        <input
          id="search"
          type="text"
          placeholder=" Type to search cities..."
          className='ml-2 bg-transparent border p-2 rounded-full flex-1 focus:outline-none'
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
      <div className=' mx-auto mt-2 border-2 border-indigo-700 w-11/12 rounded-lg shadow-lg max-h-48 overflow-y-auto'>
        {result.map((res, id) => (
          <div
            className='p-2 hover:bg-indigo-100 cursor-pointer'
            key={id}
            onClick={() => handleChange(res.name)}
          >
            {res.name}
          </div>
        ))}
      </div>
    </div>
  );
}
