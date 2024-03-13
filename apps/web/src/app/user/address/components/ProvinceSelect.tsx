import React, { useState, useEffect } from 'react';
import { provinces } from '@/app/utils/databaseAddress/provinces';
import { postal_codes } from '@/app/utils/databaseAddress/postalCodes'; // Adjust the import path as necessary

interface Province {
  province_id: string;
  province: string;
}

interface ProvinceAutocompleteProps {
  onProvinceChange: (provinceName: string) => void;
}

const ProvinceAutocomplete: React.FC<ProvinceAutocompleteProps> = ({
  onProvinceChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProvinces, setFilteredProvinces] = useState<Province[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const searchResults = provinces.filter((province) =>
        province.province.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProvinces(searchResults);
    } else {
      setFilteredProvinces([]);
    }
  }, [searchTerm]);

  const handleProvinceSelect = (provinceName: string) => {
    onProvinceChange(provinceName);
    setSearchTerm(provinceName);
    setFilteredProvinces([]);
  };

  return (
    <div className="relative flex gap-5 items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search province..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
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

export default ProvinceAutocomplete;
