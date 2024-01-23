"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEvent,
  exitEvent,
  getEvent,
  getUserIDFromJWT,
  joinEvent,
  getUserInfos,
  getAVGRatingOfEvent,
} from "../../../backend/boardapi";
import { eventResource, eventsResource, userResourceNA } from "../../../Resources";
import LoadingIndicator from "../../LoadingIndicator";
import Hashtags from "../../landingPage/Hashtags";
import Button from "../../html/Button";
import "tailwindcss/tailwind.css";
import { useUserIDContext } from "../../../UserIDContext";
import toast from "react-hot-toast";
import { format, isValid } from "date-fns";
import Footer from "../../html/Footer";
import Comments from "./comments/Comments";
import { CreateComment } from "./comments/CreateComment";
import { HOST } from "../../../backend/getHostApi";
import { de } from "date-fns/locale"; // Import the German locale
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import RatingStarts from "./RatingStarts";

const EventDetails: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId;
  const [event, setEvent] = useState<eventResource>();
  const [eventOwner, setEventOwner] = useState<userResourceNA>();
  const [joined, setJoined] = useState(false);
  const [reload, setReload] = useState(false);

  const isOwner = event?.creator === getUserIDFromJWT();
  const [events, setEvents] = useState<eventsResource | null>(null);
  const { userID } = useUserIDContext();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {

    const fetchEvent = async () => {
      if (eventId) {
        const result = await getEvent(eventId);
        const creatorID = result.creator ? result.creator : "";
        const eventCreator = await getUserInfos(creatorID);
        setEventOwner(eventCreator);
        setEvent(result);
        document.title = `${result.name} - Connect & Explore`;
        if (result.participants?.includes(getUserIDFromJWT())) {
          setJoined(true);
        } else {
          setJoined(false);
        }
        const currentUser = await getUserIDFromJWT();
        if (currentUser) {
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
        }
        setRating(await getAVGRatingOfEvent(eventId));
      }
    };
    fetchEvent();
    setReload(false);
  }, [eventId, reload, rating]);

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

      //toast.success("Successfully Deleted!");
      toast.success("Event gelöscht!");
      navigate("/my-created-events", { replace: true });
      window.location.reload();
    } catch (error) {
      console.log("Can't delete event:", error);
    }
  };

  let participateButton;
  if ((userID) && (userID !== event?.creator)) {
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
                  <RatingStarts numb={rating} />
                  {/* UNDER GRID 3/3 CREATOR + BTNS */}
                  <div className="col-span-1 md:col-span-3">
                    {/* CREATOR */}
                    <div className="creator flex">
                      <div className="creator-profil-img">
                        <img
                          src={
                            eventOwner?.profilePicture && eventOwner?.isActive
                              ? `${HOST}/images/users/${eventOwner?.profilePicture}`
                              : "/images/placeholder.jpg"
                          }
                          alt="Creator"
                        />
                      </div>
                      <div className="creator-info">
                        <span>
                          veranstaltet von
                          <span>
                            {eventOwner?.name.first} {eventOwner?.name.last}
                            {eventOwner?.isActive ? "" : " (inaktiv)"}
                          </span>
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
                    <img
                      src={
                        event.thumbnail
                          ? `${HOST}/images/events/${event.thumbnail}`
                          : "/images/CARD_IMG_Placeholder.jpg"
                      }
                      alt={event!.name}
                    />
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
                  <li className="date">
                    {event.date
                      ? format(new Date(event?.date), "PPPPp", { locale: de })
                      : "No Date"}
                  </li>
                  <li className="adress">
                    {event.address.street} {event.address.houseNumber}{" "}
                    <p>{event.address.postalCode} {event.address.city}, {event.address.country}</p>
                  </li>
                  <li className="participants">
                    {event.participants?.length} Teilnehmer
                  </li>
                </ul>
                <div className="btns">
                  {userLoggedIn && !isOwner && (!joined ? (
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

                    </>
                  ))}
                  {joined && (<button className="bewerten mb-2" onClick={() => navigate('/chat', { state: { chatId: event.chat } })}>
                    Chat
                  </button>)}
                  {!isOwner && joined && (<button className="bewerten" onClick={openAuthenticationModal}>
                    Bewerten
                  </button>)}
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Comments eventId={event.id!} />
              </div>
            </div>
          </div>
          <CreateComment isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} />
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
