"use client";

import { useNavigate } from "react-router-dom";


const Logo = () => {
  const navigate = useNavigate()
  return (
    <img 
        className="hidden md:block md:ml-20 cursor-pointer"
        height="150"
        width="150"
        src="/images/logo.png"
        alt="Logo" 
        onClick={() => navigate("/")}
    />
  )
}

export default Logo

