import React, { FormEvent, useEffect, useState } from 'react';
import { useStepForm } from '../hooks/useStepForm';

import EventDateForm from './event/EventDateForm';
import EventNameForm from './event/EventNameForm';
import EventDescriptionForm from './event/EventDescriptionForm';
import EventThumbnailForm from './event/EventThumbnailForm';
import EventSelectCategoryForm, { SelectOption } from './event/EventCategoryForm';

import { categoryResource, eventResource } from '../../Resources';
import { createEvent, getEvent, updateEvent } from '../../backend/boardapi';
import toast from 'react-hot-toast';
import { useUserIDContext } from '../../UserIDContext';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

const options = [
  { name: 'Kultur & Kunst', value: 1 },
  { name: 'Konzert', value: 2 },
  { name: 'Sport & Fitness', value: 3 },
  { name: 'Gaming', value: 4 },
  { name: 'Hobbys', value: 5 },
  { name: 'Outdoor', value: 6 },
  { name: 'Social', value: 7 },
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

const EditEventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [data, setData] = useState<eventResource>(INITIAL_DATA);
  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>([]);
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, onBack, onNext } = useStepForm([
    <EventDateForm {...data} updateFields={updateFields} />,
    <EventSelectCategoryForm multiple options={options} value={selectedCategories} onChange={setSelectedCategories} />,
    <EventNameForm {...data} updateFields={updateFields} />,
    <EventDescriptionForm {...data} updateFields={updateFields} />,
    <EventThumbnailForm {...data} updateFields={updateFields} />,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing event data by ID when the component mounts
    const fetchEvent = async () => {
      try {
        const event = await getEvent(eventId!);
        setData(event);

        const mappedCategories: SelectOption[] = event.category
          ? event.category.map((cat) => ({
              name: cat.name,
              value: cat.id || '',
            }))
          : [];

        setSelectedCategories(mappedCategories);

        if (!event.category) {
          updateFields({ category: [] });
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  function updateFields(fields: Partial<eventResource>) {
    setData((prev) => ({ ...prev, ...fields }));
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
      const convertedDate = typeof data.date === 'string' ? new Date(data.date) : data.date;

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
        toast.success('Event updated successfully!');
        navigate(`/my-created-events`);
      } else {
        toast.error('Failed to update the event.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong...');
    }
  };

  return (
    <div className="relative bg-white pt-24 px-4 md:px-0">
      <div className="max-w-2xl mx-auto border-2 border-sky-500 rounded-md p-8">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="text-center mb-6">
            <p className="text-gray-800 font-titan">
              {`EVENT AKTUALISIEREN SCHRITT ${currentStepIndex + 1} VON ${steps.length}`}
            </p>
          </div>

          <div className="mb-8">{steps[currentStepIndex]}</div>

          <div className="flex justify-between">
            <div className="w-full md:w-1/4">
              {!isFirstStep && (
                <button
                  className="bg-red-400 w-full h-12 rounded-md text-white font-sans font-medium"
                  type="button"
                  onClick={onBack}
                >
                  Zurück
                </button>
              )}
            </div>
            <div className="w-full md:w-1/4">
              <button
                className="bg-red-400 w-full h-12 rounded-md text-white font-medium"
                type="button"
                onClick={handleNext}
              >
                {isLastStep ? 'Fertigstellen' : 'Weiter'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
