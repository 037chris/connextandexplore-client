import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../inputs/Input';
import Button from '../Button';
import Heading from '../Heading';
import { UserRegistration } from '../../Resources';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false); // State to control the AuthenticationModal

  const openAuthenticationModal = () => {
    setIsOpen(true); // Close the UserMenu when opening the AuthenticationModal
  };



  const {
    register,
    handleSubmit,
    formState: {
        errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      email: "", 
      name: {
        first: "",
        last: ""}, 
      password: "",  
      address: {
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        country: "",
        stateOrRegion: "",
        apartmentNumber: ""
        }, 
      profilePicture: "",
      birthDate: "",
      gender: "",
      socialMediaUrls: {
        facebook: "",
        instagram: "",
      }
    }
});




 const  onSubmit:  SubmitHandler<FieldValues> = (data) => {

  setLoading(true);
  axios.post('http://localhost:3000/api/users/register', data)
      .then(() => {
        console.log(data)
        toast.success('Successfully created!');
        reset(); // Reset the form
      })
      .catch((error) => {
          toast.error('Something went wrong...');
          console.log(error);
      })
      .finally(() => {
          setLoading(false);
      })
}

// const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//   setLoading(true);

//   try {
  
//     const result = await register(data.email);  // Assuming your data structure has an 'email' field
//     console.log(result);
//     toast.success('Successfully toasted!')
//     // formRegister.reset();  // Uncomment this line if you want to reset the form

//   } catch (error) {
//     console.error(error);
//     toast.error('Something went wrong...');
//   } finally {
//     setLoading(false);
//   }
// };

  return (
    <div className='p-3 max-w-lg mx-auto  '>
      <h1 className='text-3xl text-center font-semibold mt-20 '>Register</h1>
      <Heading title='Welcome to Connect & Explore' subtitle="Create an account!" />
      
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <Input
            id="username"
            label='Username'
            disabled={loading}
            register={register}
            errors={errors}
            required
         />
        <Input
          id="email"
          label='Email'
          disabled={loading}
          register={register}
          errors={errors}
          required
          
        />
        <Input
          type='password'
          label='Password'
          id='password'
          register={register}
          errors={errors}
          required
        />

        <div className="md:flex md:gap-4">
          <div className='mb-4 md:mb-0'>
            {/* Additional fields for registration */}
            <Input
              type='text'
              label='First Name'
              id='name.first'
              register={register}
              errors={errors}
              required
              disabled={loading}
            />
          </div>
            <Input
              type='text'
              label='Last Name'
              id='name.last'
              register={register}
              errors={errors}
              required
              disabled={loading}
            />
          </div>
          {/* Address */}
        <div className="md:flex md:gap-4">
            <Input
              type='text'
              label='Street'
              id='address.street'
              register={register}
              errors={errors}
              required
              disabled={loading}
            />
       <div className='mt-4 md:mt-0'>
            <Input
              type='text'
              label='Number'
              id='address.houseNumber'
              register={register}
              errors={errors}
              required
              disabled={loading}
            />
         </div>
        </div>
        <div className="md:flex md:gap-4">
           <div className='mt-4 md:mt-0'>
              <Input
                type='text'
                label='City'
                id='address.city'
                register={register}
                errors={errors}
                required
                disabled={loading}
              />
            </div>
            <div className='mt-4 md:mt-0'>
              <Input
                type='text'
                label='Country'
                id='address.country'
                register={register}
                errors={errors}
                required
                disabled={loading}
              />
            </div>
            <div className='mt-4 md:mt-0'>
              <Input
                type='text'
                label='ZIP'
                id='postalCode'
                register={register}
                errors={errors}
                required
                disabled={loading}
              />
            </div>
        </div>
        <Input
          type='text'
          label='State'
          id='address.stateOrRegion'
          register={register}
          errors={errors}
          disabled={loading}
        />
        <Input
          type='text'
          label='Apartment Number'
          id='address.apartmentNumber'
          register={register}
          errors={errors}
          required
          disabled={loading}
        />
        <Input
          type='text'
          label='Profile Picture'
          id='profilePicture'
          register={register}
          errors={errors}
          disabled={loading}
        />
        <Input
          type='date'
          label='Birthdate'
          id='birthDate'
          register={register}
          errors={errors}
          required
          disabled={loading}
        />
        <Input
          type='checkbox'
          label='Gender'
          id='gender'
          register={register}
          errors={errors}
          required
          disabled={loading}
        />
        <Input
          type='text'
          label='Facebook URL'
          id='socialMediaUrls.facebook'
          register={register}
          errors={errors}
          disabled={loading}
        />
        <Input
          type='text'
          label='Instagram URL'
          id='socialMediaUrls.instagram'
          register={register}
          errors={errors}
          disabled={loading}
        />
        <Button 
            disabled={loading}
            label={loading ? 'Loading...' : 'Continue'}
            onClick={() => {}}
        />

      </form>
      <div className='text-neutral-500 text-center mt-4 mb-20 font-light'>
          <div className='justify-center flex flex-row items-center gap-2'>
              <div>
                  Already have an account?
              </div>
              <div
            onClick={openAuthenticationModal}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Log In
          </div>
          </div>
      </div>
     {error && <p className='text-red-500 mt-5'>{error}</p>}
     </div>
  );
}
