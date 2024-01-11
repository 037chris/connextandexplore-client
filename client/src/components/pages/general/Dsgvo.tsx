import { useEffect } from "react";
import Footer from "../../html/Footer";
import { Header } from "../../html/Header";
import { Link } from "react-router-dom";

const Dsgvo = () => {
    useEffect(() => {
        document.title = 'Datenschutz bei uns - Connect & Explore';
    }, []);
    
    return (
        <>
            <Header homeRoute={'page'} headline={'Datenschutz'} />
            <div className='max-grid content content-pt bg'>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><p>Deine Privatsphäre ist uns wichtig. Diese Datenschutzerklärung erklärt, wie Connect&Explore deine persönlichen Daten sammelt, verwendet, offenlegt und schützt. Durch die Nutzung unserer Plattform stimmst du den in dieser Erklärung beschriebenen Praktiken zu.</p></div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>Nutzungsbedingungen</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <p>Connect&Explore verwendet keine Cookies. Wir verwenden ausschließlich ein Token zur Identifizierung des Logins. Dieses Token ermöglicht es, dich sicher zu authentifizieren und einen personalisierten Service zu bieten. Um alle Funktionen zu nutzen, muss JavaScript aktiviert sein.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>JavaScript-Aktivierung</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <p>Die vollständige Nutzung unserer Plattform erfordert die Aktivierung von JavaScript. Diese Technologie ermöglicht eine reibungslose Interaktion und verbessert das Nutzererlebnis. Durch die Aktivierung von JavaScript erhältst du Zugriff auf alle Funktionen von Connect&Explore.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>Sicherheit der Datenübertragung</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <p>Connect&Explore überträgt alle Daten über eine sichere HTTPS-Verbindung. Diese Verschlüsselungstechnologie gewährleistet, dass Informationen sicher zwischen deinem Gerät und unseren Servern übertragen werden. Wir setzen modernste Sicherheitsmaßnahmen ein, um die Vertraulichkeit und Integrität deiner Daten zu schützen.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>Token-basierte Authentifizierung</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <p>Unser Token-System dient ausschließlich zur Identifizierung des Logins und ermöglicht einen sicheren Zugang zu deinem Konto. Es werden keine persönlichen Daten in diesem Token gespeichert. Deine Privatsphäre und Sicherheit stehen für uns an oberster Stelle.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>E-Mail-Kontakt und Anfragen</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <p>Wenn du uns per E-Mail kontaktierst, speichern wir die von dir bereitgestellten Informationen, um deine Anfrage zu bearbeiten. Deine E-Mail-Adresse und andere persönliche Daten werden nur für die entsprechende Kommunikation verwendet und nicht ohne deine Zustimmung weitergegeben.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>Recht auf Löschung</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <p>Wenn du die unwiderrufliche Löschung aller deiner Daten wünschst, sende bitte eine E-Mail-Anfrage an info@connectandexplore.de. In dieser Anfrage sollte dein Benutzername und der klare Wunsch zur vollständigen Löschung deiner Daten enthalten sein. Wir werden sicherstellen, dass alle deine persönlichen Informationen gemäß den Datenschutzrichtlinien dauerhaft gelöscht werden.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><p>Connect&Explore ist bestrebt, die höchsten Datenschutzstandards einzuhalten. Diese Datenschutzerklärung unterliegt möglichen Aktualisierungen, daher empfehlen wir, sie regelmäßig zu überprüfen. Wenn du Fragen oder Bedenken zur Verarbeitung deiner persönlichen Daten hast, kontaktiere uns bitte unter <Link to="mailto:info@connectandexplore.de">info@connectandexplore.de</Link>.</p></div>
                    <div className="lg:col-span-1"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Dsgvo;