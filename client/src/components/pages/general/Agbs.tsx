import { useEffect } from "react";
import Footer from "../../html/Footer";
import { Header } from "../../html/Header";

const Agbs = () => {
    useEffect(() => {
        document.title = 'AGBs - Connect & Explore';
    }, []);

    return (
        <>
            <Header homeRoute={'page'} headline={'AGBS'} />
            <div className='max-grid content content-pt bg'>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>1. Nutzungsbedingungen</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Die Anmeldung und Nutzung von Connect&Explore setzen voraus, dass du als registrierter Benutzer akzeptierst, ausschließlich korrekte und aktuelle Informationen bereitzustellen. Du bist selbst dafür verantwortlich, die Sicherheit deines Kontos zu gewährleisten, und solltest sicherstellen, dass dein Passwort geschützt bleibt. Jegliche Verstöße gegen geltende Gesetze oder unsere Richtlinien, einschließlich der Veröffentlichung anstößiger Inhalte, können zur Sperrung deines Kontos führen.</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Die Nutzung von Connect&Explore steht Personen offen, die die geltenden Gesetze und diese AGB akzeptieren. Du stimmst zu, die Plattform nicht für betrügerische, illegale oder anderweitig unangemessene Aktivitäten zu nutzen. Diese Bedingungen sind entscheidend für eine positive und sichere Community-Erfahrung.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>2. Verhaltenskodex</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Die Grundlage unserer Community bildet ein Verhaltenskodex, der auf Respekt und Offenheit beruht. Alle Mitglieder sind dazu aufgerufen, sich respektvoll zu verhalten und diskriminierende, beleidigende oder belästigende Äußerungen zu unterlassen. Wir setzen uns für eine inklusive und unterstützende Umgebung ein und behalten uns das Recht vor, Mitglieder zu verwarnen oder zu sperren, die gegen diese Prinzipien verstoßen.</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Wir ermutigen unsere Mitglieder dazu, ihre Erfahrungen und Interessen zu teilen und gleichzeitig die Meinungen und Überzeugungen anderer zu respektieren. Unsere Plattform ist bestrebt, eine positive und kollaborative Atmosphäre zu fördern, in der jeder sich willkommen fühlt.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>3. Geistiges Eigentum</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Die auf Connect&Explore bereitgestellten Inhalte, einschließlich Texte, Grafiken, Logos und Bilder, sind durch das Urheberrecht geschützt. Ohne ausdrückliche Genehmigung von Connect&Explore ist es nicht gestattet, Inhalte zu kopieren, modifizieren, verteilen oder anderweitig nutzen. Die Plattform behält sich das Recht vor, Inhalte, die gegen das Urheberrecht verstoßen, zu entfernen.</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Wenn du Inhalte auf Connect&Explore teilst, räumst du der Plattform das Recht ein, diese innerhalb der Plattform zu verwenden und zu verbreiten. Diese Regelung trägt dazu bei, die Funktionen und die Interaktivität der Community zu verbessern, während gleichzeitig das geistige Eigentum respektiert wird.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>4. Datenschutz</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Deine Privatsphäre ist uns wichtig. Informationen, die du auf Connect&Explore teilst, unterliegen unseren Datenschutzrichtlinien. Diese umfassen persönliche Daten, Beiträge und Kommunikation innerhalb der Plattform. Wir empfehlen, die Datenschutzrichtlinien regelmäßig zu überprüfen, um über eventuelle Aktualisierungen informiert zu bleiben.</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Die Plattform verpflichtet sich, deine persönlichen Daten vertraulich zu behandeln und nur gemäß den festgelegten Datenschutzrichtlinien zu verwenden. Wir nutzen modernste Sicherheitsmaßnahmen, um die Integrität und Sicherheit der auf der Plattform geteilten Informationen zu gewährleisten.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>5. Verantwortlichkeit</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Connect&Explore ist eine Plattform für den Austausch von Interessen, Aktivitäten und Ideen. Benutzer handeln eigenverantwortlich und auf eigenes Risiko. Wir übernehmen keine Verantwortung für die Qualität, Sicherheit oder Legalität der auf der Plattform durchgeführten Aktivitäten.</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Es ist wichtig zu betonen, dass die Plattform als Vermittler für Verbindungen dient, und wir ermutigen unsere Benutzer, eigenverantwortlich zu handeln und die notwendigen Vorkehrungen zu treffen, um ihre Sicherheit und Zufriedenheit zu gewährleisten. Jegliche Schäden oder Unannehmlichkeiten, die aus der Nutzung der Plattform resultieren, liegen in der Verantwortung der beteiligten Benutzer.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>6. Änderungen der AGB</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Connect&Explore behält sich das Recht vor, diese AGB jederzeit zu aktualisieren. Solche Änderungen werden auf der Plattform veröffentlicht, und die Benutzer werden per Mitteilung informiert. Durch die fortgesetzte Nutzung der Plattform nach solchen Änderungen erklärst du dich damit einverstanden, die modifizierten Bedingungen zu akzeptieren.</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Wir streben danach, die Community über Änderungen zu informieren, um Transparenz und Verständnis sicherzustellen. Dennoch ist es die Verantwortung jedes Benutzers, die AGB regelmäßig zu überprüfen, um auf dem neuesten Stand zu bleiben und sicherzustellen, dass die Nutzung der Plattform weiterhin den eigenen Erwartungen entspricht.</p>
                    </div>
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4"><h2>7. Konto löschen</h2></div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1"></div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Du kannst dein Konto jederzeit deaktivieren, indem du die entsprechende Option in den Kontoeinstellungen wählst. Beachte jedoch, dass diese Deaktivierung vorübergehend ist und dein Konto durch eine erneute Anmeldung reaktiviert werden kann. Wenn du eine unwiderrufliche Löschung aller deiner Daten wünschst, sende bitte eine formelle Anfrage per E-Mail an info@connectandexplore.de.</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p>Die E-Mail-Anfrage sollte deinen Benutzernamen und den klaren Wunsch zur vollständigen Löschung deiner Daten enthalten. Unser Support-Team wird sich umgehend darum kümmern und sicherstellen, dass sämtliche persönlichen Informationen gemäß den Datenschutzrichtlinien dauerhaft gelöscht werden. Wir schätzen dein Vertrauen und respektieren deine Entscheidung, dein Konto auf Connect&Explore zu löschen.</p>
                    </div>
                    <div className="lg:col-span-1"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Agbs;