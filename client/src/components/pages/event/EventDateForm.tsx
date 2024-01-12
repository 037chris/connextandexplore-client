import { useState } from "react";
import FormWrapper from "./FormWrapper";


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
  date?: Date;
  
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



  // for date placeholder
  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let today = curr.toISOString().substring(0, 10);

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
      {errors?.street && <p className="error text-red-500">{errors.street}</p>  }

      <input
        type="text"
        id="houseNumber"
        placeholder="Hausnummer"
        value={address.houseNumber}
        disabled={loading}
        onChange={(e) => updateFields({ address: { ...address, houseNumber: e.target.value } })}
      />
      {errors?.houseNumber && <p className="error text-red-500">{errors.houseNumber}</p>  }

        <input
          type="text"
          id="postalCode"
          placeholder="Postleitzahl"
          value={address.postalCode}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, postalCode: e.target.value } })}
        />
        {errors?.postalCode && <p className="error text-red-500">{errors.postalCode}</p>  }


        <input
          type="text"
          id="city"
          placeholder="Stadt"
          value={address.city}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, city: e.target.value } })}
        />
        {errors?.city && <p className="error text-red-500">{errors.city}</p>  }

        <input
          type="text"
          id="country"
          placeholder="Land"
          value={address.country}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, country: e.target.value } })}
        />
        {errors?.country && <p className="error text-red-500">{errors.country}</p>  }

        
        <input
          type="date"
          id="date"
          defaultValue={today}
          disabled={loading}
          onChange={(e) => updateFields({ date: new Date(e.target.value) })}
        />
        {errors?.date && <p className="error text-red-500">{errors.date}</p>  }


      </div>
    </FormWrapper>
  );
}
