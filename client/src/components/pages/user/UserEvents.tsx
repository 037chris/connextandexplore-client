import React, { useEffect, useState } from "react";

import { useUserIDContext } from "../../../UserIDContext";
import {
  getCreatedEvent
} from "../../../backend/boardapi";
import Footer from "../../html/Footer";

import { Link, useNavigate, useParams } from "react-router-dom";
import { eventResource, eventsResource, userResource } from "../../../Resources";
import EmptyState from "../../EmptyState";
import Event from "../../landingPage/Event";
import { Header } from "../../html/Header";

const UserEvents: React.FC = () => {
  const { userID } = useUserIDContext();
  const navigate = useNavigate();
  const [events, setEvents] = useState<eventsResource | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Meine Events - Connect & Explore"';
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const currentUserEvents: eventsResource = await getCreatedEvent(
          userID!
        );
        setEvents(currentUserEvents);
      } catch (error) {
        console.error("Error fetching user events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchEvents();
    }
  }, [userID]);

  return (
    <>
      <Header homeRoute={"page"} headline={"Meine Events"} />
      <div className="max-grid content content-pt">
        {loading && <p>Loading...</p>}
        {events && events.events && events.events.length !== 0 ? (
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
              {events?.events.map((event) => (
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
        ) : (
          <EmptyState
            title="Keine Events"
            subtitle="Erstelle jetzt dein eigenes Event!"
            onClick={() => navigate("/create-event")}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserEvents;