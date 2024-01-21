"use client";

import { eAddressResource, eventResource } from "../../Resources";
import { getAllEvents } from "../../backend/boardapi";
import { useEffect, useState } from "react";
import { Header } from "../html/Header";
import Footer from "../html/Footer";
import EventFilter from "../pages/event/EventFilter";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import Input from "../html/inputs/Input";
import Button from "../html/Button";
import { Link } from "react-router-dom";
import  question  from "../../img/question.png"

interface AllEventsProps {
  //events: { date: any, name: string, description: string, imageUrl?: string, hashtags?:string[],category?: string }[]
}

const initAddress: eAddressResource = {
  street: "init",
  houseNumber: "init",
  postalCode: "init",
  city: "init",
  country: "init",
};

const initEvent: eventResource = {
  name: "hahahaha",
  description: "init",
  price: -1,
  date: new Date(),
  address: initAddress
};

const AllEvents: React.FC<AllEventsProps> = ({ }) => {
  const [dbEvents, setDbEvents] = useState({ events: [initEvent] });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const load = async () => {
    //let allDbEvents=await getAllEvents();
    //if(allDbEvents===-1)return
    setDbEvents(await getAllEvents());
  };

  useEffect(() => {
    // Hier wird der Filter angewendet, basierend auf der ausgewählten Kategorie
    const filteredEvents = dbEvents.events.filter(
      (event) =>
        event.category &&
        event.category.some((category) => category.name === selectedCategory)
    );
    // console.log(filteredEvents)
    // console.log(selectedCategory)
    load();
    document.title = "Alle Events - Connect & Explore";

    // Setze den Zustand mit den gefilterten Events
    setDbEvents({ events: filteredEvents });
  }, [selectedCategory]);

  const handleFilterByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const [query, setQuery] = React.useState<string>("");
  const [plz, setPLZ] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [mobile, setMobile] = useState("");

  const {
    register,
    //setError,
    formState: { errors },
  } = useForm<FieldValues>({});


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | File) => {
    if (e instanceof File || e === null) {
      return;
    }
    const { name, value } = e.target;
    if (name === "query") {
      setQuery(value);
    } else if (name === "plz") {
      setPLZ(value);
    }
  };

  return (
    <>
      <Header homeRoute={"page"} headline={"Events"} />
      <div className="bg-search">
        <div className="max-grid">
          {/* START SEARCH FORM */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="col-span-1 md:col-span-12 xl:col-span-1 xxl:col-span-2"></div>
            <div className="col-span-1 md:col-span-8 xxl:col-span-4">
              <p>Entdecke mühelos Events mit unserer Suchfunktion! Finde Veranstaltungen nach Namen oder Hashtags, filtere optional nach PLZ. Echtzeit-Ergebnisse werden sofort angezeigt. Verfeinere die Auswahl mit benutzerfreundlichen Filtern, sogar ohne aktive Suche. Dein perfektes Event ist nur einen Klick entfernt!</p>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-1"></div>
                <div className="col-span-1 lg:col-span-10">
                  <form>
                    <Input
                      type="text"
                      label="Event suchen"
                      id="query"
                      register={register}
                      errors={errors}
                      disabled={loading}
                      pattern={/^[A-Za-z0-9\s\-.]+$/}
                      onChangeFn={handleOnChange}
                    />
                    <Input
                      type="text"
                      label="Postleitzahl"
                      id="plz"
                      register={register}
                      errors={errors}
                      disabled={loading}
                      pattern={/^[A-Za-z0-9\s\-.]+$/}
                      onChangeFn={handleOnChange}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-4 xl:col-span-2 question">
              <div>
                <img src={question} alt="Du hast eine Frage?" />
              </div>
            </div>
          </div>

          {/* END SEARCH FORM */}
        </div>
      </div>
      <div className="max-grid content filter">
        {/*  FILTER */}
        <EventFilter query={query} /*setQuery={setQuery} setPLZ={setPLZ} */ plz={plz} />
      </div>
      <Footer />
    </>
  );
};

export default AllEvents;
