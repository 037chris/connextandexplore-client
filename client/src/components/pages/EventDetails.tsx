'use client';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, exitEvent, getEvent, getUserIDFromJWT, joinEvent } from '../../backend/boardapi';
import { eventResource, eventsResource } from '../../Resources';
import LoadingIndicator from '../LoadingIndicator';
import Hashtags from '../landingPage/Hashtags';
import Button from '../html/Button';
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

      {event ? <>
        {/* <Header homeRoute={'event'} headline={'test'} /> */}
        <header>
          <div className="max-grid">
            <div className="header-event grid grid-cols-1 md:grid-cols-3">
              {/* 2/3 GRID FOR HEADLINE + CREATOR + BUTTONS */}
              <div className="col-span-1 md:col-span-2">
                <h1>{event!.name}</h1>
                {/* UNDER GRID 3/3 CREATOR + BTNS */}
                <div className="col-span-1 md:col-span-3">
                  {/* CREATOR */}
                  <div className="creator">
                    <img src="" alt="Creator" />
                    <span>
                      Hosted by
                      <span>
                        {event.creator}
                      </span>
                    </span>
                  </div>
                </div>
                {userID === event.creator && (
                  // BTN 1
                  <div>
                    <div>
                      <button
                        className='delete'
                        onClick={() => handleDeleteEvent(event.id!)}>
                        Löschen
                      </button>
                    </div>
                    {/* BTN 2 */}
                    <div>
                      <button
                        className='edit'
                        onClick={() => navigate(`/edit-event/${event.id}`)}>
                        Bearbeiten
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* EVENT IMG GRID */}
              <div className="col-span-1">
                  {/* EVENT IMG CONTAINER */}
                  <div className="event-image">

                  </div>
              </div>
            </div>
          </div>
        </header>
        <div className='max-grid content content-pt'>
          <div className="event-box grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 min-h-fit event-content-box-left">
              <ul>
                <li className="date">{event.date?.toString()}</li>
                <li className="adress">{event.address.street} {event.address.houseNumber} <span>{event.address.city}</span></li>
                <li className="participants">{event.participants?.length} Teilnehmer</li>
              </ul>
              <div className="btns">
                {!joined ? (
                  <button
                    className='teilnehmen'
                    onClick={async () => { setReload(await joinEvent(eventId!)) }}
                  >
                    Teilnehmen
                  </button>
                ) : (
                  <>
                    <button
                      className='teilnehmen austreten'
                      onClick={async () => { setReload(await exitEvent(eventId!)) }}
                    >
                      Austreten
                    </button>
                    <button
                      className='bewerten'
                      onClick={async () => { }}
                    >
                      Bewerten
                    </button>
                  </>
                )}
              </div>
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
          <hr />
          <div className="rewviews pt-2">
            <div className="grid grid-cols-1">
              <div className="col-span-1">
                <p>PLACEHOLDER</p>
              </div>
            </div>
          </div>
        </div>
        {/* END GRID */}
        <Footer />
      </>
        : (
          <LoadingIndicator />
        )}
    </>
  );
};

export default EventDetails;
