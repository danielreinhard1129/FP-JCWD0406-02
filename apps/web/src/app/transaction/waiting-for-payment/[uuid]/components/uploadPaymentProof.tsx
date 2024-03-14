import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { FileInput, Label } from 'flowbite-react';
import { baseUrl } from '@/app/utils/database';
import { useRouter } from 'next/navigation';

const UploadPaymentProof = (data: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const transactionId = data?.data?.id;

  const uploadPhoto = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('token_auth');
      const { data } = await axios.patch(
        `${baseUrl}/transactions/upload-payment-proof/${transactionId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onchangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConfirmation = async () => {
    setShowConfirmation(false);
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append('file', selectedFile);
      await uploadPhoto(formdata);
      setShowConfirmation(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex w-full items-center justify-center flex-col">
      <div className="mb-2 ">
        <Label htmlFor="file-upload" value="Upload file" />
      </div>
      <FileInput id="file-upload" name="file" onChange={onchangeFile} />
      {selectedFile && (
        <>
          <button
            onClick={() => setShowConfirmation(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Upload
          </button>
          {showConfirmation && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                ></span>
                &#8203;
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Confirm Upload
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to upload this photo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={handleConfirmation}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmation(false);
                        setSelectedFile(null); // Reset selected file
                      }}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UploadPaymentProof;
