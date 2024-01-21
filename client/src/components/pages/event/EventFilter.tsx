import { MouseEvent, useEffect, useState } from "react";
import { eventsResource } from "../../../Resources";
import { getAllEvents, searchEvents } from "../../../backend/boardapi";
import { Link } from "react-router-dom";
import Button from "../../html/Button";
import Container from "../../Container";
import Event from "../../landingPage/Event";

export type EventFilterProps = {
  //setQuery: (query:string) => void;
  query: string;
  //setPLZ: (plz:string) => void;
  plz: string;
};
export default function EventFilter({ query, plz }: EventFilterProps) {
  //const [query, setQuery] = useState<string | null>(null);
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
    setSelectedCategory(category);
    setSwitchCategory(!switchCategory);
    setSelectedDate("");
    if (window.innerWidth < 414) setHidden("hidden");
    setActive(category);

    if (category == "") reset();
  };

  const setActive = (category: string) => {
    const categoryElement = document.getElementById(category);

    if (categoryElement) {
      const hasActiveClass = categoryElement.classList.contains('active');
      const hasOnClass = categoryElement.classList.contains('on');

      if (category === 'Filter') {
        if (hasOnClass) {
          categoryElement.classList.remove('on');
        } else {
          categoryElement.classList.add('on');
        }
      } else {
        if (hasActiveClass) {
          categoryElement.classList.remove('active');
        } else {
          categoryElement.classList.add('active');
        }
      }
    }
  }

  const reset = () => {
    // Alle Elemente mit der Klasse "active" im div mit der Klasse "section-filter" auswählen
    const activeElements = document.querySelectorAll('.section-filter .active');
    // Konvertiere die NodeList zu einem Array
    const activeArray = Array.from(activeElements);
    activeArray.forEach((element) => {
      element.classList.remove('active');
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
      <div className="section-filter">
        {/* <input
          className={`inline-block w-36 px-2 py-4`}
          type="date"
          value={selectedDate || ""}
          onChange={(e) => handleFilterByDate(e.target.value)}
        /> */}
        <div className={`filter-btn`}>
          <Button label="Filter" id="Filter" className="w-36" onClick={handleActive}></Button>
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
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                    category={event.category?.map((category) => category.name)}
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
    </>
  );
}
