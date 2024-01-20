import { useState } from "react";
import FormWrapper from "./FormWrapper";
import { format } from "date-fns";


interface Address {
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
  stateOrRegion?: string;
  country: string;
}

type EventData = {
  address: Address;
  date?: Date | undefined;
  
};

type EventDateFormProps = EventData & {
  updateFields: (fields: Partial<EventData>) => void;
  errors?: Record<string, string>; // Add this line

};

export default function EventDateForm({
  date,
  address,
  updateFields,
  errors, 

}: EventDateFormProps) {
  const [loading, setLoading] = useState(false);



  
  
  return (
    <FormWrapper title="Wann und wo möchtest du dein Event veranstalten?">
      <div className="form-container">
      <input
        type="text"
        id="street"
        placeholder="Straße"
        autoFocus
        disabled={loading}
        value={address.street}
        onChange={(e) =>
          updateFields({
            address: {
              ...(address as any), // Type assertion to any to avoid TypeScript error
              street: e.target.value
            }
          })
        }
        className={`border p-2 ${errors?.street ? 'focus:border-red-500' : 'border-gray-300 '} `}

      />
      {errors?.street && <span className="error text-red-500">{errors.street}</span>  }

      <input
        type="text"
        id="houseNumber"
        placeholder="Hausnummer"
        value={address.houseNumber}
        disabled={loading}
        onChange={(e) => updateFields({ address: { ...address, houseNumber: e.target.value } })}
      />
      {errors?.houseNumber && <span className="error text-red-500">{errors.houseNumber}</span>  }

        <input
          type="text"
          id="postalCode"
          placeholder="Postleitzahl"
          value={address.postalCode}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, postalCode: e.target.value } })}
        />
        {errors?.postalCode && <span className="error text-red-500">{errors.postalCode}</span>  }


        <input
          type="text"
          id="city"
          placeholder="Stadt"
          value={address.city}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, city: e.target.value } })}
        />
        {errors?.city && <span className="error text-red-500">{errors.city}</span>  }

        <input
          type="text"
          id="country"
          placeholder="Land"
          value={address.country}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, country: e.target.value } })}
        />
        {errors?.country && <span className="error text-red-500">{errors.country}</span>  }

        
        <input
          type="datetime-local"
          id="date"
          value={date ? format(new Date(date), "yyyy-MM-dd'T'HH:mm") : ''}
          disabled={loading}
          onChange={(e) => {
            const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
            updateFields({ date: selectedDate });
          }}
        />
        {errors?.date && <span className="error text-red-500">{errors.date}</span>  }


      </div>
    </FormWrapper>
  );
}
