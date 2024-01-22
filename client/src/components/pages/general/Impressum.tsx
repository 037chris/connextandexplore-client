import { Link } from "react-router-dom";
import Footer from "../../html/Footer";
import { Header } from "../../html/Header";

const Impressum = () => {
    return (
        <>
            <Header homeRoute={'page'} headline={'Team GCM'} />
            <div className='max-grid content content-pt bg team'>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>Gruppenmitglieder</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <ul>
                            <li><b>Mariam Daliri</b><br />916841, <Link to="mailto:s51677@bht-berlin.de">s51677@bht-berlin.de</Link></li>
                            <li><b>Naceur Sayedi</b><br /> 926947, <Link to="mailto:85975@bht-berlin.de">85975@bht-berlin.de</Link></li>
                            <li><b>Georg Sittnick</b><br /> 935065, <Link to="mailto:s88268@bht-berlin.de">s88268@bht-berlin.de</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <ul>
                            <li><b>Khatia Zitanishvili</b><br /> 926989, <Link to="mailto:s86156@bht-berlin.de">s86156@bht-berlin.de</Link></li>
                            <li><b>Minh Trinh</b><br /> 934421, <Link to="mailto:s89187@bht-berlin.de">s89187@bht-berlin.de</Link></li>
                            <li><b>Christian Dahlenburg</b><br /> 900164, <Link to="mailto:s82595@bht-berlin.de">s82595@bht-berlin.de</Link></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>Projektbeschreibung</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <p>Unser Projekt "Connect & Explore," zielt darauf ab, Menschen in einer digital vernetzten Welt zusammenzubringen und ihnen zu helfen, spannende Veranstaltungen und Erlebnisse in ihrer Stadt zu entdecken.
                            Unabhängig davon, ob es sich um neu Zugezogene, Touristen oder Einheimische handelt, unser
                            digitales Tool "Connect & Explore" ermöglicht es jedem, seine Umgebung auf eine neue Weise zu erkunden und zu erleben.</p>
                        <p>Veranstaltungen erstellen oder daran teilnehmen:
                            Mit unserer Plattform kannst man problemlos an einer vielfältigen Auswahl von Veranstaltungen teilnehmen oder eigene Events organisieren. Die benutzerfreundliche Suchfunktion ermöglicht es, nach Events in der Nähe zu suchen und sie nach Kategorien, gesprochenen Sprachen und Orten zu filtern. Events können öffentlich für alle zugänglich sein oder privat mit ausgewählten Teilnehmern stattfinden.</p>
                    </div>
                    <div className="lg:col-span-1"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Impressum;