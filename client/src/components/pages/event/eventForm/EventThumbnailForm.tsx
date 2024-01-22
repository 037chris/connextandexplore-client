import React, { useEffect, useState } from "react";
import FormWrapper from "./FormWrapper";
import Input from "../../../html/inputs/Input";
import Button from "../../../html/Button";
type EventThumbnailFormProps = {
  thumbnail?: File | string;
  hashtags?: string[];
  updateFields: (
    fields: Partial<{ thumbnail?: File | string; hashtags?: string[] }>
  ) => void;
  errors?: Record<string, string>;
};

export default function EventThumbnailForm({
  thumbnail,
  hashtags = [],
  updateFields,
  errors,
}: EventThumbnailFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>(hashtags);
  const [customHashtag, setCustomHashtag] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [thumbPrewview, setThumbPreview] = useState<string>("");
  const [filePath, setFilePath] = useState<string>("Bild auswählen");
  const [allHashtags, setNewHashtag] = useState([
    "MakeNewFriends",
    "Networking",
    "Technologie",
    "Professionals",
    "foryou",
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newThumbnail = URL.createObjectURL(file);
      setThumbPreview(newThumbnail);
      setFileUploaded(true);
      // Hier den lokalen Dateipfad setzen
      setFilePath(file.name);
      const fileInput = document.getElementById(
        "bild"
      ) as HTMLInputElement | null;
      console.log("fileInput:", fileInput?.files);
      if (fileInput?.files !== undefined && fileInput.files?.length === 1) {
        thumbnail = fileInput.files[0];
        console.log("thumbnail:", thumbnail);
        updateFields({ thumbnail, hashtags });
      }
    }
  };

  const toggleHashtag = (hashtag: string) => {
    const newHashtags = selectedHashtags.includes(hashtag)
      ? selectedHashtags.filter((h) => h !== hashtag)
      : [...selectedHashtags, hashtag];

    updateFields({ thumbnail, hashtags: newHashtags });
    setSelectedHashtags(newHashtags);
  };

  const handleCustomHashtagChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomHashtag(e.target.value);
  };

  const addCustomHashtag = () => {
    const inputField = document.getElementById("ht") as HTMLInputElement | null;

    if (inputField) {
      const newCustomHashtag = inputField.value;

      // Überprüfe, ob das Hashtag bereits im Array vorhanden ist, um Duplikate zu vermeiden
      if (newCustomHashtag.trim() && !allHashtags.includes(newCustomHashtag)) {
        setNewHashtag((prevHashtags) => [...prevHashtags, newCustomHashtag]);
        inputField.value = ""; // Optional: Das Input-Feld leeren, wenn das Hashtag hinzugefügt wurde
      } else {
        console.log(
          "Bitte gib ein gültiges und nicht vorhandenes Hashtag ein."
        );
      }
    }

    if (customHashtag.trim() !== "") {
      setSelectedHashtags((prev) => {
        const newHashtags = [...prev, customHashtag.trim()];
        updateFields({ thumbnail, hashtags: newHashtags });
        return newHashtags;
      });
      setCustomHashtag("");
    }
  };
  const addNonExistingItemsToTarget = (
    sourceArray: string[],
    targetArray: string[]
  ): string[] => {
    const updatedTargetArray = [...targetArray];
    const difference = sourceArray.filter(
      (item) => !updatedTargetArray.includes(item)
    );
    updatedTargetArray.push(...difference);
    return updatedTargetArray;
  };

  useEffect(() => {
    console.log("EventId in EventThumbnailForm:", hashtags);
    updateFields({ thumbnail, hashtags: selectedHashtags });
    const newHashtags = addNonExistingItemsToTarget(hashtags, allHashtags);
    setNewHashtag(newHashtags);
  }, [hashtags]);

  return (
    <FormWrapper title="Lade ein Titlebild hoch und wähle Hashtags für deine Veranstaltung">
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <label htmlFor="bild" className="cursor-pointer">
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif"
              id="bild"
              disabled={loading}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="input-field cursor-pointer" id="filepointer">
              {filePath}
            </div>
          </label>
        </div>

        {thumbPrewview && (
          <div
            style={{
              backgroundImage: `url(${thumbPrewview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "200px",
            }}
            className="mt-4 rounded shadow-lg"
          />
        )}

        <div className="mt-4 text-center">
          <span className="sub-headline">Makiere dein Event mit Hashtags:</span>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {allHashtags.map((hashtag) => (
              <button
                type="button"
                key={hashtag}
                className={`hashtag-btn ${
                  selectedHashtags.includes(hashtag) ? "active" : ""
                }`}
                onClick={() => toggleHashtag(hashtag)}
              >
                # {hashtag}
              </button>
            ))}
          </div>
          {errors?.hashtag && (
            <p className="error text-red-500">{errors?.hashtag}</p>
          )}
        </div>

        <div className="mt-4">
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="# füge mich hinzu"
              id="ht"
              value={customHashtag}
              onChange={handleCustomHashtagChange}
              className="border border-gray-700 rounded px-2 py-1 outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={addCustomHashtag}
              type="button"
              className="btn-event add transition duration-300"
            >
              +
            </button>
          </div>
        </div>

        {/* {selectedHashtags.length > 0 && (
          <div className="mt-4">
            <strong>Markierte Hashtags:</strong> {selectedHashtags.join(', ')}
          </div>
        )} */}
      </div>
    </FormWrapper>
  );
}
