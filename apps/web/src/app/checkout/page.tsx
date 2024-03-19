'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { RootState } from '@/lib/store';
import ProductCardCheckout from './components/ProductCardCheckout';
import AddressSelectionModal from './components/AddressSelector';
import { baseUrl } from '../utils/database';
import { toast } from 'sonner';
import CourierSelector from './components/CourierSelector';
import { useRouter } from 'next/navigation';

export interface ITransaction {
  userId: number;
  warehouseId: number;
  shippingCost: number;
  totalPrice: number;
}

export interface ITransactionDetail {
  productId: number;
  quantity: number;
}
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
interface IServiceOption {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

interface IWarehouse {
  id: number;
  cityId: string;
  name: string;
  warehouseId: number;
}

const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const userId = useSelector((state: RootState) => state.user.id);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closestWarehouse, setClosestWarehouse] = useState<IWarehouse | null>(
    null,
  );

  const [courierCode, setCourierCode] = useState<string>('');
  const [destinationId, setDestinationId] = useState<string>('');
  const [originId, setOriginId] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);

  const [shippingCost, setShippingCost] = useState<number>(0);
  const router = useRouter();
  const totalProductPrice = cartItems.reduce(
    (total, item) => total + item.Product.price * item.quantity,
    0,
  );
  const totalPrice = totalProductPrice + shippingCost;

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/user-addresses/${userId}`,
      );
      setAddresses(response.data.data);
      const primaryAddress = response.data.data.find(
        (a: IAddress) => a.isDefault,
      );
      if (primaryAddress) {
        fetchClosestWarehouse(userId);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [fetchAddresses, userId]);

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
        fetchClosestWarehouse(userId);
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
    }
  }, [selectedAddressId, addresses]);

  useEffect(() => {
    const totalWeight = cartItems.reduce(
      (total, item) => total + item.Product.weight * item.quantity,
      0,
    );
    setWeight(totalWeight);
  }, [cartItems]);

  useEffect(() => {
    setOriginId(origin);
  }, []);

  const handleCourierSelect = (
    courierCode: string,
    serviceData: IServiceOption | null,
  ) => {
    setCourierCode(courierCode);
  };

  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId,
  );

  const fetchClosestWarehouse = async (userId: number) => {
    try {
      const response = await axios.get(
        `${baseUrl}/transactions/closest-warehouse/${userId}`,
      );
      setClosestWarehouse(response.data.data);
      setOriginId(response.data.data.cityId);
    } catch (error) {
      toast.error('Failed to fetch the closest warehouse.');
      console.error('Error fetching the closest warehouse:', error);
    }
  };

  useEffect(() => {
    fetchClosestWarehouse(userId);
  }, [userId]);

  const handleCreateTransaction = async () => {
    if (!closestWarehouse) {
      toast.error('No closest warehouse selected.');
      return;
    }
    const warehouseId = closestWarehouse.id;

    const transactionData: ITransaction = {
      userId,
      warehouseId,
      shippingCost,
      totalPrice,
    };

    const transactionDetails: ITransactionDetail[] = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post(
        `${baseUrl}/transactions/create-transaction`,
        {
          data: transactionData,
          dataDetails: transactionDetails,
        },
      );
      toast.success('Transaction has been created successfully.');

      router.push(
        `/transaction/waiting-for-payment/${response.data.data.uuid}`,
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="container mx-auto md:mt-10 mdp-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Side: Shipping Information, Shipping Method, Cart Items */}
        <div className="md:col-span-2 space-y-2 md:space-y-4">
          {/* Shipping Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <section className=" p-6 rounded-lg  bg-white">
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
            <section className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Choose Courier</h2>
              <CourierSelector
                onShippingCostSelected={setShippingCost}
                onCourierSelect={handleCourierSelect}
                originId={originId}
                destinationId={destinationId}
                weight={weight}
              />
            </section>
          </div>
          {/* Product from Cart */}
          <section className="border p-6 rounded-lg">
            <h2 className="text-sm font-semibold ">BORDL Smart Home</h2>
            <text className="text-xs font-normal mb-1 flex gap-1">
              send from{' '}
              <p className="font-semibold text-gray-800">
                {closestWarehouse?.name}
              </p>
            </text>
            <ProductCardCheckout />
          </section>
        </div>

        <div className="md:col-span-1 ">
          {/* Right Side: Shipping Summary */}
          <div className="w-full sticky top-20 md:w-96 h-fit bg-gray-100 p-6 rounded-lg">
            <h2 className="text-md font-semibold mb-4">Shipping Summary</h2>
            {/* Shipping summary content goes here */}
            <div className="mb-4 ">
              <p>Total Product Price ({cartItems.length} products)</p>
              <p>Rp {totalProductPrice.toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <p>Total Shipping Fee</p>
              <p>Rp {shippingCost.toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold">Total Payment</p>
              <p>Rp {totalPrice.toLocaleString()}</p>
            </div>
            <button
              className="text-white bg-teal-500 hover:bg-teal-600 w-full py-3 rounded"
              onClick={handleCreateTransaction}
            >
              Checkout
            </button>
          </div>
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
