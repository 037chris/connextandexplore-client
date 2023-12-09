import React, { useEffect, useState } from 'react';

import { useUserIDContext } from '../../UserIDContext';
import { getCreatedEvent, getEvent, getEventOwner, getUser } from '../../backend/boardapi';
import Footer from '../web/Footer';

import { useNavigate, useParams } from 'react-router-dom';
import { eventResource, eventsResource, userResource } from '../../Resources';
import EmptyState from '../EmptyState';
import Container from '../Container';
import Event from "../landingPage/Event";

const user = {
  name: 'John Doe',
  location: 'Berlin, Country',
  imageSrc: '/images/profile-photo-about.png', // Replace with the actual path to the image
  socials: {
    instagram: 'instagram',
    facebook: 'facebook',
  },
};

const UserEvents: React.FC = () => {
  const { userID } = useUserIDContext();
  const navigate = useNavigate();
  const [events, setEvents] = useState<eventsResource | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const currentUserEvents: eventsResource = await getCreatedEvent(userID!);
        setEvents(currentUserEvents);
        console.log('User Event:', currentUserEvents);
      } catch (error) {
        console.error('Error fetching user events:', error);
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
        <Container>
        {loading && <p>Loading...</p>}
        {events?.events.length === 0 && <EmptyState />}
        <div className='pt-12 font-francisco text-2xl'>Meine Events</div>
            <div className='
                pt-24
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            '>
                {events?.events.map((event) => (
                <Event 
                key={event.id}
                date={event.date}
                name={event.name}
                description={event.description}   
                hashtags={event.hashtags}    
               
                />
                ))}
            </div>
        
        </Container>
   
      <Footer />
    </>
  );
};

export default UserEvents;
