import { useState } from 'react';
import logo from '../../img/header-logo.svg';
import headerImg from '../../img/HEADER_IMG.svg';
import headerImgLogged from '../../img/HEADER-community.svg';
import { useUserIDContext } from '../../UserIDContext';

interface HomeRouteName {
  homeRoute: 'home' | undefined;
}

export const Header: React.FC<HomeRouteName> = ({ }) => {
  const { userID } = useUserIDContext();
  const [homeRoute, setHomeRoute] = useState<'home' | undefined>('home');

  return (
    <header>
      <div className="max-grid">
        {userID == undefined ?
          // MAIN PAGE WTHOUT LOGIN
          <>
            <div className="header-general">
              <div className='grid grid-cols-1 lg:gap-5 lg:grid-cols-12'>
                <div className="lg:col-span-8 clouds">
                  <img src={logo} className="header-logo" alt="Logo" />
                  <h1 className="font-francisco">Mach die Stadt zu deinem Abendteuer
                    <span className="font-sans">
                      Willkommen bei Click & Connect! Tauche ein in unsere Eventplattform und entdecke spannende Abenteuer in deiner Stadt. Erlebe die Vielfalt deiner Stadt auf völlig neue Weisen und knüpfe wertvolle Verbindungen. Sei Teil unserer Community und gestalte deine Freizeit auf einzigartige Art und Weise.
                    </span>
                    <form onSubmit={() => { }}>
                      <label>
                        <input id="event" type="text" placeholder="Event suchen" />
                      </label>
                      <label>
                        <input id="place" type="text" placeholder="Ort oder PLZ" />
                      </label>
                      <label>
                        <input type="submit" />
                      </label>
                    </form>
                  </h1>
                </div>
                <div className="col-span-1 header-img-box lg:col-span-4">
                  <img src={headerImg} className="header-img" alt="Pärchen erkundet eine Stadt" />
                </div>
              </div>
            </div>
          </> : <>{/* MAINPAGE WITH LOGGED IN USER */}
            <div className="header-logged-in">
              <div className='grid md:gap-5 md:grid-cols-12'>
                <div className="grid col-span-1 md:col-span-5">
                  <img src={headerImgLogged} className="cummunityImg" alt="Meet some people"></img>
                </div>
                <div className="col-span-1 md:col-span-7">
                  <h1>Hi</h1>
                  <p>Willkommen! Du hast 3 neue Nachrichten und eine Bewertung!</p>
                  <p>Überall dieselbe alte Leier. Das Layout ist fertig, der Text lässt auf sich warten. Damit das Layout nun nicht nackt im Raume steht und sich klein und leer vorkommt, springe ich ein: der Blindtext.</p>
                  </div>
              </div>
            </div>
          </>}
      </div>
    </header>
  );
};
