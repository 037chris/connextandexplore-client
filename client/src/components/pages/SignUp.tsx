import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../html/inputs/Input';
import Button from '../html/Button';
import Heading from '../Heading';
import { UserRegistration } from '../../Resources';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signup } from '../../backend/boardapi';
import Select from '../html/inputs/Select';
import LoginModal from '../html/navbar/LoginModal';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false); // State to control the AuthenticationModal
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);


  const openAuthenticationModal = () => {
    setAuthenticationModalIsOpen(true)
  };



  const {
    register,
    handleSubmit,
    formState: {
        errors,
    },
    reset
  } = useForm<FieldValues>({
});



const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  setLoading(true);

  try {
    console.log("Data:", data)
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('name.first', data.name.first);
    formData.append('name.last', data.name.last);
    formData.append('password', data.password);
    formData.append('address.city', data.address.city);
    formData.append('address.postalCode', data.address.postalCode);
    formData.append('birthDate', data.birthDate);
    formData.append('gender', data.gender);
    formData.append('socialMediaUrls.facebook', data.socialMediaUrls?.facebook || '');
    formData.append('socialMediaUrls.instagram', data.socialMediaUrls?.instagram || '');
    if (data.profilePicture !== undefined && data.profilePicture.length > 0) {
      formData.append("profilePicture", data.profilePicture[0]);
    }
    /**if (data.profilePicture instanceof File) {
      
    }*/

    await signup(formData);

    setAuthenticationModalIsOpen(true);
    toast.success('Successfully Created!');
    reset();
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong...');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='p-3 max-w-lg mx-auto pt-24 '>
      {/* <h1 className='text-3xl text-center font-titan mt-20 '>Register</h1> */}
      <Heading title='Welcome to Connect & Explore' subtitle="Create an account!" />
      
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' encType="multipart/form-data">
        <Input
          id="email"
          label="Email *"
          disabled={loading} 
          register={register}
          errors={errors}
          pattern={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
          required
        />

        <Input
          type='password'
          label='Password *'
          disabled={loading}
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
              label='First Name *'
              id='name.first'
              register={register}
              errors={errors}
              required
              disabled={loading}
              pattern={/^[A-Za-z'-\s]+$/}
            />
          </div>
            <Input
              type='text'
              label='Last Name *'
              id='name.last'
              register={register}
              errors={errors}
              required
              disabled={loading}
              pattern={/^[A-Za-z'-\s]+$/}
            />
          </div>
          {/* Address */}
        <div className="md:flex md:gap-4">
            <Input
              type='text'
              label='City *'
              id='address.city'
              register={register}
              errors={errors}
              disabled={loading}
              pattern={/^[a-zA-Z0-9_\\-\\#@.+_ äöüÄÖÜ]*$/}
              />
       <div className='mt-4 md:mt-0'>
            <Input
              type='text'
              label='ZIP *'
              id='address.postalCode'
              register={register}
              errors={errors}
              disabled={loading}
              pattern={/^[A-Za-z0-9\s\-/]+$/}
            />
         </div>
        </div>
       
        
        <Input
          type='file'
          label='Profile Picture'
          id='profilePicture'
          register={register}
          errors={errors}
          disabled={loading}
          onChange={(e)=>{}}
        />
        <Input
          type='date'
          label='Birthdate *'
          id='birthDate'
          register={register}
          errors={errors}
          required
          disabled={loading}
          pattern={/\d{4}-\d{2}-\d{2}/} 
        />
         <Select
          options={["Female", "Male", "Other"]}
          label='Gender *'
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
        <p className='text-neutral-800'>* indicates a required field.</p>
        <div className='mt-6'>
        <Button 
            disabled={loading}
            label={loading ? 'Loading...' : 'Continue'}
            onClick={() => {}}
            primary
        />
        </div>
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
      <LoginModal isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} />
     </div>

  );
}
