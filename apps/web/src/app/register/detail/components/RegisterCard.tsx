'use client';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from 'yup';
import { toast } from 'sonner';
import YupPassword from 'yup-password';
import { baseUrl } from '@/app/utils/database';
import { UserAuth } from '@/app/utils/context/authContext';
import Image from 'next/image';
YupPassword(yup);

const validationSchema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  contact: yup.number().required('Contact is required'),
  username: yup.string().required('username cannot be empty'),
  password: yup.string().required('Password cannot be empty').min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Password cannot be empty'),
});

const RegisterCard = () => {
  const router = useRouter();
  const { userGoogle, googleSignIn } = UserAuth();
  const searchToken = useSearchParams();
  const token = searchToken.get('token');
  console.log('check token : ', token);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      await router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      contact: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          baseUrl + '/users/register-user',
          {
            email: token,
            username: values.username,
            password: values.password,
            first_name: values.first_name,
            last_name: values.last_name,
            contact: values.contact,
            roleId: 3,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('check response : ', response);

        toast.success(response.data.message);

        router.push('/login');
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          toast.error(errorMsg);
        }
      }
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-fit">
      {/* LEFT SIDE */}
      <div className="hidden md:block">
        <Image
          src="/register/register6.jpg"
          alt="Left Side Visual"
          className="items-center"
          width={100}
          height={100}
        />
      </div>
      {/* RIGHT SIDE */}
      <div className="flex justify-center  bg-white px-8  md:py-10 md:px-10">
        <div className="max-w-md w-full ">
          <h2 className="md:text-3xl text-2xl font-bold text-center">
            Create an Account
          </h2>
          <p
            className="text-xs
           text-gray-600 text-center mb-2"
          >
            Enter the fields below to complete your account
          </p>
          <div className="text-center mb-8">
            <span className="text-xs text-gray-600">
              If you have an account,{' '}
            </span>
            <Link
              href="/login"
              className="text-teal-600 hover:text-dark-blue font-semibold text-sm "
            >
              Login Here
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="first_name"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="First Name"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              {formik.errors.first_name && formik.touched.first_name && (
                <p className="text-sm text-red-600 mt-2">
                  {formik.errors.first_name}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="last_name"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Last Name"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              {formik.errors.last_name && formik.touched.last_name && (
                <p className="text-sm text-red-600 mt-2">
                  {formik.errors.last_name}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username && (
                <p className="text-sm text-red-600 mt-2">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="contact"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Contact
              </label>

              <input
                type="text"
                id="contact"
                placeholder="Contact"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.errors.contact && formik.touched.contact && (
                <p className="text-sm text-red-600 mt-2">
                  {formik.errors.contact}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p className="text-sm text-red-600 mt-2">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
            <div className="mb-2">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-normal text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center">
            <hr className="mt-4" />
            <span className="inline-block mb-4 bg-white px-4 text-xs text-gray-500">
              or
            </span>
            <button
              onClick={handleSignIn}
              className="bg-[#f1eed8] hover:bg-[#b0cac1] text-gray-700 font-semibold text-sm py-2 px-4 rounded-xl w-full mb-3"
            >
              Continue with Google
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            By clicking continue, you agree to our{' '}
            <Link href="/tos" className="text-blue-500 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/tos" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
