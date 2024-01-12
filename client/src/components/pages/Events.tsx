import * as React from 'react';
import Categories from '../landingPage/Categories';
import AllEvents from '../allEvents/AllEvents';
import UserEvents from './UserEvents';
import Footer from '../html/Footer';


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
