import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import Modal from "./components/modals/Modal";
import ToasterProvider from "./providers/ToasterProvider";
import SignUp from "./components/pages/SignUp";

export default function App() {

  return (
   <>

   <Navbar />

   <ToasterProvider />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
   </>
   
   
  )
}


