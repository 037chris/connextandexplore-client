

import React from 'react';

interface HashtagsProps {
  hashtags?:string[]
}

const Hashtags: React.FC<HashtagsProps> = ({ hashtags }) => {
  return (
    <div>
    {(hashtags??["keineHashtags"]).map((hashtag, index) => (
      <div key={index} className="mb-8 mx-2 bg-slate-400 text-white shadow rounded font.">
        <p>{"#"+hashtag}</p>
      </div>
    ))}
    </div>
  );
};

export default Hashtags;
