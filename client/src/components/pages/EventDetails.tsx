'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent, getUserIDFromJWT, joinEvent } from '../../backend/boardapi';
import { eventResource } from '../../Resources';
import LoadingIndicator from '../LoadingIndicator';
import Hashtags from '../landingPage/Hashtags';
import Button from '../Button';



const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<eventResource>()
  const [joined,setJoined] = useState(false);
  useEffect(() => {
    const fetchEvent = async () => {
        if(eventId){
            const result = await getEvent(eventId);
            setEvent(result)
            if(event?.participants?.includes(getUserIDFromJWT())){
              setJoined(true)
            }
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
            <div className="bg-white flex w-full shadow rounded p-4">
            
            <div>
            <img
              //src={process.env.PUBLIC_URL + imageUrl!}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4zpIuafwUwAALiZhyewnZPBfWlm8OvxZIEawUIuHKw&s"
              alt="test"
              className="w-full"
            />
            <div className="mb-2">
                <h1 className="text-2xl font-bold">{event.name}</h1>
            </div>
            <div className="mb-2">
                <h2 className="text-gray-600">Datum{/*event.date*/}</h2>
            </div>
            <div className="mb-2">
                <h2 className="text-gray-800">{event.description}</h2>
            </div>
            <Hashtags hashtags={event.hashtags}/>
            <>
            {!joined ? (
                <Button label="Teilnehmen" onClick={()=>{joinEvent(eventId!)}}/>
            ) : (
              <Button disabled={true} label="Beigetreten" onClick={()=>{}}/>
            )}
            
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
