import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';

interface ServiceOption {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

interface CourierData {
  code: string;
  name: string;
  costs: ServiceOption[];
}

interface CourierSelectorProps {
  onCourierSelect: (
    courierCode: string,
    serviceData: ServiceOption | null,
  ) => void;
  originId: string;
  destinationId: string;
  weight: number;
}

const CourierSelector: React.FC<CourierSelectorProps> = ({
  onCourierSelect,
  originId,
  destinationId,
  weight,
}) => {
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null,
  );

  useEffect(() => {
    // Whenever the selected courier changes, fetch its services
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
        console.log(
          'ini rajaongkir',
          response.data.data.rajaongkir.results[0].costs,
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
    setSelectedService(null); // Reset selected service when changing courier
    setServices([]); // Clear previous services
    onCourierSelect(courier, null);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceCode = event.target.value;
    const service =
      services.find((service) => service.service === serviceCode) || null;
    setSelectedService(service);
    onCourierSelect(selectedCourier, service);
  };

  return (
    <div>
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
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select Courier</option>
        <option value="jne">JNE</option>
        <option value="pos">POS Indonesia</option>
        <option value="tiki">TIKI</option>
      </select>

      {selectedCourier && (
        <select
          id="service-select"
          value={selectedService?.service}
          onChange={handleServiceChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={services.length === 0}
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.service} value={service.service}>
              {service.description} - {service.cost[0].etd} - Rp{' '}
              {service.cost[0].value.toLocaleString('id-ID')}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CourierSelector;
