"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEvent,
  exitEvent,
  getEvent,
  getUserIDFromJWT,
  joinEvent,
} from "../../backend/boardapi";
import { eventResource, eventsResource } from "../../Resources";
import LoadingIndicator from "../LoadingIndicator";
import Hashtags from "../landingPage/Hashtags";
import Button from "../html/Button";
import "tailwindcss/tailwind.css";
import { useUserIDContext } from "../../UserIDContext";
import toast from "react-hot-toast";
import { format, isValid } from "date-fns";
import Footer from "../html/Footer";
import Comments from "./event/comments/Comments";
import { CreateComment } from "./event/comments/CreateComment";
import { HOST } from "../../backend/getHostApi";

const EventDetails: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId;
  const [event, setEvent] = useState<eventResource>();
  const [joined, setJoined] = useState(false);
  const [reload, setReload] = useState(false);

  const isOwner = event?.creator === getUserIDFromJWT();
  const [events, setEvents] = useState<eventsResource | null>(null);
  const { userID } = useUserIDContext();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false);

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
        setEvent(result);
        if (result.participants?.includes(getUserIDFromJWT())) {
          setJoined(true);
        } else {
          setJoined(false);
        }
      }
    };
    fetchEvent();
    setReload(false);
  }, [eventId, reload]);

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

      toast.success("Successfully Deleted!");
      navigate("/my-created-events", { replace: true });
    } catch (error) {
      console.log("Can't delete event:", error);
    }
  };

  const formattedDate = event?.date
    ? isValid(new Date(event?.date))
      ? format(new Date(event?.date), "PPP")
      : "Invalid Date"
    : "No Date";

  let participateButton;
  if (userID !== event?.creator) {
    if (!joined) {
      participateButton = (
        <Button
          label="Teilnehmen"
          onClick={async () => {
            setReload(await joinEvent(eventId!));
          }}
        />
      );
    } else {
      participateButton = (
        <Button
          label="Austreten"
          onClick={async () => {
            setReload(await exitEvent(eventId!));
          }}
          secondary
        />
      );
    }
  }

  let chatButton;
  if (joined) {
    chatButton = (
      <Button
        label="Chat"
        onClick={() => navigate("/chat", { state: { chatId: event?.chat } })}
      ></Button>
    );
  }


  const openAuthenticationModal = () => {
    setIsOpen(false);
    setAuthenticationModalIsOpen(true);
  };


  return (
    <>
      {event ? (
        <>
          <header>
            <div className="max-grid">
              <div className="header-event grid grid-cols-1 md:grid-cols-12 xl:grid-cols-12">
                {/* 2/3 GRID FOR HEADLINE + CREATOR + BUTTONS */}
                <div className="col-span-1 md:col-span-5 lg:col-span-6 xl:col-span-5">
                  <h1>{event!.name}</h1>
                  {/* UNDER GRID 3/3 CREATOR + BTNS */}
                  <div className="col-span-1 md:col-span-3">
                    {/* CREATOR */}
                    <div className="creator flex">
                      <div className="creator-profil-img">
                        <img src="" alt="Creator" />
                      </div>
                      <div className="creator-info">
                        <span>
                          Hosted by
                          <span>{event.creatorName?.first} {event.creatorName?.last}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* EDIT + DELETE EVENT  */}
                  {userID === event.creator && (
                    // BTN 1
                    <div className="btn flex gap-2">
                      <div>
                        <button
                          className="delete"
                          onClick={() => handleDeleteEvent(event.id!)}
                        >
                          Löschen
                        </button>
                      </div>
                      {/* BTN 2 */}
                      <div>
                        <button
                          className="edit"
                          onClick={() => navigate(`/edit-event/${event.id}`)}
                        >
                          Bearbeiten
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:col-span-1 xl:col-span-2"></div>
                {/* EVENT IMG GRID */}
                <div className="col-span-1 md:col-span-6 lg:col-span-5 xl:col-span-5">
                  {/* EVENT IMG CONTAINER */}
                  <div className="event-image">
                    <img src={
                      event.thumbnail
                        ? `${HOST}/images/events/${event.thumbnail}`
                        : "/images/CARD_IMG_Placeholder.jpg"
                    } alt={event!.name} />
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* START MAIN GRID */}
          <div className="max-grid content content-pt">
            {/* START EVENT BOX */}
            <div className="event-box grid grid-cols-1 md:grid-cols-3">
              <div className="col-span-1 min-h-fit event-content-box-left">
                <ul>
                  <li className="date">{event.date?.toString()}</li>
                  <li className="adress">
                    {event.address.street} {event.address.houseNumber}{" "}
                    <span>{event.address.city}</span>
                  </li>
                  <li className="participants">
                    {event.participants?.length} Teilnehmer
                  </li>
                </ul>
                <div className="btns">
                  {!joined ? (
                    <button
                      className="teilnehmen"
                      onClick={async () => {
                        setReload(await joinEvent(eventId!));
                      }}
                    >
                      Teilnehmen
                    </button>
                  ) : (
                    <>
                      <button
                        className="teilnehmen austreten"
                        onClick={async () => {
                          setReload(await exitEvent(eventId!));
                        }}
                      >
                        Austreten
                      </button>
                      <button className="bewerten" onClick={openAuthenticationModal}>
                        Bewerten
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 min-h-fit event-content-box-right">
                <h2 className="font-francisco">Details</h2>
                <p className="event-des">{event.description}</p>
              </div>
            </div>
            {/* END EVENT BOX */}
            {/* START HASHTAGS */}
            <div className="grid grid-cols-1">
              <div className="col-span-1">
                <Hashtags hashtags={event.hashtags} />
              </div>
            </div>
            {/* END HASHTAGS */}
            {/* START COMMENT SECTION */}
            <div className="grid grid-cols-1 commment-section">
              <div className="col-span-1">
                <h2>Kommentare</h2>
                <button className="bewerten" onClick={openAuthenticationModal}>
                  Bewerten
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <Comments eventId={event.id!} />
              </div>
            </div>
          </div>
          {/* END COMMENT SECTION */}
          {/* END GRID */}
          <Footer />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default EventDetails;
