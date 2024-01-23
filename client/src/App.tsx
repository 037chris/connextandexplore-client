import { Route, Routes } from "react-router-dom";
import Navbar from "./components/html/navbar/Navbar";
import Home from "./components/pages/Home";
import UserSettings from "./components/pages/user/UserSettings";
import Modal from "./components/modals/Modal";
import ToasterProvider from "./providers/ToasterProvider";
import SignUp from "./components/SignUp";
import NotFound from "./components/pages/errors/NotFound";
import { getUserIDFromJWT } from "./backend/boardapi";
import { useState } from "react";
import { UserIDContext } from "./UserIDContext";

// STYLES
import "./sass/App.scss";

import CreateEventPage from "./components/pages/event/CreateEventPage";
import EventDetails from "./components/pages/event/EventDetails";
import UserEvents from "./components/pages/user/UserEvents";
import PrivateRoute from "./components/PrivateRoute";
import EditEventPage from "./components/pages/event/EditEventPage";
import Dsgvo from "./components/pages/general/Dsgvo";
import Agbs from "./components/pages/general/Agbs";
import Impressum from "./components/pages/general/Impressum";
import Help from "./components/pages/general/Help";
import ChatApp from "./components/chat/ChatApp";
import { AvatarProvider } from "./actions/AvatarContext";
import { CommentProvider } from "./actions/commentContext";
import AllEvents from "./components/pages/event/AllEvents";
import JoinedEvents from "./components/pages/user/JoinedEvents";

export default function App() {
  const [userID, setUserID] = useState(getUserIDFromJWT());

  return (
    <>
      <AvatarProvider>
        <CommentProvider>
          <UserIDContext.Provider value={{ userID, setUserID }}>
            <Navbar />
            <ToasterProvider />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />

              <Route element={<PrivateRoute />}>
                {/* <Route path="/about" element={<UserProfile/>}/> */}
                <Route
                  path="/settings"
                  element={<UserSettings activeTab={"profile"} />}
                />
                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/my-created-events" element={<UserEvents />} />
                <Route
                  path="/edit-event/:eventId"
                  element={<EditEventPage />}
                />
                <Route path="/chat" element={<ChatApp />} />
              </Route>

              <Route path="/event/:eventId" element={<EventDetails />} />
              <Route path="/events" element={<AllEvents />} />
              <Route path="/yourevents" element={<JoinedEvents />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/events/undefined" element={<NotFound />} />

              <Route path="/dsgvo" element={<Dsgvo />} />
              <Route path="/agbs" element={<Agbs />} />
              <Route path="/imprint" element={<Impressum />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </UserIDContext.Provider>
        </CommentProvider>
      </AvatarProvider>
    </>
  );
}
