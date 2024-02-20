'use client';
import Image from 'next/image';
import { IAddress } from '../page';
import CreateAddress from './CreateAddress';
import DeleteAddressComp from './DeleteAddress';

export interface IUser {
  user: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  contact: string;
  roleId: number;
  isDeleted: boolean;
  isVerified: boolean;
  profile_picture: string;
  created_at: Date;
  updatedAt: Date;
  userAddress_id: number;
}

interface AddressCardCompProps {
  addressData: Partial<IAddress>[];
}

const AddressCardComp: React.FC<AddressCardCompProps> = ({ addressData }) => {
  console.log('log di carddddd adredssdasds', addressData);

  const addressDataUser = addressData;

  if (!addressDataUser) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex justify-between border-b-2 items-center w-full p-4 md:py-6">
        <h2 className="text-2xl font-semibold">Address</h2>
        <CreateAddress />
      </div>
      <div className="w-full flex-grow">
        {addressData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <Image
              src="/address/address1.png"
              alt="No Address"
              width={400}
              height={400}
              objectFit="contain"
              className="mb-4"
            />
            <h1>Gotcha! You dont have any address yet</h1>
            <h1>Please add at least one address</h1>
          </div>
        ) : (
          <div className="w-full flex-grow md:p-4">
            {addressData.map((address) => (
              <div
                key={address.id}
                className="border px-4 py-2 my-2 md:flex justify-between w-full items-center rounded-lg"
              >
                <div>
                  <div className="text-md font-semibold">{address.name}</div>
                  <div className="text-sm">{address.contact}</div>
                  <div className="text-sm">
                    {`${address.street}, ${address.distric}, ${address.city}, ${address.province}, ${address.postal_code}`}
                  </div>
                </div>
                <div className="space-y-1 mt-3">
                  <div className="flex">
                    {/* Placeholder for Edit functionality */}
                    <button className="bg-transparent w-full mr-1 hover:bg-teal-700 text-teal-600 font-normal text-xs hover:text-white py-1 px-4 border hover:border-transparent rounded-lg">
                      Edit
                    </button>
                    <DeleteAddressComp addressId={address.id!} />
                  </div>
                  <button className="bg-teal-500 hover:bg-teal-700 text-white w-full text-xs font-normal py-2 px-4 rounded-lg">
                    Set as Default
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCardComp;
