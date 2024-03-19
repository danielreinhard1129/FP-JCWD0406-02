import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import CitySelect from './CitySelect';
import ProvinceSelect from './ProvinceSelect';
import { baseUrl } from '@/app/utils/database';
import ProvinceAutocomplete from './ProvinceSelect';

interface ReduxState {
  user: {
    id: string;
  };
}

interface FormValues {
  name: string;
  contact: string;
  street: string;
  district: string;
  city: string;
  cityId: string;
  province: string;
  postal_code: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Recipient name is required'),
  contact: yup.string().required('Contact is required'),
  street: yup.string().required('Street is required'),
  district: yup.string().required('District is required'),
  cityId: yup.string().required('City is required'),
  province: yup.string().required('Province is required'),
  postal_code: yup
    .number()
    .required('Postal code is required')
    .positive()
    .integer(),
});

interface CreateUserAddressProps {
  onSuccess: () => void;
}

const CreateUserAddress: React.FC<CreateUserAddressProps> = ({ onSuccess }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userId = useSelector((state: ReduxState) => state.user.id);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      contact: '',
      street: '',
      district: '',
      city: '',
      cityId: '',
      province: '',
      postal_code: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          userId,
          postal_code: parseInt(values.postal_code, 10),
          city: values.city,
          cityId: values.cityId,
        };

        await axios.post(`${baseUrl}/users/add-address`, payload);

        console.log('ini submit', onsubmit);

        toast.success('Address added successfully');
        onSuccess();
        setIsEditModalOpen(false);
        formik.resetForm();
      } catch (error) {
        toast.error('Failed to add address');
        console.error(error);
      }
    },
  });

  const handleCitySelect = (cityId: string, cityName: string) => {
    formik.setFieldValue('city', cityName);
    formik.setFieldValue('cityId', cityId);
  };

  const handleProvinceChange = (provinceName: string) => {
    formik.setFieldValue('province', provinceName);
  };

  return (
    <div>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="bg-teal-600 text-sm text-white flex items-center font-normal text-md py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transform transition-all hover:scale-105 duration-300 z-50 "
      >
        <FaPlus className="mr-2 " /> Add Address
      </button>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <form
              className="space-y-4 max-w-2xl"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="font-bold">Add Your Address</h1>
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">Recipient Name</label>
                  <input
                    name="name"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact</label>
                  <input
                    name="contact"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Street</label>
                <textarea
                  name="street"
                  placeholder=""
                  className="w-full p-2 border border-gray-300 rounded h-20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                />
              </div>
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">District</label>
                  <input
                    name="district"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.district}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <CitySelect onCitySelect={handleCitySelect} />
                </div>
              </div>
              <div className="flex gap-5">
                <div>
                  <label className="text-sm font-medium">Province</label>
                  <ProvinceAutocomplete
                    onProvinceChange={handleProvinceChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="postal_code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kode Pos
                  </label>
                  <input
                    type="number"
                    name="postal_code"
                    id="postal_code"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postal_code}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500  p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.postal_code && formik.errors.postal_code && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.postal_code}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-white bg-gray-300 rounded-xl hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-normal text-white bg-teal-600 rounded-xl hover:bg-teal-700"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUserAddress;
