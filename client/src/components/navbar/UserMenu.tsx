// UserMenu.tsx
import React, { FC, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { useNavigate } from 'react-router-dom';
import AuthenticationModal from './LoginModal';
import LoginModal from './LoginModal';

const UserMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false); // State to control the AuthenticationModal
  const navigate = useNavigate();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClick = () => {
    // Navigate to the Sign-Up page
    navigate('/signup');
  };

  const openAuthenticationModal = () => {
    setIsOpen(false); // Close the UserMenu when opening the AuthenticationModal
    setAuthenticationModalIsOpen(true);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer"
        >
          Create your event
        </div>
        <div
          onClick={toggleOpen}
          className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={openAuthenticationModal} label="Log In" />
              <MenuItem onClick={handleClick} label="Sign Up" />
            </>
          </div>
        </div>
      )}

      {/* AuthenticationModal */}
      <LoginModal isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} />
    </div>
  );
};

export default UserMenu;
