import Link from 'next/link';

export default function RegisterCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-fit">
      {/* Left Section - Full Picture */}
      <div className="hidden md:block">
        <img
          src="/register/register6.jpg"
          alt="Left Side Visual"
          className="items-center"
        />
      </div>
      {/* Right Section - Form */}
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
          <form>
            <div className="mb-4">
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
              />
            </div>
            <div className="mb-4">
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
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              />
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
            <button className="bg-[#f1eed8] hover:bg-[#b0cac1] text-gray-700 font-semibold text-sm py-2 px-4 rounded-xl w-full mb-3">
              Continue with Google
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            By clicking continue, you agree to our{' '}
            <Link href="/tos" className="text-blue-500 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/tnc" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
