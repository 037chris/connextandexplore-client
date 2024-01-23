'use client'

import { Link, useNavigate } from "react-router-dom";
import { eventResource } from "../../Resources";
import Container from "../html/Container";
import Event from "./Event";

interface OwnNewest4EventsProps {
  events: eventResource[]
}

const OwnNewest4Events: React.FC<OwnNewest4EventsProps> = ({ events }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="font-francisco">
        <span className="cursor-pointer" onClick={() => navigate("/my-created-events")}>Deine Events</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-x-auto gap-5">
        {events.map((event, index) => (
          <div key={index} className="mb-8 mx-2">
            <Link to={`/event/${event.id}`}>
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
          </div>
        ))}
      </div>

    </>
  );
};


export default OwnNewest4Events;