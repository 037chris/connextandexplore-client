import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

export default function App() {

  return (
   <>

   <Navbar />
   <RegisterModal/>
   <ToasterProvider />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
   </>
   
   
  )
}


