import React, { FC, useState, useEffect } from 'react';
import { AiFillGithub, AiOutlineClose } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';
import Input from '../inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import toast from 'react-hot-toast';
import { getUserIDFromJWT, login } from '../../../backend/boardapi';
import Modal from '../../modals/Modal';
import Heading from '../../Heading';
import { useUserIDContext } from '../../../UserIDContext';

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

        sessionStorage.setItem('token', JSON.stringify(loginResult))
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
      <Button outline label='Schließen' onClick={onClose} />
      {/* <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={() => {}} /> */}
      <div
        className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Nutzen Sie Connect & Explore zum ersten Mal?
          </div>
          <div
            onClick={goToSignupAndCloseModal}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Account erstellen
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
        <div className='flex flex-col gap-2 bg-white'>
          <form className='flex flex-col gap-4'>
            <Heading
              title='Willkommen zurück'
              subtitle='Log dich in deinen Account ein!'
            />
            <Input
              id='email'
              label='E-Mail'
              disabled={loading}
              register={register}
              errors={errors}
              required
            />
            <Input
              type='password'
              label='Passwort'
              id='password'
              register={register}
              errors={errors}
              minLength={8}
              maxLength={20}
              required
            />
          </form>
        </div>
      }
      footer={footerContent}
      actionLabel='Weiter'
      disabled={loading}
    />
  );
};

export default LoginModal;
