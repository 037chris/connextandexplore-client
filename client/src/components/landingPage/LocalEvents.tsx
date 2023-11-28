'use client'

import Container from "../Container";
import Event from "./Event";


interface LocalEventsProps {
     events: { date: any, name: string, description: string, imageUrl?: string, hashtags?:string[],category?: string }[]
}

const LocalEvents: React.FC<LocalEventsProps> = ({ events }) => {
    return (
      <div className="flex font-sans bg-blue-500">
        <Container>
          <h1 className="text-2xl font-bold my-6">Lokale Events in der Nähe von</h1>
          <div className="grid grid-cols-4 overflow-x-scroll gap-5">
            
            {events.map((event, index) => (
              <div key={index} className="mb-8 mx-2">
                <Event
                  key={index}
                  date={event.date}
                  name={event.name}
                  description={event.description}
                  thumbnail={event.imageUrl}
                  hashtags={event.hashtags}
                  
                />
            </div>
          ))}
        </div>
      </Container>
    </div>
    
  );
};

    
export default LocalEvents;