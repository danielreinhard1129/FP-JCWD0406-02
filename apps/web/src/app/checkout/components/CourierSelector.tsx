import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';
import { FaTimes } from 'react-icons/fa';

interface IServiceOption {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

interface CourierSelectorProps {
  onShippingCostSelected: (cost: number) => void; // Add this line
  onCourierSelect: (
    courierCode: string,
    serviceData: IServiceOption | null,
  ) => void;
  originId: string;
  destinationId: string;
  weight: number;
}

const CourierSelector: React.FC<CourierSelectorProps> = ({
  onShippingCostSelected, // Add this line
  onCourierSelect,
  originId,
  destinationId,
  weight,
}) => {
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [services, setServices] = useState<IServiceOption[]>([]);
  const [selectedService, setSelectedService] = useState<IServiceOption | null>(
    null,
  );

  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedCourier) return;

      try {
        const requestData = {
          origin: originId,
          destination: destinationId,
          weight: weight,
          courier: selectedCourier,
        };

        const response = await axios.post(
          `${baseUrl}/users/checkongkir`,
          requestData,
        );

        setServices(response.data.data.rajaongkir.results[0].costs);
      } catch (error) {
        toast.error('Failed to retrieve shipping rates.');
        console.error('Error fetching shipping rates:', error);
      }
    };

    fetchServices();
  }, [selectedCourier, originId, destinationId, weight]);

  const handleCourierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courier = event.target.value;
    setSelectedCourier(courier);
    setSelectedService(null); // This clears the selected service
    setServices([]); // Clear services to force a new fetch
  };

  const handleServiceSelection = (service: IServiceOption) => {
    setSelectedService(service);
    onCourierSelect(selectedCourier, service);
    onShippingCostSelected(service.cost[0].value);
  };

  return (
    <div>
      <div className="md:flex w-full gap-5 space-y-3">
        <div className="w-fit">
          <label
            htmlFor="courier-select"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Courier
          </label>
          <select
            id="courier-select"
            value={selectedCourier}
            onChange={handleCourierChange}
            className="mt-1 block h-fit w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Courier</option>
            <option value="jne">JNE</option>
            <option value="pos">POS</option>
            <option value="tiki">TIKI</option>
          </select>
        </div>
        <div className="w-full">
          {selectedService ? (
            <div className="flex justify-between items-center border p-4 rounded-md bg-teal-100 mb-4">
              <div>
                <div className="font-medium text-sm">
                  {selectedService.description}
                </div>
                <div className="text-sm">
                  Rp {selectedService.cost[0].value.toLocaleString('id-ID')}
                </div>
                <div className="text-xs text-gray-600">
                  Estimated {selectedService.cost[0].etd} days
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="flex items-center text-xs text-gray-500 hover:text-gray-700"
              >
                Remove
              </button>
            </div>
          ) : (
            selectedCourier &&
            services.map((service: IServiceOption) => (
              <div
                key={service.service}
                className={`p-1 px-4 border w-full border-gray-300 rounded-md mb-1 cursor-pointer ${
                  selectedService === service.service ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleServiceSelection(service)}
              >
                <div className="items-center">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-wrap">
                      {service.description}
                    </span>
                    <span className="text-sm font-semibold">
                      Rp {service.cost[0].value.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 items-center">
                    Estimated {service.cost[0].etd.replace('HARI', '').trim()}{' '}
                    days
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourierSelector;
