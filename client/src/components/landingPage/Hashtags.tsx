import React from 'react';

interface HashtagsProps {
  hashtags?:string[]
}

const Hashtags: React.FC<HashtagsProps> = ({ hashtags }) => {
  console.log(hashtags)
  return (
    <div className='flex flex-wrap gap-3 mb-2'>
    {(hashtags??["keineHashtags"]).map((hashtag, index) => (
      <div key={index} className="px-2 bg-slate-300 text-white shadow rounded">
        <p>{"# " + hashtag}</p>
      </div>
    ))}
    </div>
  );
};

export default Hashtags;
