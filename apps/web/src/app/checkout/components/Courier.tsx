import React, { useState } from 'react';

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  estimate: string;
}

interface Courier {
  services: Service[];
}

const couriers: Record<string, Courier> = {
  JNE: {
    services: [
      {
        id: 'REG',
        name: 'Regular',
        price: 8000,
        description: 'Layanan Reguler',
        estimate: '1-2 days',
      },
      {
        id: 'YES',
        name: 'Yakin Esok Sampai',
        price: 16000,
        description: 'Layanan Kilat',
        estimate: '1 days',
      },
      {
        id: 'OKE',
        name: 'Ekonomis',
        price: 16000,
        description: 'Layanan Ekonomis',
        estimate: '1 days',
      },
    ],
  },
  POS: {
    services: [
      {
        id: 'NEXT',
        name: 'Next Day',
        price: 9000,
        description: 'Layanan Kilat',
        estimate: '1 day',
      },
    ],
  },
  TIKI: {
    services: [
      {
        id: 'ONS',
        name: 'Overnight Service',
        price: 10000,
        description: 'Layanan Overnight',
        estimate: '1 day',
      },
    ],
  },
};

const CourierSelector: React.FC = () => {
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [shippingDetails, setShippingDetails] = useState<Service | null>(null);

  const handleCourierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courier = event.target.value;
    setSelectedCourier(courier);
    setSelectedService('');
    setShippingDetails(null);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = event.target.value;
    setSelectedService(serviceId);
    const courierData = couriers[selectedCourier];
    const serviceDetails = courierData.services.find(
      (service) => service.id === serviceId,
    );
    setShippingDetails(serviceDetails || null);
  };

  return (
    <div className="space-y-4">
      {/* Courier Selection Dropdown */}
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
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="" disabled>
            Select Courier
          </option>
          {Object.keys(couriers).map((courier) => (
            <option key={courier} value={courier} className="mt-40">
              {courier}
            </option>
          ))}
        </select>
      </div>

      {/* Service Selection Dropdown */}
      <div>
        <label
          htmlFor="service-select"
          className="block text-sm font-medium text-gray-700"
        >
          Choose Service
        </label>
        <select
          id="service-select"
          value={selectedService}
          onChange={handleServiceChange}
          disabled={!selectedCourier}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="" disabled>
            Select Service
          </option>
          {selectedCourier &&
            couriers[selectedCourier].services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
        </select>
      </div>

      {/* Shipping Details */}
      {shippingDetails && (
        <div
          className="p-4 border border-gray-300 rounded-md
"
        >
          <p className="font-semibold">Service: {shippingDetails.name}</p>
          <p>Price: Rp {shippingDetails.price.toLocaleString('id-ID')}</p>
          <p>Description: {shippingDetails.description}</p>
          <p>Estimated Arrival: {shippingDetails.estimate}</p>
        </div>
      )}
    </div>
  );
};

export default CourierSelector;
