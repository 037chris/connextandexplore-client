import * as React from 'react';
import LocalEvents from '../landingPage/LocalEvents';
import Button from '../html/Button';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../html/Footer';
import { Header } from '../html/Header';
import PlaceholderImg from '../../img/PLACEHOLDER_PEOPLE.svg'
import { useUserIDContext } from '../../UserIDContext';


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
  const { userID } = useUserIDContext();

  React.useEffect(() => {
    document.title = 'Willkommen auf der Seite Connect & Explore"';
  }, []); 

  return (
    <div className='relative'>
      <Header homeRoute={'home'} headline={undefined} />

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
                <h2 className="font-francisco">Willkommen bei Connect&Explore</h2>
                <p>wo spontane Verbindungen und ungeahnte Entdeckungen aufeinandertreffen! In unserer digitalen Oase findest du kein klassisches 0815-Meeting, sondern eine bunte Mischung aus Neugierigen, Entdeckern und Gleichgesinnten, die darauf warten, dass du ihre Welt betrittst. 
                </p>
                  <p>Vergiss steife Anzüge und formelle Smalltalks – hier geht es um authentische Gespräche, unerwartete Synergien und vielleicht sogar die nächste große Idee. Also, schnapp dir deinen Lieblings-Drink, lehn dich zurück und lass uns gemeinsam das nächste Abenteuer planen. Bei Connect&Explore bleibt kein Wunsch unerfüllt – außer vielleicht der nach einem langweiligen Abend!"</p></div>
            </div>
          </div>
        </div>
      </div>

      {userID !== undefined ? <></> : <>
        <div className="bg-gray">
          <div className="max-grid">
            <div className='grid grid-cols-1'>
              <div className="register">
                <h3 className="font-francisco">Werde Teil unser Community</h3>
                <div>
                  <p>In Connect & Explore treffen sich Leute, um neue Freunde kennenzulernen, etwas Neues zu lernen, ihre Komfortzone zu verlassen oder einfach gemeinsam Hobbys auszuüben. Die Mitgliedschaft ist kostenlos.
                    <Button primary label='Registrieren' onClick={() => navigate('/signup')} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>}
      <Footer />
    </div>
  );
};
export default Home