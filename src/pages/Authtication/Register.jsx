import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import registerImg from '../../assets/authImage.png'; // ✅ তোমার ইমেজ path অনুযায়ী
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase/firebase.init';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';

const Register = () => {
  const { createUser, userUpadateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // ✅ imageUrl ফর্মে সেট করার জন্য দরকার
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const from = location.state?.from || '/';


  // ✅ Image Upload Handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    const uploadKey = import.meta.env.VITE_image_upload_key;
    if (!uploadKey) {
      console.error("Missing image upload API key");
      alert("Missing image upload key. Please check your .env file.");
      return;
    }

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${uploadKey}`;

    try {
      setUploading(true);
      const res = await axios.post(imageUploadUrl, formData);
      const imageUrl = res.data.data.url;
      setProfilePic(imageUrl);
      setValue('imageUrl', imageUrl); // ✅ ফর্মে সেট করলাম
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Form Submit
  const onSubmit = (data) => {
    if (!data.imageUrl) {
      alert('Please wait for the image to finish uploading.');
      return;
    }

    createUser(data.email, data.password, auth)
      .then(async (result) => {
        console.log('User Created:', result.user);


        const userInfo = {
          email: data.email,
          role: 'user',
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }
        const userRes = await axiosInstance.post('/users', userInfo)
        console.log(userRes.data)

        const userProfile = {
          displayName: data.name,
          photoURL: profilePic, // ✅ spelling ঠিক রাখা খুব গুরুত্বপূর্ণ
        };

        userUpadateProfile(userProfile)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful!',
              text: 'Welcome to our platform.',
            });
          })
        navigate(from, { replace: true })
          .catch(err => {
            console.error('Profile update error:', err);
          });
      })
      .catch(err => {
        console.error('Registration error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.message,
        });
      });

  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Top Image */}
      <div className="flex justify-center mb-6">
        <img src={registerImg} alt="Register Illustration" className="w-32 h-32 object-contain" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>

      {/* Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Choose Your Profile Pic</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {uploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
          {profilePic && (
            <div className="mt-2">
              <img src={profilePic} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
            </div>
          )}
        </div>

        {/* Hidden input to hold uploaded image URL */}
        <input type="hidden" {...register('imageUrl', { required: 'Image URL is required' })} />
        {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-neutral w-full">
          Register
        </button>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
