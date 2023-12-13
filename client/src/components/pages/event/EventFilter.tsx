import { useEffect, useState } from "react"
import { eventsResource } from "../../../Resources";
import { getAllEvents, searchEvents } from "../../../backend/boardapi";
import { Link } from "react-router-dom";
import Button from "../../Button";
import Container from "../../Container";
import Event from "../../landingPage/Event";

export type EventFilterProps = {
    //setQuery: (query:string) => void;
    query: string;
    //setPLZ: (plz:string) => void;
    plz: string;
}
export default function EventFilter({query,plz}:EventFilterProps) {

    //const [query, setQuery] = useState<string | null>(null);
    const [events, setEvents] = useState<eventsResource | null>(null);
    //const [plz, setPLZ] = useState<string | null>(null);

    const load = async() => {
        console.log("did change?")
        if (query == "" || !query) {
            try {
                console.log("gets all events!")
                const events:eventsResource = await getAllEvents();
                events.events = events.events.filter((event) => {
                    if (!plz) {
                        return true;
                    }
                    return event.address.postalCode==plz;
                })
                setEvents(events)
            } catch (err) {
                console.log(err);
                setEvents(null);
            }
        } else {
            console.log("query: ", query);
            console.log("plz: ", plz);
            try {
                const events:eventsResource = await searchEvents(query);
                events.events = events.events.filter((event) => {
                    if (!plz) {
                        return true;
                    }
                    return event.address.postalCode==plz;
                })
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