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




const EventDetails: React.FC = () => {
const params = useParams()
const eventId = params.eventId
  const [event, setEvent] = useState<eventResource>()
  const [joined,setJoined] = useState(false);
  const [reload,setReload] = useState(false);

const isOwner = event?.creator === getUserIDFromJWT();
const [events, setEvents] = useState<eventsResource | null>(null);
const { userID } = useUserIDContext();
const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
        if(eventId){
            const result = await getEvent(eventId);
            setEvent(result)
            if(result.participants?.includes(getUserIDFromJWT())){
              setJoined(true)
            }else{setJoined(false)}
        }
        

    }
    fetchEvent();
    setReload(false);
  },[eventId, reload])

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
    <div>
       <br />
       <br />
       <br />
        <br />
        {event ? (
            
            <div className="max-w-screen-md mx-auto p-4">
            <div>
            <img
            
              //src={process.env.PUBLIC_URL + imageUrl!}
              src={process.env.PUBLIC_URL + '/Images/CARD_IMG_Placeholder.jpg'}
              alt="test"
              className="'w-full md:max-w-md mx-auto"
            />
            <div className="mb-2">
                <h1 className="text-2xl font-bold">{event.name}</h1>
            </div>
            <div className="mb-2">
                <h2 className="text-gray-600">Datum{/*event.date*/}</h2>
            </div>
            
            <Hashtags hashtags={event.hashtags}/>
            
            <div className="bg-white flex flex-col w-full shadow rounded p-20 items-center">
            <div className="text-center">
                <h2 className="text-gray-80">{event.description}</h2>
            </div>
            </div>
            
            <>
           
            <div className="ml-2mt-40">
            {!joined ? (
                <Button label="Teilnehmen" onClick={async()=>{setReload(await joinEvent(eventId!))}}/>
            ) : (
              <Button label="Austreten" onClick={async() =>{setReload(await exitEvent(eventId!))}}
              
              secondary
              />
            )}

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

            </div>
                             
            
            </>
            
            </div> 
        </div>
   
        ) : (
            <LoadingIndicator/>
        )}
        
    </div>
  );
};

export default EventDetails;
