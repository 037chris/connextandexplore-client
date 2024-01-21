import * as React from "react";
import JoinedEvents from "../events/JoinedEvents";
import Footer from "../html/Footer";
import { Header } from "../html/Header";

const YourEvents = () => {
  return (
    <>
      <Header homeRoute={"page"} headline={"Deine Zusagen"} />
        <JoinedEvents />
      <Footer />
    </>
  );
};
export default YourEvents;
