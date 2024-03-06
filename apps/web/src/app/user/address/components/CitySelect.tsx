import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios'; // Make sure to install and import axios
import { baseUrl } from '@/app/utils/database';

interface ICity {
  id: string;
  name: string;
}

interface CitySelectProps {
  onCitySelect: (cityId: string, cityName: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ onCitySelect }) => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [filteredCities, setFilteredCities] = useState<ICity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCityNotFound, setIsCityNotFound] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/cities`); // Use axios and baseUrl for the request

        setCities(response.data.data); // Adjust according to your API response structure
        setIsCityNotFound(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredCities([]);
      setIsCityNotFound(false);
      return;
    }

    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(term.toLowerCase()),
    );

    setFilteredCities(filtered);
    setIsCityNotFound(filtered.length === 0);
  };

  const handleCitySelect = (cityId: string, cityName: string) => {
    onCitySelect(cityId, cityName);
    setSearchTerm(cityName);
    setFilteredCities([]);
    setIsCityNotFound(false);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search city..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {isCityNotFound && (
        <div className="text-gray-500">City does not exist</div>
      )}
      {filteredCities.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
          {filteredCities.map((city) => (
            <li
              key={city.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCitySelect(city.id, city.name)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelect;
