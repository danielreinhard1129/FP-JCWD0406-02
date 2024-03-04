// CitySelect.tsx
import React, { useState, ChangeEvent } from 'react';
import { cities, ICity } from '@/app/utils/databaseAddress/city'; // Adjust the import path as necessary

interface CitySelectProps {
  onCityChange: (cityId: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ onCityChange }) => {
  const [filteredCities, setFilteredCities] = useState<ICity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredCities([]);
      return;
    }
    const filtered = cities.filter((city) =>
      city.city_name.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredCities(filtered);
  };

  const handleCitySelect = (cityId: string, cityName: string) => {
    onCityChange(cityId);
    setSearchTerm(cityName);
    setFilteredCities([]);
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
      {filteredCities.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
          {filteredCities.map((city) => (
            <li
              key={city.city_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCitySelect(city.city_id, city.city_name)}
            >
              {city.city_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelect;
