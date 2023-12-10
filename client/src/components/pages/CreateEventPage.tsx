import React, { FormEvent, useState } from 'react'
import { useStepForm } from '../hooks/useStepForm'

import EventDateForm from './event/EventDateForm';


import EventNameForm from './event/EventNameForm';
import EventDescriptionForm from './event/EventDescriptionForm';
import EventThumbnailForm from './event/EventThumbnailForm';
import { categoryResource, eventResource, eventsResource } from '../../Resources';
import EventSelectCategoryForm, { SelectOption } from './event/EventCategoryForm';
import { createEvent, postEvent } from '../../backend/boardapi';
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
]


const defaultCategoryResource: categoryResource = {
    id: undefined,
    name: '',
    description: undefined,
  };

  

const INITIAL_DATA: eventResource = {
    id: undefined,
    name: '',
    creator:  undefined,
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
    const [value1, setValue1] = useState<SelectOption[]>([options[0]])
    const [value2, setValue2] = useState<SelectOption | undefined>(options[0])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const navigate = useNavigate();


    const { userID } = useUserIDContext();

    function updateFields(fields: Partial<eventResource> ) {
        setData(prev => {
           return { ...prev, ...fields }
        })
    }

    const selectedCategories = value1.map((selectedOption) => ({
        name: selectedOption.name,
        description: undefined, // Add a default or handle it as needed
      }));

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, onBack, onNext } = useStepForm([
        <EventDateForm {...data} updateFields={updateFields} />,
        <EventSelectCategoryForm
            multiple
            options={options}
            value={value1}
            onChange={o => setValue1(o)}
        />,
         <EventNameForm {...data} updateFields={updateFields} />, 
         <EventDescriptionForm {...data} updateFields={updateFields} />,
         <EventThumbnailForm {...data} updateFields={updateFields} />
    ]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLastStep) {
          return onNext();
        }
    
        try {
          setLoading(true);
    
          // Assuming data is properly formatted based on your eventResource structure
          const success = await createEvent({
              // ...data, // Include the necessary data properties from your form
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
                  country: data.address.country
              },
              category: selectedCategories,
              thumbnail: data.thumbnail,
              hashtags: data.hashtags
          });

         
    

          if (success) {
            toast.success('Event created successfully!');
            navigate(`/events`)
          } else {
            toast.error('Failed to create the event.');
            // Handle the case where event creation fails
          }
        } catch (error) {
          console.error(error);
          toast.error('Something went wrong...');
        } finally {
          setLoading(false);
        }
      };
      

  return (
    <div className='relative bg-white pt-52 gap-4'>
        <div className='border-2 border-sky-500'>
            <form onSubmit={onSubmit}>
                <div  className='absolute top-36 right-1/2 font-titan text-center'>
                EVENT EINTRAGEN SCHRITT {currentStepIndex + 1} VON {steps.length}
                </div>
                    {step}
                <div className='flex flex-row gap-3 justify-center'>
                    <div className='w-24 md:w-32 '>
                        {!isFirstStep && 
                            <button  className='bg-red-400 w-full md:w-52 h-12 rounded-md' type='button' onClick={onBack}>
                                Zurück
                            </button>
                        }
                    </div>
                    <div className='w-24 md:w-32'>
                            <button className='bg-red-400 w-full md:w-52 h-12 rounded-md' type='submit'>
                                {isLastStep ? "Fertigstellen" : "Weiter"}
                            </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEventPage