'use client';
import Image from 'next/image';
import { IAddress } from '../page';
import DeleteAddressComp from './DeleteAddress';
import EditAddressComp from './EditAddress';
import SetDefaultAddress from './SetDefaultAddress';
import CreateUserAddress from './CreateUserAddress';

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
  userId: number;
  addressData: Partial<IAddress>[];
  refreshAddresses: () => Promise<void>;
}

const AddressCardComp: React.FC<AddressCardCompProps> = ({
  userId,
  addressData,
  refreshAddresses,
}) => {
  console.log('log di carddddd adredssdasds', userId);

  const addressDataUser = addressData;

  if (!addressDataUser) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div className="w-full flex-grow px-4 ">
      {addressData.map((address) => (
        <div
          key={address.id}
          className="bg-white  p-4 my-2 flex flex-col md:flex-row justify-between items-start md:items-center rounded-xl shadow-lg z-0"
        >
          <div className="flex flex-row items-center w-full md:w-auto">
            <Image
              src="/default-address.jpeg"
              alt="Map Thumbnail"
              className="rounded-lg w-28 h-28 mr-4"
              width={100}
              height={100}
            />
            <div className="flex flex-col">
              {address.isPrimary && (
                <span className="text-xs bg-teal-200 text-teal-800 font-semibold px-2 py-1 rounded-full self-start mb-2">
                  Main Address
                </span>
              )}
              <span className="text-lg font-semibold">{address.name}</span>
              <span className="text-sm">{address.contact}</span>
              <span className="text-sm">
                {address.street}, {address.district},{' '}
                {address.City ? address.City.name : 'No City'},{' '}
                {address.province}, {address.postal_code}
              </span>
              <div className="flex mt-3">
                {' '}
                <EditAddressComp
                  address={address as IAddress}
                  onSuccess={refreshAddresses}
                />
                <DeleteAddressComp
                  isPrimary={address.isPrimary || false}
                  addressId={address.id!}
                  onSuccess={refreshAddresses}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
            {address.isPrimary || (
              <SetDefaultAddress
                userId={userId}
                addressId={address.id!}
                onSuccess={refreshAddresses}
                isPrimary={address.isPrimary || false}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressCardComp;
