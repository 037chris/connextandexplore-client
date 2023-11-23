import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../inputs/Input';
import Button from '../Button';
import Heading from '../Heading';
import { UserRegistration } from '../../Resources';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signup } from '../../backend/boardapi';
import LoginModal from '../navbar/LoginModal';
import Select from '../inputs/Select';

export default function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
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




//  const  onSubmit:  SubmitHandler<FieldValues> = (data) => {

//   setLoading(true);
//   axios.post('http://localhost:3000/api/users/register', data)
//       .then(() => {
//         console.log(data)
//         toast.success('Successfully created!');
//         reset(); // Reset the form
//       })
//       .catch((error) => {
//           toast.error('Something went wrong...');
//           console.log(error);
//       })
//       .finally(() => {
//           setLoading(false);
//       })
// }

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  setLoading(true);

  try {

      const userData = {
        email: data.email,
        name: {
          first: data.name.first,
          last: data.name.last,
        },
        password: data.password,
        address: {
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          postalCode: data.address.postalCode,
          city: data.address.city,
          country: data.address.country,
          stateOrRegion: data.address.stateOrRegion || "",
          apartmentNumber: data.address.apartmentNumber || "", 
        },
        profilePicture: data.profilePicture instanceof File ? data.profilePicture : undefined,
        birthDate: data.birthDate,
        gender: data.gender,
        socialMediaUrls: {
          facebook: data.socialMediaUrls?.facebook || "", 
          instagram: data.socialMediaUrls?.instagram || "", 
        }
      } as UserRegistration;

        const user = await signup(userData); 
        console.log(user);
        toast.success('Successfully Created!')
        reset();
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong...');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold mt-20 '>Register</h1>
      <Heading title='Welcome to Connect & Explore' subtitle="Create an account!" />
      
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <Input
            id="username"
            label='Username *'
            disabled={loading}
            register={register}
            errors={errors}
            required
         />
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
        
 {/* shevamowmo rato ar awitlebs danarchen inputebs radganac sxva div shi arian? */}
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
              label='Street *'
              id='address.street'
              register={register}
              errors={errors}
              required
              disabled={loading}
              pattern={/^[A-Za-z0-9\s\-.]+$/}
            />
       <div className='mt-4 md:mt-0'>
            <Input
              type='text'
              label='Number *'
              id='address.houseNumber'
              register={register}
              errors={errors}
              required
              disabled={loading}
              pattern={/^[A-Za-z0-9\s\-/]+$/}
            />
         </div>
        </div>
        <div className="md:flex md:gap-4">
           <div className='mt-4 md:mt-0'>
              <Input
                type='text'
                label='City *'
                id='address.city'
                register={register}
                errors={errors}
                required
                disabled={loading}
                pattern={/^[A-Za-z\s-]+$/}
              />
            </div>
            <div className='mt-4 md:mt-0'>
              <Input
                type='text'
                label='Country *'
                id='address.country'
                register={register}
                errors={errors}
                required
                disabled={loading}
                pattern={/^[A-Za-z\s-]+$/}
              />
            </div>
            <div className='mt-4 md:mt-0'>
              <Input
                type='text'
                label='ZIP *'
                id='address.postalCode'
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
          disabled={loading}
        />
<Input
        type='file'
        label='Profile Picture'
        id='profilePicture'
        register={register}
        errors={errors}
        disabled={loading}
        onChange={(file) => setUploadedFileName(file ? file.name : null)} // Set uploaded file name
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
        {/* <Input
          type='text'
          label='Gender *'
          id='gender'
          register={register}
          errors={errors}
          required
          disabled={loading}
        /> */}
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

        />
        </div>
        {/* <Button 
            disabled={loading}
            label={loading ? 'Loading...' : 'Continue'}
            onClick={() => {}}

        /> */}

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
