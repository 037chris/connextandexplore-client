import React from 'react';

interface AvatarProps {
  src: string | null | undefined;
 
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {

  return (
    <img
      className="rounded-full"
      height="30"
      loading="lazy"
      width="30"
      src={src || "/images/placeholder.jpg"}
      
      alt="Avatar"
    />
  );
};

export default Avatar;
