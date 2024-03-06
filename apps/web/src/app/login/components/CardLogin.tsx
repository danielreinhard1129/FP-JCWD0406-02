'use client';

import { loginAction } from '@/lib/features/userSlice';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { UserAuth } from '@/app/utils/context/authContext';
YupPassword(yup);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empety'),
  password: yup.string().required('Password cannot be empety'),
});

const CardLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const { userGoogle, googleSignIn } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(baseUrl + '/users/login', {
          email: values.email,
          password: values.password,
        });

        dispatch(loginAction(data.data));

        localStorage.setItem('token_auth', data.token);

        toast.success('Login success');

        router.push('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          toast.error(errorMsg);
        }
      }
    },
  });

  return (
    <div className="h-fit flex md:mt-4 mt-4 justify-center">
      <div className=" max-w-md w-full bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-col items-center">
          <img
            src="/loginPic/headlogin3.jpg"
            alt="Login Visual"
            className="mb-3 "
          />
        </div>
        <button
          className="bg-[#f1eed8] hover:bg-[#b0cac1] text-teal text-sm font-normal py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 w-full mb-3"
          type="button"
          onClick={handleSignIn}
        >
          Login with Google
        </button>
        <div className="text-center">
          <hr />
          <span className="inline-block bg-white px-4 text-sm text-gray-500">
            or continue with
          </span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label
              className="block text-teal-700 text-sm font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-dark-blue leading-tight focus:outline-none focus:ring-teal-500"
              id="email"
              type="email"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-sm text-red-500 mt-2">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-2">
            <label
              className="block text-teal-700 text-sm font-semibold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-dark-blue mb-3 leading-tight focus:outline-none focus:ring-teal-500"
              id="password"
              type="password"
              placeholder="******"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-sm text-red-500 mt-2">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white w-7/12 text-sm font-normal py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-normal text-xs text-teal-600 hover:text-dark-blue"
              href="/forgot-password"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <hr className="mt-4" />
        <div className="text-center mt-4">
          <span className="text-xs text-gray-600">
            If you dont have an account,{' '}
          </span>
          <a
            href="/register"
            className="text-teal-600 hover:text-dark-blue font-semibold text-sm"
          >
            Register Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardLogin;
