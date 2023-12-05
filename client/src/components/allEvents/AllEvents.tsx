'use client'

import Container from "../Container";
import Event from "../landingPage/Event";
import { addressResource, eventResource, eventsResource } from "../../Resources";
import { getAllEvents } from "../../backend/boardapi";
import { useEffect, useState } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";


interface AllEventsProps {
     //events: { date: any, name: string, description: string, imageUrl?: string, hashtags?:string[],category?: string }[]
}

const AllEvents: React.FC<AllEventsProps> = ({}) => {
    const [dbEvents,setDbEvents] = useState<eventsResource>();
    
    useEffect(() => {
      const load = async () => {
        //let allDbEvents=await getAllEvents();
        //if(allDbEvents===-1)return
        setDbEvents(await getAllEvents())
      }
      load();
    },[])
    return (
      <div className="flex font-sans bg-blue-500">
        <Container>
          <div className="grid grid-cols-4 overflow-x-scroll gap-5">
            {dbEvents ? (
              <>
              {dbEvents.events.map((event, index) => (
                <div key={index} className="mb-8 mx-2">
                  <Link to={`/event/${event.id}`}>
                  <Event
                    key={index}
                    date="datum"//{event.date.toISOString()}
                    name={event.name}
                    description={event.description}
                    thumbnail={event.thumbnail!}
                    hashtags={event.hashtags}
                    
                  />
                  </Link>
                </div>
              ))}
              </>
            ) : (
              <LoadingIndicator/>
            )}
        </div>
      </Container>
    </div>
    
  );
};

    
export default AllEvents;