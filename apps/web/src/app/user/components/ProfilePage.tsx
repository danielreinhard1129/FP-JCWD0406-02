'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfilePageComp = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const goToAddressPage = () => {
    router.push('/user/address');
  };

  return (
    <div className="flex w-full md:ml-6 lg:max-w-xl h-screen">
      {/* Main content */}
      <div className="flex-1 lg:mt-20 mt-5 lg:ml-6">
        <h1 className="text-dark-blue text-2xl mb-4 p-6 font-semibold">
          Account Detail
        </h1>
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-24">
            <h1 className="">First Name</h1>
            <h1 className="font-bold">Raget</h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-24">
            <h1>Last Name</h1>
            <h1 className="font-bold">Iwafa</h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-24">
            <h1>Username</h1>
            <h1 className="font-bold ml-1">ragetiwafa</h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-x-32">
            <h1>Email</h1>
            <h1 className="font-bold ml-2">iwaferaget@gmail.com</h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-32">
            <h1>Status</h1>
            <h1 className="font-bold">Verified</h1>
          </div>
          <div className="flex-cols md:flex items-center">
            <div className="pl-4 py-1">
              <button
                // onClick={openEditModal}
                className="bg-[#f1eed8] hover:bg-[#b0cac1] self-center text-teal text-sm font-semibold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50"
              >
                Change Profile Picture
              </button>
            </div>
            <div className="pl-4 py-1">
              <button
                onClick={openEditModal}
                className="bg-[#f1eed8] hover:bg-[#b0cac1] self-center text-teal text-sm font-semibold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl">
            <form>
              <div className="flex gap-6">
                <div>
                  <label className="font-semibold">First Name</label>
                  <input className="mb-4 shadow appearance-none border rounded-xl w-full py-2 px-3 text-dark-blue leading-tight focus:outline-none focus:ring-teal-500" />
                </div>
                <div>
                  <label className="font-semibold">Last Name</label>
                  <input className="mb-4 shadow appearance-none border rounded-xl w-full py-2 px-3 text-dark-blue leading-tight focus:outline-none focus:ring-teal-500" />
                </div>
              </div>
              <div>
                <label className="font-semibold">Username</label>
                <input className="mb-4 shadow appearance-none border rounded-xl w-full py-2 px-3 text-dark-blue leading-tight focus:outline-none focus:ring-teal-500" />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={closeEditModal}
                  className="text-white bg-red-500  py-2 px-4 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 text-white py-2 px-4 rounded-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageComp;
