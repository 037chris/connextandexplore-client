import * as React from 'react';
import Button from '../html/Button';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../html/Footer';
import { Header } from '../html/Header';
import PlaceholderImg from '../../img/PLACEHOLDER_PEOPLE.svg'
import { useUserIDContext } from '../../UserIDContext';
import Newest4Events from '../landingPage/Newest4Events';
import OwnNewest4Events from '../landingPage/OwnNewest4Events';
import { useEffect, useState } from 'react';
import { getAllEvents, getCreatedEvent } from '../../backend/boardapi';
import { eAddressResource, eventResource } from '../../Resources';


const initAddress: eAddressResource = {
  street: "init",
  houseNumber: "init",
  postalCode: "init",
  city: "init",
  country: "init"
}

const initEvent: eventResource = {
  name: "hahahaha",
  description: "init",
  price: -1,
  date: new Date(),
  address: initAddress
}

const Home = () => {
  const [displayedEvents, setDisplayedEvents] = useState({ events: [initEvent] });
  const [ownDisplayedEvents, setOwnDisplayedEvents] = useState({ events: [initEvent] });

  const load = async () => {
    setDisplayedEvents(await getAllEvents())
    if (userID) setOwnDisplayedEvents(await getCreatedEvent(userID))
  }

  const navigate = useNavigate();
  const { userID } = useUserIDContext();

  useEffect(() => {
    load()
    document.title = 'Willkommen auf der Seite Connect & Explore"';
  }, [userID]);

  return (
    <>
      {/* HEADER STARTSEITE */}
      <Header homeRoute={'home'} headline={undefined} />
      {/* START SECTION OWN EVENTS */}
      {userID === undefined ? <></> : <>
        <div className="section bg-border">
          <div className="max-grid">
            <OwnNewest4Events events={ownDisplayedEvents.events.slice(-4).reverse()} />
          </div>
        </div>
      </>}
      {/* END SECTION OWN EVENTS */}
      {/* START ALL EVENTS EVENTS */}
      <div className="bg-blue section">
        <div className="max-grid">
          <Newest4Events events={displayedEvents.events.slice(-4).reverse()} />
        </div>
      </div>
      {/* END ALL EVENTS EVENTS */}
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
      {/* REG SECTION */}
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
    </>
  );
};
export default Home