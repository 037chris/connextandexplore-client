import * as React from "react";
import JoinedEvents from "../events/JoinedEvents";
import Footer from "../html/Footer";
import { Header } from "../html/Header";

const YourEvents = () => {
  return (
    <>
      <Header homeRoute={"page"} headline={"Beigetretende Events"} />
      <JoinedEvents />
      <Footer />
    </>
  );
};
export default YourEvents;
