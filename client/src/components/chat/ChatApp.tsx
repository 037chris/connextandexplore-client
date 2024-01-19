import React, { useState, useEffect } from "react";
import "./chatapp.css";
import Button from "../Button";
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
            <Link
              to={`/event/${selectedEvent.id}`}
              style={{ position: "absolute", top: 100, right: 10 }}
            >
              {selectedEvent.name}
            </Link>
          </>
        );
    } else
      backgroundChat = (
        <>
          <Chat chatId={selectedRoom}></Chat>
          <Link
            to={`/event/${selectedEvent.id}`}
            style={{ position: "absolute", top: 100, right: 10 }}
          >
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
    if (closed == "") setClosed("close");
    else if (closed == "close") setClosed("");
  };

  return (
    <>
      <nav className={`sidebar ${closed}`}>
        <div className="menu-content">
          <ul className="menu-items mt-20">
            {dbEvents?.events.map((event) => (
              <div key={event.chat}>
                {selectedRoom === event.chat && (
                  <button
                    onClick={() => {
                      handleRoomSelect(event.chat!);
                      setSelectedEvent(event);
                    }}
                    style={{
                      width: "100%",
                      height: "100px",
                      padding: "10px 10px 10px 30px",
                      textAlign: "left",
                      borderRadius: "20px",
                      marginBottom: "10px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                    }}
                  >
                    {event.name}
                    <small>
                      <p>({event.participants?.length} Teilnehmer)</p>
                    </small>
                  </button>
                )}
                {selectedRoom !== event.chat && (
                  <button
                    onClick={() => {
                      handleRoomSelect(event.chat!);
                      setSelectedEvent(event);
                    }}
                    style={{
                      width: "100%",
                      height: "100px",
                      padding: "10px 10px 10px 30px",
                      textAlign: "left",
                      borderRadius: "20px",
                      marginBottom: "10px",
                      color: "black",
                    }}
                    className="bg-neutral-100 hover:bg-white transition"
                  >
                    {event.name}
                    <small>
                      <p>({event.participants?.length} Teilnehmer)</p>
                    </small>
                  </button>
                )}
              </div>
            ))}
          </ul>
          <div style={{ position: "fixed", bottom: 10, width: "230px" }}>
            <Button label={"Zurück"} onClick={() => navigate(-1)}></Button>
          </div>
        </div>
      </nav>
      <main className="main">
        <div
          style={{ position: "absolute", top: "95px", left: 5 }}
          onClick={handleSidebar}
        >
          <Button label={"Event Liste"} onClick={() => {}}></Button>
        </div>
        {selectedRoom ? (
          <>{backgroundChat}</>
        ) : (
          <p style={{ textAlign: "center" }}>kein Chat ausgewählt</p>
        )}
      </main>
    </>
  );
};

export default ChatApp;
