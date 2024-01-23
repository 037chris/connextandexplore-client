import React, { FormEvent, useEffect, useState } from "react";
import { useStepForm } from "../../hooks/useStepForm";

import EventDateForm from "./eventForm/EventDateForm";
import EventNameForm from "./eventForm/EventNameForm";
import EventDescriptionForm from "./eventForm/EventDescriptionForm";
import EventThumbnailForm from "./eventForm/EventThumbnailForm";
import EventSelectCategoryForm, {
  SelectOption,
} from "./eventForm/EventCategoryForm";

import { categoryResource, eventResource } from "../../../Resources";
import { createEvent, getEvent, updateEvent } from "../../../backend/boardapi";
import toast from "react-hot-toast";
import { useUserIDContext } from "../../../UserIDContext";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Header } from "../../html/Header";
import Footer from "../../html/Footer";

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
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);

  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>([]);
  let [errors, setErrors] = useState<Record<string, string>>({}); // Declare errors at the top

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
    value={value1}
    onChange={(o) => setValue1(o)}
    errors={errors}
  />,
    <EventNameForm {...data} updateFields={updateFields} />,
    <EventDescriptionForm {...data} updateFields={updateFields} />,
    <EventThumbnailForm {...data} updateFields={updateFields} />,
  ],
  [
    () => validateForm(data),
    () => validateCategorySelection(value1),
    () => validateName(data.name),
    () => validateDescription(data.description),
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

  // const handleNext = () => {
  //   if (isLastStep) {
  //     onSubmit();
  //   } else {
  //     onNext();
  //   }
  // };

  const validateCategorySelection = (selectedCategories: SelectOption[]) => {
    let formErrors: Record<string, string> = {};

    // Example validation logic for category selection
    if (selectedCategories.length === 0) {
      formErrors.value = "Bitte wählen Sie mindestens eine Kategorie aus.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const validateForm = (validatedData: eventResource) => {
    let formErrors: Record<string, string> = {};

    // Example validation logic for street address
    if (validatedData.address.street.length < 3) {
      formErrors.street = "Die Adresse muss mindestens 3 Zeichen lang sein.";
    } else if (validatedData.address.street.length > 50) {
      formErrors.street = "Die Adresse darf maximal 50 Zeichen lang sein.";
    } else if (!/^[a-zA-Z0-9äöüßÄÖÜ\s]+$/.test(validatedData.address.street)) {
      formErrors.street =
        "Die Adresse sollte nur Buchstaben, Zahlen und Leerzeichen enthalten.";
    }

    // Example validation logic for houseNumber address
    if (validatedData.address.houseNumber.length === 0) {
      formErrors.houseNumber = "Die Hausnummer ist erforderlich.";
    }

    // Validation for Postal Code
    if (
      !validatedData.address.postalCode ||
      validatedData.address.postalCode.trim().length === 0
    ) {
      formErrors.postalCode = "Die Postleitzahl ist erforderlich.";
    } else if (!/^\d{5}$/.test(validatedData.address.postalCode)) {
      formErrors.postalCode =
        "Ungültige Postleitzahl. Bitte geben Sie eine fünfstellige Zahl ein.";
    }

    // Example validation logic for City address
    if (
      !validatedData.address.city ||
      validatedData.address.city.trim().length === 0
    ) {
      formErrors.city = "Die Stadt ist erforderlich.";
    }
    // Example validation logic for Country address
    if (
      !validatedData.address.country ||
      validatedData.address.country.trim().length === 0
    ) {
      formErrors.country = "Das Land ist erforderlich.";
    }

    if (!validatedData.date) {
      formErrors.date = "Das Datum ist erforderlich.";
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      return true;
    }
    return false;
  };

  const validateName = (name: string) => {
    let formErrors: Record<string, string> = {};
    // Example validation logic for the name
    if (name.trim() === "") {
      formErrors.name = "Der Name ist erforderlich.";
    } else if (name.length < 3) {
      formErrors.name = "Der Name muss mindestens 3 Zeichen lang sein.";
    } else if (name.length > 20) {
      formErrors.name = "Der Name kann maximal 20 Zeichen lang sein.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const validateDescription = (description: string) => {
    let formErrors: Record<string, string> = {};

    // Example validation logic for the description
    if (description.trim() === "") {
      formErrors.description = "Die Beschreibung ist erforderlich.";
    } else if (description.length < 3) {
      formErrors.description =
        "Die Beschreibung muss mindestens 3 Zeichen lang sein.";
    } else if (description.length > 700) {
      formErrors.name = "Die Beschreibung kann maximal 700 Zeichen lang sein.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLastStep) {
      if (currentStepIndex === 1) {
        const isCategoryValid = validateCategorySelection(value1);
  
        if (isCategoryValid) {
          onNext();
        } else {
          console.error(
            `Step ${currentStepIndex} is not valid. Please review and correct the form.`
          );
        }
      } else {
        const isStepValid = validateForm(data);
  
        if (isStepValid) {
          onNext();
        } else {
          console.error(
            `Step ${currentStepIndex} is not valid. Please review and correct the form.`
          );
        }
      }
    } else {
    try {
      const convertedDate = typeof data.date === "string" ? new Date(data.date) : data.date;
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
        //toast.success("Event updated successfully!");
        toast.success("Event aktualisiert!");
        navigate(`/my-created-events`);
      } else {
        //toast.error("Failed to update the event.");
        toast.error("Eventbearbeitung fehlgeschlagen.");
      }
    } catch (error) {
      console.error(error);
      //toast.error("Something went wrong...");
      toast.error("Etwas ist fehlgeschlagen...");
    }
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
            <form onSubmit={onSubmit} className="event-form">
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
                      // handleNext();
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
