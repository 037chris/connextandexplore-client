import { FieldValues, useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";

type EventData = {
  id?: string | undefined;
  name: string;
};

type EventNameFormProps = EventData & {
  updateFields: (fields: Partial<EventData>) => void;
};

export default function EventNameForm({
  name,
  updateFields,
}: EventNameFormProps) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>();

  return (
    <FormWrapper title="Lege einen Namen für deine Veranstaltung fest">
      <div className="max-w-md mx-auto p-4">
        {/* <div className="mb-6"> */}
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Gruppenname"
            value={name}
            disabled={false} // Remove loading state for responsiveness
            onChange={(e) => updateFields({ name: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="mt-6"> 
          <p>Wähle einen Namen, der Auskunft über den Zweck deiner Veranstaltung gibt. Du kannst ihn später noch anpassen.</p>
        </div>
      </div>
    </FormWrapper>
  );
}
