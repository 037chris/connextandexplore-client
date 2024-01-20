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
  address: initAddress,
  thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4zpIuafwUwAALiZhyewnZPBfWlm8OvxZIEawUIuHKw&s",
};

const AllEvents: React.FC<AllEventsProps> = ({}) => {
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
    document.title = "Alle Events bei uns - Connect & Explore";

    // Setze den Zustand mit den gefilterten Events
    setDbEvents({ events: filteredEvents });
  }, [selectedCategory]);

  const handleFilterByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const [query, setQuery] = React.useState<string>("");
  const [plz, setPLZ] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

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
      <Header homeRoute={"page"} headline={"Alle Events"} />
      <div className="max-grid content content-pt ">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
            <form>
              <label>
                <Input
                  type="text"
                  label="Event suchen"
                  id="query"
                  register={register}
                  errors={errors}
                  disabled={loading}
                  pattern={/^[A-Za-z0-9\s\-.]+$/}
                  onChangeFn={handleOnChange}
                  customInputClassNames=" "
                  customLabelClassNames=" "
                />
              </label>
              <label>
                <Input
                  type="text"
                  label="Postleitzahl"
                  id="plz"
                  register={register}
                  errors={errors}
                  disabled={loading}
                  pattern={/^[A-Za-z0-9\s\-.]+$/}
                  onChangeFn={handleOnChange}
                  customInputClassNames=" "
                  customLabelClassNames=" "
                />
              </label>
            </form>
            <br />
            <div className="flex">
              <EventFilter
                query={query}
                /*setQuery={setQuery} setPLZ={setPLZ} */ plz={plz}
              ></EventFilter>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEvents;
