'use client'

import { format, isValid } from "date-fns";
import Container from "../Container";
import Hashtags from "./Hashtags";
import { useNavigate, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";

interface EventProps {
    id?: string,
    address?: {
        city: string;
        country: string;
    }
    date?: Date,
    name: string,
    description: string,
    thumbnail?: string,
    hashtags?: string[],
    category?: string[],
    participants?: string[];
}

const LocalEvents: React.FC<EventProps> = ({
    id,
    address,
    date,
    name,
    description,
    thumbnail: imageUrl,
    hashtags,
    category,
    participants

}) => {
    const navigate = useNavigate();
    const formattedDate = date ? (isValid(new Date(date)) ? format(new Date(date), 'PPP') : 'Invalid Date') : 'No Date';
   
    const params = useParams();
    const eventId = params.eventId; 

    const handleNavigate = () => {
        if (eventId) {
            console.log('Navigating to event:', eventId);
            navigate(`/event/${eventId}`);
        } else {
            console.error('No eventId found in params.');
            // Handle the case where eventId is not defined, e.g., show an error message or navigate to a default page.
        }
    };

    return (
        <div className="col-span cursor-pointer group top-2 event-card">
            <div className="bg-white flex flex-col w-full p-4">
                <div className="w-full relative overflow-hidden img-round">
                    <img
                        //src={process.env.PUBLIC_URL + imageUrl!}
                        src="/images/CARD_IMG_Placeholder.jpg"
                        width="318"
                        height="179"
                        alt="eventCard"
                        className="object-cover w-full group-hover:scale-110 transition"
                    />
                </div>
                <div className="mt-2 font-titan hl">
                    {name}
                </div>
                <div className="flex flex-row items-center gap-2 font-light mt-2">
                    <div className="">
                        <IoLocationOutline className="text-red-500" />
                    </div>
                    <div>
                        {address?.city}, {address?.country}
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 font-light mt-2">
                    <div className="">
                        <IoCalendarOutline className="text-red-500" />
                    </div>
                    <div>
                        {formattedDate}
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 font-light my-2">
                    <div className="">
                        <HiOutlineUserGroup className="text-red-500" />
                    </div>
                    <div>
                        {participants?.length} Teilnehmer
                    </div>
                </div>
                <Hashtags hashtags={hashtags} />
            </div>
        </div>
    );
};

export default LocalEvents;