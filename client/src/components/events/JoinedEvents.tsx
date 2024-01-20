import Container from "../Container";
import Event from "../landingPage/Event";
import { eventsResource } from "../../Resources";
import { getJoinedEvents } from "../../backend/boardapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import { useUserIDContext } from "../../UserIDContext";

interface JoinedEventsProps {}

const JoinedEvents: React.FC<JoinedEventsProps> = () => {
  const { userID } = useUserIDContext();
  const [dbEvents, setDbEvents] = useState<eventsResource | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    <div className="max-grid content content-pt">
      {loading && <p>Loading...</p>}
      {dbEvents && dbEvents.events && dbEvents.events.length !== 0 && (
        <>
          <div
              className="
                       p-12
                       grid
                       grid-cols-1
                       sm:grid-cols-2
                       md:grid-cols-3
                       lg:grid-cols-4
                       gap-8
                   "
            >
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
  );
};

export default JoinedEvents;
