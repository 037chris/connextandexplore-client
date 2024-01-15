'use client';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, exitEvent, getEvent, getUserIDFromJWT, joinEvent } from '../../backend/boardapi';
import { eventResource, eventsResource } from '../../Resources';
import LoadingIndicator from '../LoadingIndicator';
import Hashtags from '../landingPage/Hashtags';
import Button from '../Button';
import 'tailwindcss/tailwind.css';
import { useUserIDContext } from '../../UserIDContext';
import toast from 'react-hot-toast';
import { Header } from '../html/Header';
import Footer from '../html/Footer';


const EventDetails: React.FC = () => {
  const params = useParams()
  const eventId = params.eventId
  const [event, setEvent] = useState<eventResource>()
  const [joined, setJoined] = useState(false);
  const [reload, setReload] = useState(false);

  const isOwner = event?.creator === getUserIDFromJWT();
  const [events, setEvents] = useState<eventsResource | null>(null);
  const { userID } = useUserIDContext();
  const navigate = useNavigate();

  // export type eventResource = {
  //   id?: string;
  //   name: string;
  //   creator?: string;
  //   description: string;
  //   price: number;
  //   date?: Date;
  //   address: eAddressResource;
  //   thumbnail?: string;
  //   hashtags?: string[];
  //   category?: categoryResource[];
  //   chat?: string;
  //   participants?: string[];
  // };

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        const result = await getEvent(eventId);
        setEvent(result)
        if (result.participants?.includes(getUserIDFromJWT())) {
          setJoined(true)
        } else { setJoined(false) }
      }


    }
    fetchEvent();
    setReload(false);
  }, [eventId, reload])

  //Khatia
  const handleDeleteEvent = async (eventId: string): Promise<void> => {
    try {
      const currentUserEvent = await deleteEvent(eventId);
      setEvents((prev: eventsResource | null) => {
        if (prev) {
          const updatedEvents = {
            ...prev,
            events: prev.events.filter((event) => event.id !== eventId),
          };
          return updatedEvents;
        }
        return prev;
      });

      toast.success('Successfully Deleted!')
      navigate('/my-created-events', { replace: true });
    } catch (error) {
      console.log("Can't delete event:", error);
    }
  };

  return (
    <>
      {/* event!.name */}
      {event ? <>
        <Header homeRoute={'event'} headline={'test'} />
        <div className='max-grid content content-pt'>
          <div className="event-box grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 min-h-fit event-content-box-left">
              <ul>
                <li>{event.date?.toString()}</li>
                <li>{event.address.street} {event.address.houseNumber} <span>{event.address.city}</span></li>
                <li>{event.participants?.length} Teilnehmer</li>
              </ul>
              {userID !== event.creator && (
                <div className="btns">
                  <button
                    className='teilnehmen'
                    onClick={() => {}}
                  >
                    Teilnehmen
                  </button>
                  <button
                    className='bewerten'
                    onClick={() => {}}
                  >
                    Bewertung abgeben
                  </button>
                </div>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 min-h-fit event-content-box-right">
              <h2 className="font-francisco">Details</h2>
              <p className='event-des'>
                {event.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <Hashtags hashtags={event.hashtags} />
            </div>
          </div>
        </div>

        <div className="max-w-screen-md mx-auto p-4">
          <div>
            {/* <img

                  //src={process.env.PUBLIC_URL + imageUrl!}
                  src={process.env.PUBLIC_URL + '/Images/CARD_IMG_Placeholder.jpg'}
                  alt="test"
                  className="'w-full md:max-w-md mx-auto"
                /> */}
            <>
              <div className="ml-2mt-40">
                {!joined ? (
                  <Button label="Teilnehmen" onClick={async () => { setReload(await joinEvent(eventId!)) }} />
                ) : (
                  <Button label="Austreten" onClick={async () => { setReload(await exitEvent(eventId!)) }}

                    secondary
                  />
                )}
              </div>
              {/* Khatia */}
              {userID === event.creator && (
                <div>
                  <div>
                    <button
                      className='bg-red-400 text-white w-full md:w-52 h-12 rounded-md mt-10'
                      onClick={() => handleDeleteEvent(event.id!)}
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <button
                      className='bg-red-400 text-white w-full md:w-52 h-12 rounded-md mt-10'
                      onClick={() => navigate(`/edit-event/${event.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </>

          </div>
        </div>
        <Footer />
      </>
        : (
          <LoadingIndicator />
        )}
    </>
  );
};

export default EventDetails;
