import Container from "../../html/Container";
import Event from "../../landingPage/Event";
import { eventsResource } from "../../../Resources";
import { getJoinedEvents } from "../../../backend/boardapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../LoadingIndicator";
import { useUserIDContext } from "../../../UserIDContext";
import Footer from "../../html/Footer";
import { Header } from "../../html/Header";

interface JoinedEventsProps { }

const JoinedEvents: React.FC<JoinedEventsProps> = () => {
  const { userID } = useUserIDContext();
  const [dbEvents, setDbEvents] = useState<eventsResource | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Deine Zusagen - Connect & Explore';
    const load = async () => {
      try {
        const joinedEvents = await getJoinedEvents();
        joinedEvents.events = joinedEvents.events.filter(
          (event) => event.creator !== userID
        );
        setDbEvents(joinedEvents);
      } catch (error) {
        console.error("Error fetching joined events:", error);
        // Handle error state, setDbEvents to a default value or show an error message
      }
    };

    load();
  }, []);

  return (
    <>
    <Header homeRoute={"page"} headline={"Deine Zusagen"} />
    <div className="max-grid content content-pt">
      <div className="grd grid-col-1 center">
        <p>Willkommen auf unserer "Connect & Explore" Seite für Veranstaltungen!</p>
      </div>
      {loading && <p>Loading...</p>}
      {!dbEvents ?
        <>
          <div className="center">
            <p>Aktuell findest du hier noch keine Events, da wir darauf warten, dass du Ihre Teilnahme zu sagst.</p>
            <p>Schaue regelmäßig vorbei, um die neuesten Updates und Informationen zu deinen kommenden Events zu erhalten.</p>
          </div>
        </> : <></>
      }
      {dbEvents && dbEvents.events && dbEvents.events.length !== 0 && (
        <>
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {dbEvents?.events.map((event) => (
              <Link to={`/event/${event.id}`} key={event.id}>
                <Event
                  key={event.id}
                  id={event.id}
                  address={event.address}
                  date={event.date}
                  name={event.name}
                  description={event.description}
                  hashtags={event.hashtags}
                  participants={event.participants}
                  thumbnail={event.thumbnail!}
                />
              </Link>
            ))}
          </div>
        </>
      )} 
    </div>
    <Footer />
    </>
  );
};

export default JoinedEvents;
