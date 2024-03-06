import React, { useState, useEffect } from 'react';
import { provinces } from '@/app/utils/databaseAddress/provinces';
import { postal_codes } from '@/app/utils/databaseAddress/postalCodes'; // Adjust the import path as necessary

interface Province {
  province_id: string;
  province: string;
}

interface PostalCode {
  province_id: string;
  province: string;
  postal_codes: string[];
}

interface ProvinceAutocompleteProps {
  onProvinceChange: (provinceName: string, postalCode: string) => void;
}

const ProvinceAutocomplete: React.FC<ProvinceAutocompleteProps> = ({
  onProvinceChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProvinces, setFilteredProvinces] = useState<Province[]>([]);
  const [selectedProvincePostalCodes, setSelectedProvincePostalCodes] =
    useState<string[]>([]);

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
    const selectedProvince = postal_codes.find(
      (p) => p.province === provinceName,
    );
    const postalCodesForProvince = selectedProvince
      ? selectedProvince.postal_codes
      : [];

    if (postalCodesForProvince.length > 0) {
      onProvinceChange(provinceName, postalCodesForProvince[0]); // Pass the first postal code by default
    } else {
      onProvinceChange(provinceName, ''); // If no postal codes, pass an empty string
    }

    setSearchTerm(provinceName);
    setFilteredProvinces([]);
    setSelectedProvincePostalCodes(postalCodesForProvince);
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
      {selectedProvincePostalCodes.length > 0 && (
        <select
          className="w-full p-2 border border-gray-300 rounded mt-2 flex items-center"
          onChange={(e) => onProvinceChange(searchTerm, e.target.value)}
        >
          <option value="">Select Postal Code</option>
          {selectedProvincePostalCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ProvinceAutocomplete;
