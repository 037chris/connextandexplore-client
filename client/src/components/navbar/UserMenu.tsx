import React, { FC, useCallback, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useUserIDContext } from '../../UserIDContext';
import Button from '../Button';
import { getUser, logout } from '../../backend/boardapi';

import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineGroups2 } from "react-icons/md";


// '../../../../../connectandexplore-1/Backend/dist/src/utils/'

// on mouseClick close menu

const UserMenu: FC = () => {
  const { userID } = useUserIDContext();

  // const [profilePicture, setProfilePicture] = useState("")

  const [isOpen, setIsOpen] = useState(false);
  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false); // State to control the AuthenticationModal
  const navigate = useNavigate();

const [url, setUrl] = useState('');

   const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('User ID:', userID);

        // Assuming getProfile function returns an object with a profilePicture property
        const currentUser = await getUser(userID || "");
        setProfilePicture(currentUser.profilePicture || "");
        console.log('User profile:', currentUser.name);

        console.log('User profile:', currentUser.profilePicture);





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
    setIsOpen(false); // Close the UserMenu when opening the AuthenticationModal
    setAuthenticationModalIsOpen(true);
  };


  const onLogOut = () => {
    setIsOpen(false)
    logout();
    navigate('/');
    window.location.reload();

  }

  
  return (
    <>
    <div className="relative">
      {userID
        ?
      <div className="flex flex-row items-center gap-3 md:mr-20">
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
                    cursor-pointer
                    
                    "
        >
          Event Erstellen 
        </div>
        <div><MdOutlineGroups2 size={25}/></div>
        <div><FaRegEnvelope size={20}/></div>
       
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
          {profilePicture && <Avatar src={`../../../../../connectandexplore-1/Backend/dist/src/utils${profilePicture}`} />}
          </div>
    </div>
  </div> 
      :
      <div className='flex flex-row gap-3 md:mr-20'>
          <div className='w-24 md:w-32'>
              <Button outline label='Anmelden' onClick={openAuthenticationModal} />
          </div>
          <div className='w-24 md:w-32'>
              <Button label='Registrieren' onClick={() => navigate('/signup')} />
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
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Dashboard" />
              <MenuItem onClick={() => navigate("/yourevents")} label="Deine Events" />
              <MenuItem onClick={() => {}} label="Nachrichten" />
              <MenuItem onClick={() => navigate('/about')} label="Einstellung" />
              <MenuItem onClick={() => {}} label="Hilfe / FAQ" />
              <hr/>
              <MenuItem onClick={onLogOut} label="Log out" />
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
