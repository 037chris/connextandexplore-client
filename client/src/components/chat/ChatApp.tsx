import React, { useState, useEffect } from "react";
import { eventResource, eventsResource } from "../../Resources";
import { getJoinedEvents } from "../../backend/boardapi";
import Chat from "./Chat";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ChatApp: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [dbEvents, setDbEvents] = useState<eventsResource | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<eventResource | undefined>();

  const location = useLocation();
  const chatId = location.state && location.state.chatId;

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const joinedEvents = await getJoinedEvents();
        setDbEvents(joinedEvents);
        setSelectedRoom(chatId);
      } catch (error) {
        console.error("Error fetching joined events:", error);
      }
    };

    load();
  }, []);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className="max-grid" style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "16vw",
          marginTop: "0.5vh",
          backgroundColor: "#dddddd",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="mt-20" />
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
                  height: "8vh",
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
                  height: "8vh",
                  padding: "10px 10px 10px 30px",
                  textAlign: "left",
                  borderRadius: "20px",
                  marginBottom: "10px",
                  color: "black",
                }} className="bg-neutral-100 hover:bg-white transition"
              >
                {event.name}
                <small>
                  <p>({event.participants?.length} Teilnehmer)</p>
                </small>
              </button>
            )}
          </div>
        ))}
        <div style={{ flex: "1" }}></div>
        <div
          onClick={() => {navigate("/")}}
          className="hidden md:block font-semibold py-3 px-4 rounded-md bg-neutral-100 hover:bg-white transition cursor-pointer text-center"
          style={{marginBottom: "1vh"}}
        >
          Zurück
        </div>
      </div>
      <div
        style={{
          flex: "1",
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "#fcfcfc",
        }}
      >
        <div className="mt-20" />
        {selectedRoom ? (
          <>
            <Link
              to={`/event/${selectedEvent?.id}`}
              style={{ color: "#3b82f6" }}
            >
              {selectedEvent?.name}
            </Link>
            <Chat chatId={selectedRoom} />
          </>
        ) : (
          <p style={{ textAlign: "center" }}>kein Chat ausgewählt</p>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
