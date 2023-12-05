'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../../backend/boardapi';
import { eventResource } from '../../Resources';
import LoadingIndicator from '../LoadingIndicator';



const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<eventResource>()
  useEffect(() => {
    const fetchEvent = async () => {
        if(eventId){
            const result = await getEvent(eventId);
            setEvent(result)
        }
        

    }
    fetchEvent();
  })
  return (
    <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {event ? (
            <h1>Eventdetails für Event {event!.name}</h1>
        ) : (
            <LoadingIndicator/>
        )}
    </div>
  );
};

export default EventDetails;
