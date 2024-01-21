import React, { FormEvent, useEffect, useState } from "react";
import { useStepForm } from "../hooks/useStepForm";

import EventDateForm from "./event/EventDateForm";
import EventNameForm from "./event/EventNameForm";
import EventDescriptionForm from "./event/EventDescriptionForm";
import EventThumbnailForm from "./event/EventThumbnailForm";
import EventSelectCategoryForm, {
  SelectOption,
} from "./event/EventCategoryForm";

import { categoryResource, eventResource } from "../../Resources";
import { createEvent, getEvent, updateEvent } from "../../backend/boardapi";
import toast from "react-hot-toast";
import { useUserIDContext } from "../../UserIDContext";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Header } from "../html/Header";
import Footer from "../html/Footer";

const options = [
  { name: "Kultur & Kunst", value: 1 },
  { name: "Konzert", value: 2 },
  { name: "Sport & Fitness", value: 3 },
  { name: "Gaming", value: 4 },
  { name: "Hobbys", value: 5 },
  { name: "Outdoor", value: 6 },
  { name: "Social", value: 7 },
];

const defaultCategoryResource: categoryResource = {
  id: undefined,
  name: "",
  description: undefined,
};

const INITIAL_DATA: eventResource = {
  id: undefined,
  name: "",
  creator: undefined,
  description: "",
  price: 0,
  date: undefined,
  address: {
    street: "",
    houseNumber: "",
    apartmentNumber: undefined,
    postalCode: "",
    city: "",
    stateOrRegion: undefined,
    country: "",
  },
  thumbnail: undefined,
  hashtags: [],
  category: [defaultCategoryResource],
  chat: undefined,
  participants: undefined,
};

const EditEventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [data, setData] = useState<eventResource>(INITIAL_DATA);
  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>(
    []
  );
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    onBack,
    onNext,
  } = useStepForm([
    <EventDateForm {...data} updateFields={updateFields} />,
    <EventSelectCategoryForm
      multiple
      options={options}
      value={selectedCategories}
      onChange={setSelectedCategories}
    />,
    <EventNameForm {...data} updateFields={updateFields} />,
    <EventDescriptionForm {...data} updateFields={updateFields} />,
    <EventThumbnailForm {...data} updateFields={updateFields} />,
  ]);

  const navigate = useNavigate();

  const [headlineString, setHeadlineString] = useState(
    `Event bearbeiten: Schritt ${currentStepIndex + 1} von ${steps.length}`
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Fetch existing event data by ID when the component mounts
    const fetchEvent = async () => {
      try {
        const event = await getEvent(eventId!);

        setData(event);
        //console.log("Data before upload:", data);
        const mappedCategories: SelectOption[] = event.category
          ? event.category.map((cat) => ({
            name: cat.name,
            value: cat.id || "",
          }))
          : [];

        setSelectedCategories(mappedCategories);
        document.title = `${data.name} bearbeiten - Connect & Explore`;
        if (!event.category) {
          updateFields({ category: [] });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  function updateFields(fields: Partial<eventResource>) {
    console.log("prev data:", fields);
    setData((prev) => ({ ...prev, ...fields }));
    console.log("afetr update:", data);
    if (data.thumbnail instanceof String) {
      data.thumbnail = undefined;
    }
  }

  const handleNext = () => {
    if (isLastStep) {
      onSubmit();
    } else {
      onNext();
    }
  };

  const onSubmit = async () => {
    try {
      const convertedDate =
        typeof data.date === "string" ? new Date(data.date) : data.date;
      console.log("data to send Event:", data);
      console.log("data.thumbnail:", data.thumbnail);
      const success = await updateEvent(eventId!, {
        name: data.name,
        date: convertedDate,
        description: data.description,
        price: data.price,
        address: {
          id: undefined,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          apartmentNumber: undefined,
          postalCode: data.address.postalCode,
          city: data.address.city,
          stateOrRegion: undefined,
          country: data.address.country,
        },
        category: selectedCategories.map((selectedOption) => ({
          name: selectedOption.name,
          description: undefined,
        })),
        thumbnail: data.thumbnail,
        hashtags: data.hashtags,
      });

      if (success) {
        toast.success("Event updated successfully!");
        navigate(`/my-created-events`);
      } else {
        toast.error("Failed to update the event.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <>
      <Header homeRoute={"page"} headline={headlineString} />
      <div className="progressbar">
        <span style={{ width: `${(currentStepIndex + 1 - 0.5) * 20}%` }}></span>
      </div>
      <div className="max-grid content">
        <div className="relative bg-white px-4 md:px-0">
          <div className="max-w-2xl mx-auto md:p-8">
            <form onSubmit={(e) => e.preventDefault()} className="event-form">
              <div className="mb-8">{steps[currentStepIndex]}</div>

              <div className="md:flex justify-between">
                <div className="w-full md:w-1/4">
                  {!isFirstStep && (
                    // zurück
                    <button
                      className="btn-event event-back font-sans"
                      type="button"
                      onClick={() => {
                        onBack();
                        scrollToTop(); // Hier wird die Scroll-to-Top-Funktion aufgerufen
                      }}
                    >
                      Zurück
                    </button>
                  )}
                </div>
                <div className="w-full md:w-1/4">
                  {/* // weiter */}
                  <button
                    className="btn-event event-next font-sans"
                    type="submit"
                    onClick={() => {
                      handleNext();
                      scrollToTop();
                    }}
                  >
                    {isLastStep ? "Fertigstellen" : "Weiter"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default EditEventPage;
