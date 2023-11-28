'use client'

import Container from "../Container";
import Event from "../landingPage/Event";
import { addressResource, eventResource } from "../../Resources";
import { getAllEvents } from "../../backend/boardapi";
import { useState } from "react";
import Button from "../Button";


interface AllEventsProps {
     //events: { date: any, name: string, description: string, imageUrl?: string, hashtags?:string[],category?: string }[]
}

const initAddress:addressResource={
  street: "init",
  houseNumber: "init",
  postalCode: "init",
  city: "init",
  country: "init"
}
 
const initEvent:eventResource={
  name: "init",
  description: "init",
  price: -1,
  date: new Date(),
  address: initAddress,
  thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4zpIuafwUwAALiZhyewnZPBfWlm8OvxZIEawUIuHKw&s"
}

const AllEvents: React.FC<AllEventsProps> = ({}) => {
    const [dbEvents,setDbEvents] = useState({events:[initEvent]});
    const load=async ()=>{
      //let allDbEvents=await getAllEvents();
      //if(allDbEvents===-1)return
      setDbEvents(await getAllEvents())
    }
    return (
      <div className="flex font-sans bg-blue-500">
        <Container>
          <div className="grid grid-cols-4 overflow-x-scroll gap-5">
            <Button label="Events laden" onClick={load}/>
            {dbEvents.events.map((event, index) => (
              <div key={index} className="mb-8 mx-2">
                <Event
                  key={index}
                  date="datum"//{event.date.toISOString()}
                  name={event.name}
                  description={event.description}
                  thumbnail={event.thumbnail}
                  hashtags={event.hashtags}
                  
                />
            </div>
          ))}
        </div>
      </Container>
    </div>
    
  );
};

    
export default AllEvents;