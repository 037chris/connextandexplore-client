
import { Outlet, Navigate } from 'react-router-dom';
import { useUserIDContext } from '../UserIDContext';
import { useState } from 'react';
import LoginModal from './navbar/LoginModal';
import EmptyState from './EmptyState';

export default function PrivateRoute() {
 const { userID } = useUserIDContext();
 const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false); 
 const openAuthenticationModal = () => {
    setAuthenticationModalIsOpen(true)
  };


    return (
      <>
        {userID 
        ? 
        <Outlet />
        :
        <> 
            <EmptyState title='Oops.. Seite nicht gefunden' subtitle='Bitte zuerst anmelden.' onClick={openAuthenticationModal}/>
            <LoginModal isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} />
        </>
        }
     </>
    );
  }


