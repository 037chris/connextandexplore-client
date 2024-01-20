import React, { useState, useEffect } from "react";
import Button from "../html/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { eventsResource, eventResource } from "../../Resources";
import { getJoinedEvents } from "../../backend/boardapi";
import Chat from "./Chat";

const ChatApp = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [dbEvents, setDbEvents] = useState<eventsResource | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<
    eventResource | undefined
  >();
  const [closed, setClosed] = useState("");
  const [mobile, setMobile] = useState(false);
  const [eventLister, setEventLister] = useState<string>("Chats ausblenden");
  const location = useLocation();
  const chatId = location.state && location.state.chatId;

  const navigate = useNavigate();

  let backgroundChat;
  if (selectedRoom && selectedEvent) {
    if (!closed) {
      if (mobile) {
        backgroundChat = <div />;
      } else
        backgroundChat = (
          <>
            <Chat chatId={selectedRoom}></Chat>
            <Link to={`/event/${selectedEvent.id}`} className="chat-room">
              {selectedEvent.name}
            </Link>
          </>
        );
    } else
      backgroundChat = (
        <>
          <Chat chatId={selectedRoom}></Chat>
          <Link to={`/event/${selectedEvent.id}`} className="chat-room">
            {selectedEvent.name}
          </Link>
        </>
      );
  }

  useEffect(() => {
    const load = async () => {
      try {
        const joinedEvents = await getJoinedEvents();
        joinedEvents.events = joinedEvents.events.reverse();
        setDbEvents(joinedEvents);
        setSelectedRoom(chatId);
        window.addEventListener("resize", handleMobile);
      } catch (error) {
        console.error("Error fetching joined events:", error);
      }
    };
    document.title = 'Chats - Connect & Explore';
    load();
  }, []);

  const handleMobile = () => {
    if (window.innerWidth < 600) setMobile(true);
    else setMobile(false);
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const handleSidebar = () => {
    if (closed == "") {
      setClosed("close");
      setEventLister("Chats anzeigen")
    }
    else if (closed == "close") {
      setClosed("");
      setEventLister("Chats ausblenden")
    }
  };

  return (
    <>
      <div className={`sidebar ${closed}`}>
        <div className="menu-content">
          <ul className="menu-items">
            {dbEvents?.events.map((event) => (
              <li key={event.chat}>
                {selectedRoom === event.chat && (
                  <button
                    onClick={() => {
                      handleRoomSelect(event.chat!);
                      setSelectedEvent(event);
                    }}
                  >
                    {event.name}
                    <span>({event.participants?.length} Teilnehmer)</span>
                  </button>
                )}
                {selectedRoom !== event.chat && (
                  <button
                    onClick={() => {
                      handleRoomSelect(event.chat!);
                      setSelectedEvent(event);
                    }}
                    className="unchoosen"
                  >
                    {event.name}
                    <span>({event.participants?.length} Teilnehmer)</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="go-back">
            <Button label={"Zurück"} onClick={() => navigate(-1)}></Button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="event-list" onClick={handleSidebar}>
          <Button label={eventLister} onClick={() => { }}></Button>
        </div>
        {selectedRoom ? (
          <>{backgroundChat}</>
        ) : (
          <span style={{ textAlign: "center" }}>kein Chat ausgewählt</span>
        )}
      </div>
    </>
  );
};

export default ChatApp;
