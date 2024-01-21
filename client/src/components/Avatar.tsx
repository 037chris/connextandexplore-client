import React, { useEffect, useState } from "react";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  const [srcPath, setSrcPath] = useState<string | null | undefined>(src);

  useEffect(() => {
    setSrcPath(src);
  }, [src]);
  return (
    <img
      className="rounded-full avatar"
      loading="lazy"
      src={srcPath || "/images/placeholder.jpg"}
      alt="Avatar"
    />
  );
};

export default Avatar;
