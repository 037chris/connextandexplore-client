import { Link, useNavigate } from 'react-router-dom';
import logo from '../../img/FOOTER_LOGO.png';
import { useUserIDContext } from '../../UserIDContext';
import Cookies from 'js-cookie';
import { logout } from '../../backend/boardapi';
import { useState } from 'react';
import LoginModal from './navbar/LoginModal';

const Footer = () => {
    const { userID } = useUserIDContext();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false);

    const onLogOut = () => {
        sessionStorage.clear();
        logout();
        navigate(0)
    };

    const handleLinkClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const openAuthenticationModal = () => {
        setIsOpen(false);
        setAuthenticationModalIsOpen(true);
    }

    return (
        <footer>
            <div className="max-grid">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-3 lg:col-span-4 flex">
                        <img src={logo} className="footer-logo" alt="Connect and Explore - Logo" />
                    </div>
                    <div className="col-span-12 md:col-span-1 lg:col-span-1">
                        <span className="line"></span>
                    </div>
                    <div className="col-span-12 md:col-span-8 lg:col-span-7">
                        {/* Wenn eingeloggt */}
                        <div className="konto">
                            <p className="hl">Dein Konto</p>
                            {userID !== undefined ?
                                <>
                                    <ul className="grid md:grid-cols-5">
                                        <li></li>
                                        {/* <li><Link to="/profile">Profil</Link></li> */}
                                        <li><Link to="/my-created-events" onClick={handleLinkClick}>Meine Events</Link></li>
                                        <li><Link to="/chat" onClick={handleLinkClick}>Nachrichten</Link></li>
                                        <li><Link to="/settings" onClick={handleLinkClick}>Einstellungen</Link></li>
                                        <li><Link to="/" onClick={onLogOut}>Abmelden</Link></li>
                                    </ul>
                                </> :
                                <>
                                    <ul className="grid md:grid-cols-4 lg:grid-spans-4">
                                        <li></li>
                                        <li></li>
                                        <li><Link to="#" onClick={openAuthenticationModal}>Einloggen</Link></li>
                                        <li><Link to='/signup' onClick={handleLinkClick}>Registrieren</Link></li>
                                    </ul>
                                </>}

                        </div>
                        <div className="footer-navi">
                            <p className="hl">Connect & <span>Explore</span></p>
                            <ul className="grid md:grid-cols-5">
                                <li><Link to="/events" onClick={handleLinkClick}>Alle Events</Link></li>
                                <li><Link to="/agbs" onClick={handleLinkClick}>AGBs</Link></li>
                                <li><Link to="/dsgvo" onClick={handleLinkClick}>DSGVO</Link></li>
                                <li><Link to="/imprint" onClick={handleLinkClick}>Team</Link></li>
                                <li><Link to="/help" onClick={handleLinkClick}>Hilfe/FAQ</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} />

        </footer>
    );
}

export default Footer;