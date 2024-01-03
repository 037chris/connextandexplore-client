import React, { FormEvent, useState } from 'react';
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

  const { userID } = useUserIDContext();
  const navigate = useNavigate();

  function updateFields(fields: Partial<eventResource>) {
    setData(prev => ({ ...prev, ...fields }));
  }

  const selectedCategories = value1.map(selectedOption => ({
    name: selectedOption.name,
    description: undefined, // Add a default or handle it as needed
  }));

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
    <div className='relative bg-white pt-24 px-4 md:px-0'>
      <div className='max-w-2xl mx-auto border-2 border-sky-500 rounded-md p-8'>
        <form onSubmit={onSubmit}>
          <div className='text-center mb-6'>
            <p className='text-xl font-semibold text-gray-800'>
              EVENT EINTRAGEN SCHRITT {currentStepIndex + 1} VON {steps.length}
            </p>
          </div>

          <div className='mb-8'>{step}</div>

          <div className='flex justify-between'>
            <div className='w-full md:w-1/4'>
              {!isFirstStep && (
                <button
                  className='bg-red-400 w-full h-12 rounded-md text-white font-semibold'
                  type='button'
                  onClick={onBack}
                >
                  Zurück
                </button>
              )}
            </div>
            <div className='w-full md:w-1/4'>
              <button
                className='bg-red-400 w-full h-12 rounded-md text-white font-semibold'
                type='submit'
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

export default CreateEventPage;
