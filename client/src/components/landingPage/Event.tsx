import { format, isValid, parse } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HOST } from "../../backend/getHostApi";

interface EventProps {
  id?: string;
  address?: {
    city: string;
    country: string;
  };
  date?: Date;
  name: string;
  description: string;
  thumbnail?: File | string;
  hashtags?: string[];
  category?: string[];
  participants?: string[];
}

const LocalEvents: React.FC<EventProps> = ({
  id,
  address,
  date,
  name,
  description,
  thumbnail,
  hashtags,
  category,
  participants,
}) => {
  const navigate = useNavigate();

  // Parse the date string if it's a string
  const parsedDate = typeof date === 'string' ? parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()) : date;

  // Format the date using date-fns format function
  const formattedDate = parsedDate ? (isValid(parsedDate) ? format(parsedDate, 'PPP, p') : 'Invalid Date') : 'No Date';
  // const params = useParams();
  // const eventId = params.eventId;

  return (
    <div className="col-span cursor-pointer group top-2 event-card">
      <div className="bg-white flex flex-col w-full p-4">
        <div className="w-full relative overflow-hidden img-round">
          <img
            src={
              thumbnail
                ? `${HOST}/images/events/${thumbnail}`
                : "/images/CARD_IMG_Placeholder.jpg"
            }
            width="318"
            height="179"
            alt="eventCard"
            className="object-cover w-full group-hover:scale-110 transition"
          />
        </div>
        <div className="mt-2 font-titan hl">{name}</div>
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
          <div>{formattedDate}</div>
        </div>
        <div className="flex flex-row items-center gap-2 font-light my-2">
          <div className="">
            <HiOutlineUserGroup className="text-red-500" />
          </div>
          <div>{participants?.length} Teilnehmer</div>
        </div>
        {/* <Hashtags hashtags={hashtags} /> */}
        <Link className="details" to={`/event/${id}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default LocalEvents;
