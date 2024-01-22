import { FieldValues, useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";
import { useState } from "react";

type EventData = {
  description: string;
  price: number;
};

type EventDescriptionProps = EventData & {
  updateFields: (fields: Partial<EventData>) => void;
  errors?: Record<string, string>; // Add this line

};

export default function EventDescription({
  description,
  updateFields,
  errors
}: EventDescriptionProps) {
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(description.length);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<FieldValues>();

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedDescription = e.target.value;
    const truncatedDescription = updatedDescription.slice(0, 700); // Limit to 700 characters
    setCharCount(truncatedDescription.length);
    updateFields({ description: truncatedDescription });
  };

  return (
    <FormWrapper title="Beschreibe deine Veranstaltung">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full md:w-96 relative">
            <textarea
              className="p-2 h-48 md:h-52 text-sm resize-none border rounded-md"
              placeholder="Beschreibung (bitte schreibe min. 50 Zeichen)"
              id="description"
              value={description}
              disabled={loading}
              onChange={handleDescriptionChange}
            />
            {errors?.description && <p className="error text-red-500">{errors?.description}</p>  }

            <div className="absolute bottom-4 md:bottom-4 right-2 text-sm text-gray-500">
              {charCount} / 700
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="text-sm text-gray-600">
              <p>Beachte die folgenden Punkte:</p>
              <ul className="list-disc pl-4">
                <li>Was macht ihr bei euren Events?</li>
                <li>Welches Ziel verfolgt ihr?</li>
                <li>Wen hoffst du zu treffen?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
