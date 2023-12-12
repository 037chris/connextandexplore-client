import { FieldValues, useForm } from "react-hook-form";
import Input from "../../inputs/Input";
import { useState } from "react";
import FormWrapper from "./FormWrapper";


type EventData = {
  description: string;
  price: number;
}

type EventDateFormProps = EventData & {
    updateFields: (fields: Partial<EventData>) => void
} 

export default function EventDescription({
  description,
  price,
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


  return (
   
      <FormWrapper title="Beschreibe deine Veranstaltung">
          <input
              className="p-2 w-96 h-36 resize-none"
              type='text'
              placeholder='Beschreibung (bitte schreibe min. 50 Zeichen)'
              id='description'
              value={description}
              disabled={loading}
              onChange={(e) => updateFields({ description:  e.target.value }) }

            />
             <input
              type='text'
              placeholder='Beschreibung (bitte schreibe min. 50 Zeichen)'
              id='price'
              value={price}
              disabled={loading}
              onChange={(e) => {
                const priceValue = parseFloat(e.target.value);
                updateFields({ price: isNaN(priceValue) ? 0 : priceValue });
              }}
            />
      </FormWrapper>
       
   
  )
}
