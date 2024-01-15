import React from 'react';

interface HashtagsProps {
  hashtags?:string[]
}

const Hashtags: React.FC<HashtagsProps> = ({ hashtags }) => {
  return (
    <>
    {(hashtags??["keineHashtags"]).map((hashtag, index) => (
      <div key={index} className="hashtags">
        <span>{"# " + hashtag}</span>
      </div>
    ))}
    </>
  );
};

export default Hashtags;
