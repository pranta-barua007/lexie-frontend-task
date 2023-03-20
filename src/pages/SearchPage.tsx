import React, { useState } from 'react';

import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [yearStart, setYearStart] = useState('2011');
  const [yearEnd, setYearEnd] = useState('');
  const [results, setResults] = useState([]);
  interface Result {
    data: {
      nasa_id: string;
      title: string;
      location: string;
      photographer: string;
    }[];
    links: {
      href: string;
    }[];
  }

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get('https://images-api.nasa.gov/search', {
        params: {
          q: query,
          media_type: 'image',
          year_start: yearStart,
          year_end: yearEnd,
        },
      });
      setResults(response.data.collection.items);
    } catch (error) {
      console.error(error);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="query">Search query:</label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          required
        />
        <label htmlFor="yearStart">Year start:</label>
        <input
          type="number"
          id="yearStart"
          value={yearStart}
          min={'2011'}
          max={currentYear - 1}
          onChange={(event) => setYearStart(event.target.value)}
        />
        <label htmlFor="yearEnd">Year end:</label>
        <input
          type="number"
          id="yearEnd"
          value={yearEnd}
          min={Number(yearStart) + 1}
          max={currentYear}
          onChange={(event) => setYearEnd(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((result: Result) => (
          <li key={result.data[0].nasa_id}>
            <img src={result.links[0].href} alt={result.data[0].title} />
            <p>{result.data[0].title}</p>
            <p>{result.data[0].location}</p>
            <p>{result.data[0].photographer}</p>
            <a href={`/show/${result.data[0].nasa_id}`}>Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
