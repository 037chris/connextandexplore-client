'use client'

import Container from "../Container";
import Hashtags from "./Hashtags";

interface EventProps {
    date:any,
    name:string,
    description:string,
    thumbnail?:string,
    hashtags?:string[]
    category?: string[]
    
}

const LocalEvents: React.FC<EventProps> = ({
    date,
    name,
    description,
    thumbnail,
    hashtags,
    category
  
}) => {
    return ( 
        <div className="bg-white flex w-full shadow rounded p-4">
            
                <div>
                <img
                  //src={process.env.PUBLIC_URL + imageUrl!}
                  src={thumbnail}
                  alt="test"
                  className="w-full"
                />
                <div className="mb-2">
                    <h1 className="text-2xl font-bold">{name}</h1>
                </div>
                <div className="mb-2">
                    <h2 className="text-gray-600">{date}</h2>
                </div>
                <div className="mb-2">
                    <h2 className="text-gray-800">{description}</h2>
                </div>
                <Hashtags hashtags={hashtags}/>
            </div>
        </div>
  );
};

 
export default LocalEvents;