import React from 'react';

interface AvatarProps {
  src: string | null;
  onError?: () => void; // Add the onError prop to the AvatarProps type
}

const Avatar: React.FC<AvatarProps> = ({ src, onError }) => {
  const imageUrl = src ? `${src}` : '/images/placeholder.jpg';

  return (
    <img
      className="rounded-full"
      height="30"
      width="30"
      src={imageUrl}
      alt="Avatar"
      onError={onError} // Pass the onError prop to the img element
    />
  );
};

export default Avatar;