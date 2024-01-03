import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import FormWrapper from "./FormWrapper";
import { eventResource } from "../../../Resources";
import { format } from "date-fns";

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
  };
  date?: Date;
};

type EventDateFormProps = EventData & {
  updateFields: (fields: Partial<EventData>) => void;
};

export default function EventDateForm({
  date,
  address,
  updateFields
}: EventDateFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({});

  return (
    <FormWrapper title="Wann und wo möchtest du dein Event veranstalten?">
      <div className="form-container">
        <input
          type="text"
          id="street"
          placeholder="Straße"
          autoFocus
          required
          disabled={loading}
          value={address.street}
          onChange={(e) => updateFields({ address: { ...address, street: e.target.value } })}
        />

        <input
          type="text"
          id="houseNumber"
          placeholder="Hausnummer"
          value={address.houseNumber}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, houseNumber: e.target.value } })}
        />

        <input
          type="text"
          id="apartmentNumber"
          placeholder="Wohnungsnummer (optional)"
          value={address.apartmentNumber || ''}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, apartmentNumber: e.target.value } })}
        />

        <input
          type="text"
          id="postalCode"
          placeholder="Postleitzahl"
          value={address.postalCode}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, postalCode: e.target.value } })}
        />

        <input
          type="text"
          id="city"
          placeholder="Stadt"
          value={address.city}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, city: e.target.value } })}
        />

        <input
          type="text"
          id="stateOrRegion"
          placeholder="Bundesland (optional)"
          value={address.stateOrRegion || ''}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, stateOrRegion: e.target.value } })}
        />

        <input
          type="text"
          id="country"
          placeholder="Land"
          value={address.country}
          disabled={loading}
          onChange={(e) => updateFields({ address: { ...address, country: e.target.value } })}
        />

        <input
          type="date"
          id="date"
          placeholder="Veranstaltungsdatum"
          value={date ? format(date, 'yyyy-MM-dd') : ''}
          disabled={loading}
          onChange={(e) => updateFields({ date: new Date(e.target.value) })}
        />
      </div>
    </FormWrapper>
  );
}
