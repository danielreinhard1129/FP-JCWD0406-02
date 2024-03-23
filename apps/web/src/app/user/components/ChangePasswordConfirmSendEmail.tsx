import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa'; // Assuming you're using Font Awesome icons

const ChangePasswordConfirmSendEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmChangePassword = () => {
    // Simulate sending a change password request
    console.log('Password change requested.');
    setIsModalOpen(false);
    // Here, you would actually send a request to change the password
  };

  return (
    <>
      <text
        className="cursor-pointer text-teal-500 text-sm hover:text-teal-600 hover:underline font-medium rounded-lg float-right items-center justify-end"
        onClick={() => setIsModalOpen(true)}
      >
        Change Password
      </text>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-md font-semibold mb-4">Change Your Password</h2>
            <p className="text-sm">
              Are you sure you want to change your password? A password reset
              link will be sent to your email.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm text-white bg-teal-600 rounded hover:bg-teal-700"
                onClick={handleConfirmChangePassword}
              >
                Yes, Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePasswordConfirmSendEmail;
