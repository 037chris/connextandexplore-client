import React, { useEffect, useState, FormEvent } from 'react';
import { useStepForm } from '../hooks/useStepForm';

import EventDateForm from './event/EventDateForm';
import EventNameForm from './event/EventNameForm';
import EventDescriptionForm from './event/EventDescriptionForm';
import EventThumbnailForm from './event/EventThumbnailForm';
import EventSelectCategoryForm, { SelectOption } from './event/EventCategoryForm';

import { categoryResource, eventResource } from '../../Resources';
import { createEvent } from '../../backend/boardapi';
import toast from 'react-hot-toast';
import { useUserIDContext } from '../../UserIDContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../html/Footer';
import { Header } from '../html/Header';

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
  name: '',
  description: undefined,
};

const INITIAL_DATA: eventResource = {
  id: undefined,
  name: '',
  creator: undefined,
  description: '',
  price: 0,
  date: undefined,
  address: {
    street: '',
    houseNumber: '',
    apartmentNumber: undefined,
    postalCode: '',
    city: '',
    stateOrRegion: undefined,
    country: '',
  },
  thumbnail: undefined,
  hashtags: [],
  category: [defaultCategoryResource],
  chat: undefined,
  participants: undefined,
};

const CreateEventPage = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, onBack, onNext } = useStepForm([
    <EventDateForm {...data} updateFields={updateFields} />,
    <EventSelectCategoryForm multiple options={options} value={value1} onChange={o => setValue1(o)} />,
    <EventNameForm {...data} updateFields={updateFields} />,
    <EventDescriptionForm {...data} updateFields={updateFields} />,
    <EventThumbnailForm {...data} updateFields={updateFields} />,
  ]);
  const [headlineString, setHeadlineString] = useState(`Event erstellen: Schritt ${currentStepIndex + 1} von ${steps.length}`);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Events erstellen: Connect & Explore';
    let newHeadlineString = `Event erstellen: Schritt ${currentStepIndex + 1} von ${steps.length}`;
    setHeadlineString(newHeadlineString);
    const fetchData = async () => {
      // Fetch any data needed for the current step
      // You can perform async operations here if needed
    };

    fetchData();

  }, [currentStepIndex]); // Only run the effect when the currentStepIndex changes

  function updateFields(fields: Partial<eventResource>) {
    setData(prev => ({ ...prev, ...fields }));
  }

  const selectedCategories = value1.map(selectedOption => ({
    name: selectedOption.name,
    description: undefined,
  }));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLastStep) {
      return onNext();
    }

    try {
      const success = await createEvent({
        name: data.name,
        date: data.date ? new Date(data.date) : undefined,
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
        category: selectedCategories,
        thumbnail: data.thumbnail,
        hashtags: data.hashtags,
      });

      if (success) {
        toast.success('Event created successfully!');
        navigate(`/my-created-events`);
      } else {
        toast.error('Failed to create the event.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong...');
    }
  };

  return (
    <>
      <Header homeRoute={'page'} headline={headlineString} />
      <div className="progressbar"><span style={{ width: `${(currentStepIndex + 1 - 0.5) * 20}%` }}></span></div>
      <div className="max-grid content">
        <div className='relative bg-white px-4 md:px-0'>
          <div className='max-w-2xl mx-auto p-8'>
            <form onSubmit={onSubmit} className="event-form">
              <div className='mb-8 step-name'>{step}</div>
              <div className='flex justify-between'>
                <div className='w-full md:w-1/4'>
                  {!isFirstStep && (
                    // zurück
                    <button
                      className='btn-event event-back font-sans'
                      type='button'
                      onClick={() => {
                        onBack();
                        scrollToTop(); // Hier wird die Scroll-to-Top-Funktion aufgerufen
                      }}
                    >
                      Zurück
                    </button>
                  )}
                </div>
                <div className='w-full md:w-1/4'>
                  {/* // weiter */}
                  <button
                    className='btn-event event-next font-sans'
                    type='submit'
                    onClick={() => {
                      //onNext();
                      scrollToTop();
                    }}
                  >
                    {isLastStep ? 'Fertigstellen' : 'Weiter'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div><Footer />
    </>
  );
};

export default CreateEventPage;
