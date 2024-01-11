import { useEffect } from "react";
import Footer from "../../html/Footer";
import { Header } from "../../html/Header";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";

const Help = () => {
    useEffect(() => {
        document.title = 'Help/FAQ - Connect & Explore';
    }, []);

    return (
        <>
            <Header homeRoute={'page'} headline={'Hilfe / FAQs'} />
            <div className='max-grid content content-pt bg'>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 place-items-center">
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 lg:col-span-3">
                        <div>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Wie erstelle ich ein Connect & Explore Konto?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Herzlich willkommen bei Connect & Explore! Um dein Abenteuer zu starten, klicke einfach auf "Registrieren" und folge den einfachen Schritten, um dein persönliches Konto zu erstellen. Wir freuen uns darauf, dich in unserer Community willkommen zu heißen!
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Wie kann ich an einem Connect & Explore Event teilnehmen?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Super, dass du dabei sein möchtest! Durchstöbere einfach unsere spannenden Events, finde das perfekte für dich und klicke auf "Teilnehmen". Es war noch nie so einfach, neue Verbindungen zu knüpfen und unvergessliche Erlebnisse zu teilen!
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Wie erstelle ich mein eigenes Event?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Möchtest du der Gastgeber einer fantastischen Veranstaltung sein? Klicke auf "Event erstellen", fülle die Details aus und lade Gleichgesinnte ein! Gemeinsam gestalten wir unvergessliche Momente.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Wie melde ich Probleme oder unangemessenes Verhalten?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Deine Sicherheit und Zufriedenheit sind uns wichtig! Falls du auf Probleme stößt oder unangemessenes Verhalten bemerkst, zögere nicht, uns zu kontaktieren. Schreibe eine E-Mail an <Link to="mailto:info@clickandconnect.de">info@clickandconnect.de</Link> und wir kümmern uns um alles, damit du dich wohl fühlst.</Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Wie kann ich Veranstaltungsdetails ändern oder aktualisieren?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Pläne geändert? Kein Problem! Klicke einfach auf dein Event, wähle "Bearbeiten" und aktualisiere die Details nach Bedarf. So stellen wir sicher, dass alle stets bestens informiert sind.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Gibt es Kosten für die Nutzung von Connect & Explore?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Natürlich! Die Nutzung von Connect & Explore ist vollständig kostenfrei! Unser Service wurde als Hochschuleprojekt ins Leben gerufen, um eine dynamische Plattform für den Austausch und die Verbindung von Menschen zu schaffen. Wir glauben an den freien Zugang zu sozialen Möglichkeiten und streben danach, eine positive und inklusive Community zu fördern, ohne dass dabei Gebühren anfallen. Genieße die Vorteile der völlig kostenlosen Mitgliedschaft und entdecke, wie Connect & Explore dein soziales Leben bereichern kann. Willkommen in unserer wachsenden Community!</Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Wie finde ich Veranstaltungen in meiner Nähe?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Finde aufregende Events in deiner Umgebung! Klicke auf "Entdecken", setze deinen Standort und lass dich von unseren Vorschlägen inspirieren. Die nächste spannende Veranstaltung wartet schon auf dich!
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Welche Datenschutzmaßnahmen gibt es bei Connect & Explore?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Deine Privatsphäre liegt uns am Herzen. Erfahre mehr über unsere Datenschutzrichtlinien unter <Link to="/dsgvo">"DSGVO"</Link> und entdecke, wie wir deine persönlichen Informationen sicher aufbewahren.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Wie kann ich mein Benutzerkonto löschen?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Schade, dass du darüber nachdenkst, dein Benutzerkonto zu löschen. Bei Connect & Explore bieten wir derzeit nur die Option an, dein Konto zu deaktivieren. Du kannst dies tun, indem du zu den Kontoeinstellungen navigierst und dort die Option "Konto deaktivieren" auswählst. Beachte jedoch, dass dies dein Konto vorübergehend stilllegt, und du dich bei Bedarf später wieder anmelden kannst.
                                        <br />
                                        Wenn du jedoch eine vollständige Löschung deiner Daten wünschst, sende bitte eine E-Mail an <Link to="mailto:info@connectandexplore.de">info@connectandexplore.de</Link> und teile uns dies mit. Unser Support-Team wird sich dann umgehend darum kümmern und sicherstellen, dass alle deine persönlichen Informationen gemäß den <Link to="/dsgvo">Datenschutzrichtlinien</Link> gelöscht werden. Vielen Dank für deine Nutzung von Connect & Explore – wir hoffen, dass deine Erfahrungen positiv waren!
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Help;