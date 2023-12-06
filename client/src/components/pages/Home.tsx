import * as React from 'react';
import LocalEvents from '../landingPage/LocalEvents';
import Introduction from '../landingPage/Introduction';
import Categories from '../landingPage/Categories';
import Join from '../landingPage/Join';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { postEvent } from '../../backend/boardapi';
import { addressResource, categoryResource, eventResource } from '../../Resources';


const Home = () => {
   const eventsData = [
    { date: "2023-01-01", name: "Event 1", description: "Beschreibung für Event 1", location: "Ort 1",
     hashtags:["Party", "Musik", "Essen"] ,category: "Kultur & kunst"},
    { date: "2023-02-01", name: "Event 2", description: "Beschreibung für Event 2", location: "Ort 2" },
    { date: "2023-02-01", name: "Event 3", description: "Beschreibung für Event 3", location: "Ort 3", hashtags:["AAA", "BB", "S"]},
    { date: "2023-02-01", name: "Event 4", description: "Beschreibung für Event 4", location: "Ort 4" },

  ];
  const navigate = useNavigate();

  const testAddress:addressResource={
    street: "test street",
    houseNumber: "test number",
    postalCode: 'as',
    city: 'sd',
    country: 'df'
  }

  const testCategory:categoryResource={
    name: 'test category',
    description: 'zum testen'
  }

  const testEvent:eventResource={
    name:"testevent",
    date:new Date(),
    description:"test desc",
    price:1,
    address: testAddress,
    category: [testCategory]
  }

  return (
    
    <div className='p-3 gap-4'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>TESTEVENTS ERSTELLEN</h1>
      <Button label='TESTEVENT ERSTELLEN' onClick={()=>{postEvent(testEvent)}}/>
      {/*
    Placeholder, Link zur AllEvents Seite/Komponente, for testing
    */}
    <h1> Placeholder, Link zur AllEvents Seite/Komponente, for testing</h1>
    <Button label="AllEvents Seite aufrufen" onClick={()=>{navigate("/events")}} />
    <h1> Placeholder ENDE</h1>
      <Introduction />
      
      <br />
      
      <LocalEvents events={eventsData} />
      <br />
      <Categories categories={["Kultur&Kunst","Konzert","sport&Fitness","Gaming","Hobbys",
      "outdoor","Social"]} />
      <Join />
    </div>
  );
};
export default Home