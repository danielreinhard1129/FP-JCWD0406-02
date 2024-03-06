import React, { useState, useEffect } from 'react';
import { provinces } from '@/app/utils/databaseAddress/provinces';

interface Province {
  province_id: string;
  province: string;
}

interface ProvinceNameAutocompleteProps {
  onProvinceChange: (provinceName: string) => void;
}

const AutocompleteState: React.FC<ProvinceNameAutocompleteProps> = ({
  onProvinceChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProvinces, setFilteredProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const searchResults = searchTerm
      ? provinces.filter((province) =>
          province.province.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];
    setFilteredProvinces(searchResults);
  }, [searchTerm]);

  const handleProvinceSelect = (provinceName: string) => {
    onProvinceChange(provinceName); // Pass the province name
    setSearchTerm(provinceName); // Set the input to display the selected province name
    setFilteredProvinces([]); // Clear the filtered provinces
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search province..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {filteredProvinces.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded max-h-60 overflow-auto">
          {filteredProvinces.map((province) => (
            <li
              key={province.province_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProvinceSelect(province.province)}
            >
              {province.province}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteState;
