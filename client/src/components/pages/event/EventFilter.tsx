import { useEffect, useState } from "react"
import { eventsResource } from "../../../Resources";
import { getAllEvents, searchEvents } from "../../../backend/boardapi";
import { Link } from "react-router-dom";
import Button from "../../Button";
import Container from "../../Container";
import Event from "../../landingPage/Event";

export type EventFilterProps = {
    setQuery: (query:string) => void;
    query: string;
    setPLZ: (plz:string) => void;
    plz: string;
}
export default function EventFilter({setQuery,query,setPLZ,plz}:EventFilterProps) {

    //const [query, setQuery] = useState<string | null>(null);
    const [events, setEvents] = useState<eventsResource | null>(null);
    //const [plz, setPLZ] = useState<string | null>(null);

    const load = async() => {
        if (!query) {
            try {
                const events:eventsResource = await getAllEvents();
                setEvents(events)
            } catch (err) {
                console.log(err);
                setEvents(null);
            }
        } else {
            try {
                const events:eventsResource = await searchEvents(query);
                setEvents(events);
            } catch (err) {
                console.log(err);
                setEvents(null);
            }
        }
    }

    useEffect(()=>{load();}, [query,plz])

    return <>
    {events ? <div className="flex font-sans bg-blue-500">
        <Container>
          <div className="grid grid-cols-4 overflow-x-scroll gap-5">
            {events.events.map((event, index) => (
              <div key={event.id} className="mb-8 mx-2">
                  <Link to={`/event/${event.id}`} key={event.id}>

                  <Event 
                    key={event.id}
                    address={event.address}
                    date={event.date}
                    name={event.name}
                    description={event.description}   
                    hashtags={event.hashtags}    
                  />
                  </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>: <p>Keine Events gefunden.</p>}

    </>
}