import Container from "../Container";
import Event from "../landingPage/Event";
import { eventsResource } from "../../Resources";
import { getJoinedEvents } from "../../backend/boardapi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";

interface JoinedEventsProps {}

const JoinedEvents: React.FC<JoinedEventsProps> = () => {
  const [dbEvents, setDbEvents] = useState<eventsResource | undefined>();

  useEffect(() => {
    const load = async () => {
      try {
        const joinedEvents = await getJoinedEvents();
        setDbEvents(joinedEvents);
      } catch (error) {
        console.error("Error fetching joined events:", error);
        // Handle error state, setDbEvents to a default value or show an error message
      }
    };

    load();
  }, []);

  return (
    <div className="flex font-sans bg-blue-500">
      <Container>
        <div className="grid grid-cols-4 overflow-x-scroll gap-5">
          {dbEvents ? (
            dbEvents.events.length > 0 ? (
              dbEvents.events.map((event, index) => (
                <div key={index} className="mb-8 mx-2">
                  <Link to={`/event/${event.id}`}>
                    <Event
                      key={index}
                      date={event.date}
                      name={event.name}
                      description={event.description}
                      thumbnail={event.thumbnail!}
                      hashtags={event.hashtags}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>No joined events available.</p>
            )
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </Container>
    </div>
  );
};

export default JoinedEvents;
