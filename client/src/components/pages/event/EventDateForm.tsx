import { FieldValues, useForm } from "react-hook-form";
import Input from "../../inputs/Input";
import { useState } from "react";
import FormWrapper from "./FormWrapper";
import { eventResource } from "../../../Resources";

type EventData = {
  address: {
    id?: string | undefined;
    street: string;
    houseNumber: string;
    apartmentNumber?: string | undefined;
    postalCode: string;
    city: string;
    stateOrRegion?: string | undefined;
    country: string;
  },
  date?: Date
}

type EventDateFormProps = EventData & {
    updateFields: (fields: Partial<EventData>) => void
} 

export default function EventDateForm({
  date,
  address,
  updateFields
}: EventDateFormProps) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset
      } = useForm<FieldValues>({
    });

    // const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   updateFields({
    //     address: {
    //       ...address,
    //       street: e.target.value
    //     }
    //   });
    // };
console.log(address)
  return (
    <FormWrapper title="Wann und wo möchtest du dein Event veranstalten?">
         <input
              type='text'
              id='address.street'
              placeholder="street"
              autoFocus
              required
              disabled={loading}
              value={address.street}
              onChange={(e) => updateFields({ address: { ...address, street: e.target.value } })}
            />


      
            <input
              type='text'
              id='address.houseNumber'
              placeholder="number"
              value={address.houseNumber}
              disabled={loading}
              onChange={(e) => updateFields({ address: { ...address, houseNumber: e.target.value } })}
            />
    
        
        
          
              <input
                type='text'
                id='address.city'
                placeholder="city"
                value={address.city}
                disabled={loading}
                onChange={(e) => updateFields({ address: { ...address, city: e.target.value } })}
              />
           
        
              <input
                type='text'
             
                id='address.country'
                placeholder="country"
                value={address.country}

             
                disabled={loading}
                onChange={(e) => updateFields({ address: { ...address, country: e.target.value } })}
              />
        
        
              <input
                type='text'
              
                id='address.postalCode'
                placeholder="postalCode"
                value={address.postalCode}

                
                disabled={loading}
                onChange={(e) => updateFields({ address: { ...address, postalCode: e.target.value } })}
              />
      
    
        <input
          type='text'
          
          id='address.stateOrRegion'
          placeholder="stateOrRegion"

          value={address.stateOrRegion}

         
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, stateOrRegion: e.target.value } })}
        />
        <input
          type='text'
       
          id='address.apartmentNumber'
          placeholder="apartmentNumber"

          value={address.apartmentNumber}

          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, apartmentNumber: e.target.value } })}
        />
        <input
          type='date'
       
          id='date'
          value={date?.toISOString().split('T')[0]}  // Ensure the value is in the correct format

          disabled={loading}
          onChange={(e) => updateFields({ date: new Date(e.target.value) })}
          />
    </FormWrapper>
  )
}
