import { Link } from 'react-router-dom';
import logo from '../../img/FOOTER_LOGO.png';
import { useUserIDContext } from '../../UserIDContext';

const Footer = () => {
    const { userID } = useUserIDContext();
    
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
                                        <li><Link to="#">Profil</Link></li>
                                        <li><Link to="#">Deine Events</Link></li>
                                        <li><Link to="#">Nachrichten</Link></li>
                                        <li><Link to="#">Einstellungen</Link></li>
                                        <li><Link to="#">Abmelden</Link></li>
                                    </ul>
                                </> :
                                <>
                                    <ul className="grid md:grid-cols-2 lg:grid-spans-4">
                                        <li><Link to="#">Einloggen</Link></li>
                                        <li><Link to="#">Registrieren</Link></li>
                                    </ul>
                                </>}

                        </div>
                        <div className="footer-navi">
                            <p className="hl">Connect & <span>Explore</span></p>
                            <ul className="grid md:grid-cols-5">
                                <li><Link to="#">Events</Link></li>
                                <li><Link to="#">AGBs</Link></li>
                                <li><Link to="#">DSGVO</Link></li>
                                <li><Link to="#">Impressum</Link></li>
                                <li><Link to="#">Hilfe/FAQ</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;