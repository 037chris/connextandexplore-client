'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { exitEvent, getEvent, getUserIDFromJWT, joinEvent } from '../../backend/boardapi';
import { eventResource } from '../../Resources';
import LoadingIndicator from '../LoadingIndicator';
import Hashtags from '../landingPage/Hashtags';
import Button from '../Button';
import 'tailwindcss/tailwind.css';



const EventDetails: React.FC = () => {
const params = useParams()
const eventId = params.eventId
  const [event, setEvent] = useState<eventResource>()
  const [joined,setJoined] = useState(false);
  const [reload,setReload] = useState(false);
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
