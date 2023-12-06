import * as React from 'react';
import LocalEvents from '../landingPage/LocalEvents';
import Introduction from '../landingPage/Introduction';
import Categories from '../landingPage/Categories';
import Join from '../landingPage/Join';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import JoinedEvents from '../events/JoinedEvents';


const YourEvents = () => {
  const navigate = useNavigate();
  return (
    <div className='p-3 gap-4'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Beigetretene</h1>
      <JoinedEvents />
      <hr />
      <h1>Erstellte</h1>
    </div>
  );
};
export default YourEvents