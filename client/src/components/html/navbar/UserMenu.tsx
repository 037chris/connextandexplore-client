import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../../Avatar';
import MenuItem from './MenuItem';
import { useNavigate } from 'react-router-dom';
import { useUserIDContext } from '../../../UserIDContext';
import Button from '../Button';
import { getUser, logout } from '../../../backend/boardapi';

import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineGroups2 } from "react-icons/md";
import LoginModal from './LoginModal';
const port = 443
const UserMenu: FC = () => {
  const { userID } = useUserIDContext();
  const [isOpen, setIsOpen] = useState(false);

  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await getUser(userID || "");
        setProfilePicture(currentUser.profilePicture || "");
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userID) {
      fetchUserProfile();
    }
  }, [userID]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const openAuthenticationModal = () => {
    setIsOpen(false);
    setAuthenticationModalIsOpen(true);
  };

  const onLogOut = () => {
    setIsOpen(false);
    sessionStorage.clear();
    logout();
    navigate(0)
  };

  const onCloseMenu = () => {
    setIsOpen(false);
  };


  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    // Check if the related target (where the focus is moving to) is outside the menu
    if (containerRef.current && !containerRef.current.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="relative" ref={containerRef} onBlur={onBlur} tabIndex={0}>
        {userID
          ?
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => { navigate('/create-event') }}
              className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-md
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    border-2
                    "
            >
              Event Erstellen
            </div>
            {/* <div><MdOutlineGroups2 size={25} /></div>
            <div><FaRegEnvelope size={20} /></div> */}

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
                transition
      ">
              <AiOutlineMenu />
              <div className="hidden md:block">
                {/* {profilePicture && 
                  <img
                    className="rounded-full"
                    height="30"
                    width="30"
                    loading="lazy"

                    src={`https://localhost:443/uploads/users/127b5e3f-011d-4975-b767-6d13cd0071ea-icons8-selenium-48.png`}
                    alt="Avatar"/>
                } */}
                <Avatar src="/images/placeholder.jpg" />
              </div>
            </div>
          </div>
          :
          <div className='flex flex-row gap-3'>
            <div className='w-24 md:w-32'>
              <Button outline label='Anmelden' onClick={openAuthenticationModal} />
            </div>
            <div className='w-24 md:w-32'>
              <Button primary label='Registrieren' onClick={() => navigate('/signup')} />
            </div>
          </div>
        }

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
        ">
            <div className="flex flex-col cursor-pointer" onClick={onCloseMenu}>
              <>
                <MenuItem onClick={() => navigate('/about')} label="Mein Profil" />
                <MenuItem onClick={() => navigate('/my-created-events')} label="Erstellte Events" />
                {/* <MenuItem onClick={() => { }} label="Nachrichten" /> */}
                <MenuItem onClick={() => navigate('/yourevents')} label="Meine Zusagen" />
                <MenuItem onClick={() => navigate('/settings')} label="Einstellung" />
                <MenuItem onClick={() => navigate('/help')} label="Hilfe / FAQ" />
                <hr />
                <MenuItem onClick={onLogOut} label="Logout" />
              </>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} />
      </div>

    </>
  );
};

export default UserMenu;
