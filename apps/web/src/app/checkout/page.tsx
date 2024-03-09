'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/lib/store';
import ProductCardCheckout from './components/ProductCardCheckout';
import AddressSelectionModal from './components/AddressSelector';
import { baseUrl } from '../utils/database';
import { toast } from 'sonner';
import CourierSelector from './components/CourierSelector';

interface IAddress {
  id: number;
  userId: number;
  cityId: string;
  name: string;
  contact: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postal_code: number;
  isPrimary: boolean;
  isDefault: boolean;
}
interface ServiceOption {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const userId = useSelector((state: RootState) => state.user.id);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courierCode, setCourierCode] = useState<string>('');
  const [destinationId, setDestinationId] = useState<string>('');
  const [originId, setOriginId] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);

  const origin = '152';

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/user-addresses/${userId}`,
      );

      setAddresses(response.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const refreshAddresses = async () => {
    fetchAddresses();
  };

  const handleSelectAddress = async (address: IAddress) => {
    setSelectedAddressId(address.id);
    setIsModalOpen(false);
    if (!address.isDefault) {
      try {
        await axios.patch(`${baseUrl}/users/default-address/${address.id}`, {
          userId,
        });
        toast.success('Address selected successfully');

        refreshAddresses();
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while select the address');
      }
    }
  };
  useEffect(() => {
    const address = addresses.find((a) => a.id === selectedAddressId);
    if (address) {
      setDestinationId(address.cityId);
      console.log('ini destination', address.cityId);
    }
  }, [selectedAddressId, addresses]);

  useEffect(() => {
    const totalWeight = cartItems.reduce(
      (total, item) => total + item.Product.weight * item.quantity,
      0,
    );
    setWeight(totalWeight);
  }, [cartItems]);
  console.log('ini total berat', weight);

  useEffect(() => {
    console.log('ini origin', origin);

    setOriginId(origin);
  }, []);

  const handleCourierSelect = (
    courierCode: string,
    serviceData: ServiceOption | null,
  ) => {
    setCourierCode(courierCode);
  };

  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId,
  );
  const fetchShippingRates = async () => {
    if (!destinationId || !courierCode || !weight) {
      toast.error(
        'Please make sure to select an address and a courier service',
      );
      return;
    }

    const requestData = {
      origin: originId,
      destination: destinationId,
      weight: weight,
      courier: courierCode,
    };
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex flex-wrap md:flex-nowrap gap-10">
        {/* Left Side: Shipping Information, Shipping Method, Cart Items */}
        <div className="flex-1 space-y-6">
          {/* Shipping Address */}
          <section className="border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
            {selectedAddress ? (
              <div className="mb-2 px-2 rounded-lg">
                <div className="flex gap-2">
                  {selectedAddress.isPrimary ? (
                    <p className="text-sm bg-teal-100 text-teal-800 font-semibold py-0.5 px-2 rounded-full">
                      Main
                    </p>
                  ) : null}
                  <p className="text-md font-bold">{selectedAddress.name}</p>
                </div>
                <p className="">
                  {selectedAddress.street}, {selectedAddress.district}
                </p>
                <p className="">
                  {selectedAddress.city}, {selectedAddress.province}
                </p>
                <p className="">{selectedAddress.postal_code}</p>
              </div>
            ) : (
              <div className="p-4 bg-teal-100 rounded-lg text-yellow-700 mb-4">
                <p>No address selected. Please choose an address.</p>
              </div>
            )}
            {/* Button to open modal for selecting an address */}
            <button
              className="text-gray-500 text-sm bg-gray-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-opacity-50 px-4 py-2 rounded-lg transition duration-300 ease-in-out"
              onClick={() => setIsModalOpen(true)}
            >
              Choose Other Address
            </button>
          </section>

          {/* Shipping Method */}
          <section className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Choose Courier</h2>
            <CourierSelector
              onCourierSelect={handleCourierSelect}
              originId={originId}
              destinationId={destinationId}
              weight={weight}
            />
          </section>

          {/* Product from Cart */}
          <section className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">BORDL Smart Home</h2>
            <ProductCardCheckout />
          </section>
        </div>

        {/* Right Side: Shipping Summary */}
        <div className="w-full md:w-96 h-fit bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Summary</h2>
          {/* Shipping summary content goes here */}
          <div className="mb-4">
            <p>Total Price (1 product)</p>
            <p>Rp 599.000</p>
          </div>
          <div className="mb-4">
            <p>Total Shipping Fee</p>
            <p>Rp 8.000</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">Shipping Total</p>
            <p>Rp 607.000</p>
          </div>
          <button className="text-white bg-teal-500 hover:bg-teal-600 w-full py-3 rounded">
            Choose Payment
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AddressSelectionModal
          isOpen={isModalOpen}
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={handleSelectAddress}
          closeModal={() => setIsModalOpen(false)}
          userId={userId}
          refreshAddresses={refreshAddresses}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
