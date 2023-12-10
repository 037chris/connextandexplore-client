import React, { useEffect, useState } from 'react';
import FormWrapper from './FormWrapper';

type EventThumbnailFormProps = {
  thumbnail?: string;
  hashtags?: string[];
  updateFields: (fields: Partial<{ thumbnail?: string; hashtags?: string[] }>) => void;
};

export default function EventThumbnailForm({
  thumbnail,
  hashtags = [],
  updateFields,
}: EventThumbnailFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>(hashtags);
  const [customHashtag, setCustomHashtag] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const newThumbnail = file?.name;

    // Update state and call updateFields directly
    setSelectedHashtags((prev) => {
      updateFields({ thumbnail: newThumbnail, hashtags: prev });
      return prev;
    });
  };

  const toggleHashtag = (hashtag: string) => {
    // Update state and call updateFields directly
    setSelectedHashtags((prev) => {
      const newHashtags = prev.includes(hashtag)
        ? prev.filter((h) => h !== hashtag)
        : [...prev, hashtag];

      updateFields({ thumbnail, hashtags: newHashtags });
      return newHashtags;
    });
  };

  const handleCustomHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomHashtag(e.target.value);
  };

  const addCustomHashtag = () => {
    if (customHashtag.trim() !== '') {
      toggleHashtag(customHashtag.trim());
      setCustomHashtag('');
    }
  };

  useEffect(() => {
    // Update fields after component has rendered
    updateFields({ thumbnail, hashtags: selectedHashtags });
  }, [thumbnail, selectedHashtags]);

  const handleImageSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle image submission if needed
  };

  return (
    <FormWrapper title="Lege ein Thumbnail fest und wähle Hashtags für deine Veranstaltung">
      <input
        type="file"
        accept="image/*"
        id="bild"
        disabled={loading}
        onChange={handleFileChange}
      />
      <button
        className='border border-red-500 rounded hover:shadow-lg'
        type='button'
        onClick={handleImageSubmit}
      >
        Upload
      </button>

      {thumbnail && (
        <img
          src={thumbnail}
          alt="Thumbnail Preview"
          className="mt-2 rounded"
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
      )}

      <div className="mt-4">
        <strong>Hashtags:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Make new friends', 'Networking', 'Technologie', 'Professionals', 'foryou'].map((hashtag) => (
            <button
              type='button'
              key={hashtag}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                selectedHashtags.includes(hashtag) ? 'bg-opacity-75' : ''
              }`}
              onClick={() => toggleHashtag(hashtag)}
            >
              {hashtag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <strong>Custom Hashtags:</strong>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Type your custom hashtag"
            value={customHashtag}
            onChange={handleCustomHashtagChange}
            className="border border-gray-700 rounded px-2 py-1 outline-none"
          />
          <button
            onClick={addCustomHashtag}
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {selectedHashtags.length > 0 && (
        <div className="mt-4">
          <strong>Selected Hashtags:</strong> {selectedHashtags.join(', ')}
        </div>
      )}
    </FormWrapper>
  );
}
