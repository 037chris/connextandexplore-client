import { useState } from 'react';
import logo from '../../img/header-logo.svg';
import headerImg from '../../img/HEADER_IMG.svg';

interface HomeRouteName {
  homeRoute: 'home' | undefined;
}

export const Header: React.FC<HomeRouteName> = ({ }) => {
  const [homeRoute, setHomeRoute] = useState<'home' | undefined>('home');
  console.log('HOME ROUTE' + homeRoute);

  return (
    <header>

      <div className="max-grid">
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


        {/* {homeRoute === undefined ? <p>Test</p> : <p>else</p>} */}
      </div>
    </header>
  );
};
