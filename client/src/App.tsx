import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import UserSettings from "./components/pages/UserSettings";
import Modal from "./components/modals/Modal";
import ToasterProvider from "./providers/ToasterProvider";
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/pages/NotFound";
import { getUserIDFromJWT } from "./backend/boardapi";
import { useState } from "react";
import { UserIDContext } from "./UserIDContext";



// STYLES
import './sass/App.scss'
import UserProfile from "./components/pages/UserProfile";
import Events from "./components/pages/Events";
import EventDetails from "./components/pages/EventDetails";

export default function App() {
  const [userID, setUserID] = useState(getUserIDFromJWT());
  console.log("Initial user ID:", userID);
  
  return (
   <>
    
    <UserIDContext.Provider value={{ userID, setUserID }} >
      <Navbar />
      <ToasterProvider />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/about" element={<UserProfile/>}/>
          <Route path="/settings" element={<UserSettings activeTab={"profile"} />}/>
          <Route path="/event/:eventId" element={<EventDetails  />}/>
          <Route path="/events" element={<Events />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
    </UserIDContext.Provider>

   </>
   
   
  )
}


