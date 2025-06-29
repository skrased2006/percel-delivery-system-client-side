import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase/firebase.init';

const Login = () => {

  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || '/';



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password, auth)
      .then(result => {
        console.log(result.user)
        navigate(from, { replace: true })

      })
  };



  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md  p-8 rounded-lg ">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-green-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="text-green-500 font-medium hover:underline">
              Register
            </Link>
          </p>


          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>


        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
