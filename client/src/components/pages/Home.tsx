import * as React from 'react';
import LocalEvents from '../landingPage/LocalEvents';
import Introduction from '../landingPage/Introduction';
import Categories from '../landingPage/Categories';
import Join from '../landingPage/Join';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../web/Footer';
import { Header } from '../web/Header';
import PlaceholderImg from '../../img/PLACEHOLDER_PEOPLE.svg'


const Home = () => {
  const eventsData = [
    {
      date: "2023-01-01", name: "Event 1", description: "Beschreibung für Event 1", location: "Ort 1",
      hashtags: ["Party", "Musik", "Essen"], category: "Kultur & kunst"
    },
    { date: "2023-02-01", name: "Event 2", description: "Beschreibung für Event 2", location: "Ort 2" },
    { date: "2023-02-01", name: "Event 3", description: "Beschreibung für Event 3", location: "Ort 3", hashtags: ["AAA", "BB", "S"] },
    { date: "2023-02-01", name: "Event 4", description: "Beschreibung für Event 4", location: "Ort 4" },

  ];
  const navigate = useNavigate();

  return (
    <div className='relative'>
      <Header homeRoute={'home'} />

      <div className="bg-blue section">
        <div className="max-grid">
          <LocalEvents events={eventsData} />
        </div>
      </div>
      <div className="section">
        <div className="max-grid">
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='flex'>
              <img src={PlaceholderImg} alt="Vier Menschen grüßen sich" />
            </div>
            <div className='align-v'>
              <div>
                <h2 className="font-francisco">Überschrift mit Platzhalter</h2>
                <p>Überall dieselbe alte Leier. Das Layout ist <Link to="/">fertig</Link>, der Text lässt auf sich warten. Damit das Layout nun nicht nackt im Raume steht und sich klein und leer vorkommt, springe ich ein: der Blindtext. Genau zu diesem Zwecke erschaffen, immer im Schatten meines großen Bruders »Lorem Ipsum«, freue ich mich jedes Mal, wenn Sie ein paar Zeilen lesen. Denn esse est percipi - Sein ist wahrgenommen werden. </p>
                <p>Und weil Sie nun <Link to="/">schon die Güte haben</Link>, mich ein paar weitere Sätze lang zu begleiten, möchte ich diese Gelegenheit nutzen, Ihnen nicht nur als Lückenfüller zu dienen, sondern auf etwas hinzuweisen, das es ebenso verdient wahrgenommen zu werden: Webstandards nämlich. Sehen Sie, Webstandards sind das Regelwerk, auf dem Webseiten aufbauen. So gibt es Regeln für HTML, CSS, JavaScript oder auch XML; Worte, die Sie vielleicht schon einmal von Ihrem Entwickler gehört haben. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray">
        <div className="max-grid">
          <div className='grid grid-cols-1'>
            <div className="register">
              <h3 className="font-francisco">Werde Teil unser Community</h3>
              <div>
                <p>In Connect & Explore treffen sich Leute, um neue Freunde kennenzulernen, etwas Neues zu lernen, ihre Komfortzone zu verlassen oder einfach gemeinsam Hobbys auszuüben. Die Mitgliedschaft ist kostenlos.
                  {/* <link to={Home}>Registrieren</link> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      OLD VERSION
      <div className="max-grid">
        <div className='p-3 gap-4'>
        <h1> Placeholder, Link zur AllEvents Seite/Komponente, for testing</h1>
        <Button label="AllEvents Seite aufrufen" onClick={()=>{navigate("/events")}} />
          <Introduction />
          <LocalEvents events={eventsData} />
          <Categories categories={["Kultur&Kunst","Konzert","sport&Fitness","Gaming","Hobbys",
          "outdoor","Social"]} />
          <Join />
          </div>
      </div> */}
      <Footer />
    </div>
  );
};
export default Home