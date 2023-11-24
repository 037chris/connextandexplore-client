import * as React from 'react';
import LocalEvents from '../landingPage/LocalEvents';
import Introduction from '../landingPage/Introduction';
import Categories from '../landingPage/Categories';
import Join from '../landingPage/Join';


const Home = () => {
   const eventsData = [
    { date: "2023-01-01", name: "Event 1", description: "Beschreibung für Event 1", location: "Ort 1",
     hashtags:["Party", "Musik", "Essen"] ,category: "Kultur & kunst"},
    { date: "2023-02-01", name: "Event 2", description: "Beschreibung für Event 2", location: "Ort 2" },
    { date: "2023-02-01", name: "Event 3", description: "Beschreibung für Event 3", location: "Ort 3", hashtags:["AAA", "BB", "S"]},
    { date: "2023-02-01", name: "Event 4", description: "Beschreibung für Event 4", location: "Ort 4" },

  ];

  return (
    
    <div className='p-3 gap-4'>
      <br />
      <br />
      <br />
      <br />
      <br />
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