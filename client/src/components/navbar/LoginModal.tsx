import React, { FC, useState, useEffect } from 'react';
import { AiFillGithub, AiOutlineClose } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';
import Input from '../inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import toast from 'react-hot-toast';
import { getUserIDFromJWT, login } from '../../backend/boardapi';
import Modal from '../modals/Modal';
import Heading from '../Heading';
import { useUserIDContext } from '../../UserIDContext';

// add functionality for "enter" for loggin


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { userID, setUserID } = useUserIDContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const loginResult = await login(data.email, data.password);
  
      if (loginResult) {
        const user = getUserIDFromJWT();
  
        localStorage.setItem("user-info", JSON.stringify(loginResult));
        setUserID(user);
  
        toast.success('Successfully logged in!');
        onClose();
        navigate('/');
        reset();
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const goToSignupAndCloseModal = () => {
    onClose(); 
    navigate('/signup'); 
  };

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {}} />
      {/* <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={() => {}} /> */}
      <div
        className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            First time using Connect & Explore?
          </div>
          <div
            onClick={goToSignupAndCloseModal}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );




  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={
      <div className='flex flex-col gap-2'>
        <form className='flex flex-col gap-4'>
          <Heading
                title='Welcome back'
                subtitle='Login to your account!'
          />
          <Input
            id='email'
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
        </form>
      </div>
    }
      footer={footerContent}
      actionLabel='Continue'
      disabled={loading}
    />
  );
};

export default LoginModal;
