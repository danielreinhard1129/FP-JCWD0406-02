'use client';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { toast } from 'sonner';
import YupPassword from 'yup-password';
import { baseUrl } from '@/app/utils/database';
import { UserAuth } from '@/app/utils/context/authContext';
YupPassword(yup);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empty'),
});

const RegisterCardInputEmail = () => {
  const router = useRouter();
  const { userGoogle, googleSignIn } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      await router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userGoogle);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('checkk value ', values);

      try {
        const response = await axios.post(
          baseUrl + '/users/create-token-register',
          {
            email: values.email,
            roleId: 3,
          },
        );

        toast.success(response.data.message);
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
        <img
          src="/register/register6.jpg"
          alt="Left Side Visual"
          className="items-center"
        />
      </div>
      {/* RIGHT SIDE */}
      <div className="flex justify-center  bg-white px-8 pt-5 md:py-24 md:px-10">
        <div className="max-w-md w-full ">
          <h2 className="md:text-3xl text-2xl font-bold text-center">
            Create an Account
          </h2>
          <p
            className="text-xs
           text-gray-600 text-center mb-2"
          >
            Enter the fields below to create your account
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
            <div className="mb-8">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Email"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-600 mt-2">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
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
              className="bg-amber-100 hover:bg-amber-200 text-gray-700 font-semibold text-sm py-2 px-4 rounded-xl w-full mb-3"
            >
              Continue with Google
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            By clicking continue, you agree to our{' '}
            <Link href="/tos" className="text-blue-500 hover:underline">
              Terms of Services
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

export default RegisterCardInputEmail;
