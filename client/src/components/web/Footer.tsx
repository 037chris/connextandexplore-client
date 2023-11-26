import { Link } from 'react-router-dom';
import logo from '../../img/FOOTER_LOGO.png';

const Footer = () => {
    return (
        <footer>
            <div className="max-grid">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-5 lg:col-span-4">
                        <img src={logo} className="footer-logo" alt="Connect and Explore - Logo" />
                    </div>
                    <div className="col-span-12 md:col-span-2 lg:col-span-1">
                        <p>1/12 Breite</p>
                    </div>
                    <div className="col-span-12 md:col-span-5 lg:col-span-7">
                        {/* Wenn eingeloggt */}
                        <div className="konto">
                            <p>Dein Konto</p>
                            <ul>
                                <li><Link to="#">Profil</Link></li>
                                <li><Link to="#">Deine Events</Link></li>
                                <li><Link to="#">Nachrichten</Link></li>
                                <li><Link to="#">Einstellungen</Link></li>
                                <li><Link to="#">Abmelden</Link></li>
                            </ul>
                        </div>
                        <div className="footer-navi">
                            <p>Connect & <span>Explore</span></p>
                            <ul>
                                <li><Link to="#">Event suchen</Link></li>
                                <li><Link to="#">Kalender</Link></li>
                                <li><Link to="#">Allgemeine Geschäftsbedingungen</Link></li>
                                <li><Link to="#">Datenschutzrichtlinie</Link></li>
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