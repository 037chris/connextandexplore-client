import * as React from 'react';
import LocalEvents from '../landingPage/LocalEvents';
import Introduction from '../landingPage/Introduction';
import Categories from '../landingPage/Categories';
import Join from '../landingPage/Join';
import AllEvents from '../allEvents/AllEvents';
import UserEvents from './UserEvents';


const Events = () => {
  return (
    
    <div className='p-3 gap-4'>
      <br />
      <br />
      <br />
      <br />
      <br />
        <AllEvents />
        <UserEvents />
    </div>
  );
};
export default Events
