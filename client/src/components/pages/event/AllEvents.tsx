import {
  eAddressResource,
  eventResource,
  eventsResource,
} from "../../../Resources";
import { getAllEvents, searchEvents } from "../../../backend/boardapi";
import { useEffect, useState } from "react";
import { Header } from "../../html/Header";
import Footer from "../../html/Footer";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import Input from "../../html/inputs/Input";
import Button from "../../html/Button";
import { Link, useLocation } from "react-router-dom";
import question from "../../../img/question.png";
import Event from "../../landingPage/Event";

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
};

const AllEvents: React.FC<AllEventsProps> = ({ }) => {
  const [query, setQuery] = useState("");
  const [plz, setPLZ] = useState("");
  const location = useLocation();
  const query1 = location.state && location.state.query;
  const plz1 = location.state && location.state.plz;

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

  useEffect(() => {
    setQuery(query1);
    setPLZ(plz1);
  }, []);

  const [events, setEvents] = useState<eventsResource | null>(null);
  //const [plz, setPLZ] = useState<string | null>(null);

  const load = async () => {
    if (query == "" || !query) {
      try {
        const events: eventsResource = await getAllEvents();
        events.events = events.events.filter((event) => {
          if (!plz) {
            return true;
          }
          return event.address.postalCode.includes(plz);
        });
        setEvents(events);
      } catch (err) {
        console.log(err);
        setEvents(null);
      }
    } else {
      // console.log("query: ", query);
      // console.log("plz: ", plz);
      try {
        const events: eventsResource = await searchEvents(query);
        events.events = events.events.filter((event) => {
          if (!plz) {
            return true;
          }
          return event.address.postalCode.includes(plz);
        });
        setEvents(events);
      } catch (err) {
        console.log(err);
        setEvents(null);
      }
    }
  };

  useEffect(() => {
    load();
  }, [query, plz]);

  useEffect(() => {
    if (query || plz) load();
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState("hidden");
  const [switchCategory, setSwitchCategory] = useState(false);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEventsData = await getAllEvents();
        let filteredEvents = allEventsData.events;
        if (selectedCategory !== "/") {
          filteredEvents = allEventsData.events.filter(
            (event) =>
              event.category &&
              event.category.some(
                (category) => category.name === selectedCategory
              )
          );
          if (selectedCategory === "") setEvents(allEventsData);
          else setEvents({ events: filteredEvents });
        } else if (selectedDate !== "") {
          filteredEvents = allEventsData.events.filter(
            (event) => JSON.stringify(event.date).slice(1, 11) === selectedDate
          );
          setEvents({ events: filteredEvents });
        }
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };

    fetchData();
  }, [selectedCategory, selectedDate, switchCategory]);

  useEffect(() => {
    window.addEventListener("resize", handleMobile);
  }, []);

  const handleMobile = () => {
    if (window.innerWidth < 414) setMobile("text-center");
    else setMobile("");
  };

  const handleFilterByCategory = (category: string) => {
    setQuery("");
    setPLZ("");
    setSelectedCategory(category);
    setSwitchCategory(!switchCategory);
    setSelectedDate("");
    if (window.innerWidth < 414) setHidden("hidden");
    setActive(category);

    if (category == "") reset();
  };

  const setActive = (category: string) => {
    const activeElements = document.querySelectorAll('.active');
    activeElements.forEach(element => {
      element.classList.remove('active');
    });

    const categoryElement = document.getElementById(category);

    if (categoryElement) {
      if (category === 'Filter') {
        const hasOnClass = categoryElement.classList.contains('on');

        if (hasOnClass) {
          categoryElement.classList.remove('on');
        } else {
          categoryElement.classList.add('on');
        }
      } else {
        categoryElement.classList.add('active');
      }
    }
  };

  const reset = () => {
    // Alle Elemente mit der Klasse "active" im div mit der Klasse "section-filter" auswählen
    const activeElements = document.querySelectorAll(".section-filter .active");
    // Konvertiere die NodeList zu einem Array
    const activeArray = Array.from(activeElements);
    activeArray.forEach((element) => {
      element.classList.remove("active");
    });
  };

  const handleFilterByDate = (date: string) => {
    setSelectedDate(date);
    setSelectedCategory("/");
    if (window.innerWidth < 414) setHidden("hidden");
  };

  const handleActive = () => {
    if (hidden == "hidden") setHidden("");
    else if (hidden == "") setHidden("hidden");
    setActive("Filter");
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
              <p>
                Entdecke mühelos Events mit unserer Suchfunktion! Finde
                Veranstaltungen nach Namen oder Hashtags, filtere optional nach
                PLZ. Echtzeit-Ergebnisse werden sofort angezeigt. Verfeinere die
                Auswahl mit benutzerfreundlichen Filtern, sogar ohne aktive
                Suche. Dein perfektes Event ist nur einen Klick entfernt!
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-1"></div>
                <div className="col-span-1 lg:col-span-10">
                  <form>
                    <Input
                      type="text"
                      label="Event suchen"
                      id="query"
                      defaultValue={query}
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
                      defaultValue={plz}
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
        {/* <EventFilter query={query1} plz={plz1} /> */}
        <div className="section-filter">
          {/* <input
          className={`inline-block w-36 px-2 py-4`}
          type="date"
          value={selectedDate || ""}
          onChange={(e) => handleFilterByDate(e.target.value)}
        /> */}
          <div className={`filter-btn`}>
            <Button
              label="Filter"
              id="Filter"
              className="w-36"
              onClick={handleActive}
            ></Button>
          </div>

          <div className="filter-box flex gap-1 md:gap-5">
            <div className={`inline-block ${hidden}`}>
              <Button
                id="Reset"
                label="Reset"
                onClick={() => handleFilterByCategory("")}
              />
            </div>
            <div className={`inline-block ${hidden}`}>
              <Button
                id="Kultur & Kunst"
                label="Kultur & Kunst"
                onClick={() => handleFilterByCategory("Kultur & Kunst")}
              />
            </div>
            <div className={`inline-block ${hidden}`}>
              <Button
                id="Konzert"
                label="Konzert"
                onClick={() => handleFilterByCategory("Konzert")}
              />
            </div>
            <div className={`inline-block ${hidden}`}>
              <Button
                id="Sport & Fitness"
                label="Sport & Fitness"
                onClick={() => handleFilterByCategory("Sport & Fitness")}
              />
            </div>
            <div className={`inline-block ${hidden}`}>
              <Button
                id="Gaming"
                label="Gaming"
                onClick={() => handleFilterByCategory("Gaming")}
              />
            </div>
            <div className={`inline-block ${hidden}`}>
              <Button
                id="Hobbys"
                label="Hobbys"
                onClick={() => handleFilterByCategory("Hobbys")}
              />
            </div>
            <div className={`inline-block ${hidden}`}>
              <Button
                label="Outdoor"
                id="Outdoor"
                onClick={() => handleFilterByCategory("Outdoor")}
              />
            </div>
            <div className={`inline-block ${hidden}`}>
              <Button
                id="Social"
                label="Social"
                onClick={() => handleFilterByCategory("Social")}
              />
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {events && events.events && events.events.length !== 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {events.events.map((event, index) => (
                  <Link to={`/event/${event.id}`} key={index}>
                    <Event
                      key={event.id}
                      id={event.id}
                      address={event.address}
                      date={event.date}
                      name={event.name}
                      description={event.description}
                      hashtags={event.hashtags}
                      participants={event.participants}
                      thumbnail={event.thumbnail!}
                      category={event.category?.map(
                        (category) => category.name
                      )}
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <p>keine Events gefunden</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllEvents;
