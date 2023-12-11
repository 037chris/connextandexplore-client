import * as React from 'react';
import LocalEvents from '../landingPage/LocalEvents';
import Introduction from '../landingPage/Introduction';
import Categories from '../landingPage/Categories';
import Join from '../landingPage/Join';
import AllEvents from '../allEvents/AllEvents';
import UserEvents from './UserEvents';
import Footer from '../web/Footer';


const Events = () => {
  return (
    <>
    <div className='p-12'>
      <br />
      <br />
      <br />
      <br />
      <br />
        <AllEvents />
    </div>
    <Footer/>
    </>
  );
};
export default Events
