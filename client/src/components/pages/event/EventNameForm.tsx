import { FieldValues, useForm } from "react-hook-form";
import Input from "../../inputs/Input";
import { useState } from "react";
import FormWrapper from "./FormWrapper";



type EventData = {
    id?: string | undefined;
    name: string 
}

type EventDateFormProps = EventData & {
    updateFields: (fields: Partial<EventData>) => void
}

export default function EventNameForm({
   name,
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
    <FormWrapper title="Lege einen Namen für deine Veranstaltung fest">
          <input
            type='text'
            placeholder='Gruppenname'
            id='name'
            value={name}
            disabled={loading}
            onChange={(e) => updateFields({ name:  e.target.value }) }
          />
    </FormWrapper>
  )
}
