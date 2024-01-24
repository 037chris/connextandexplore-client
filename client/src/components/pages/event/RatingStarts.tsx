import React, { useEffect, useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

interface RatingProps {
    numb: number;
}

const RatingStarts: React.FC<RatingProps> = ({ numb }) => {
    const [stars, setStars] = useState<number>(0);
    
    useEffect(() => {
        setStars(numb);
    }, [numb]);

    return (
        <>
            {stars != 0 && (
                <div className="flex stars">
                    {stars > 1 ? <HiOutlineStar /> : <HiStar />}
                    {stars >= 2 ? <HiOutlineStar /> : <HiStar />}
                    {stars >= 3 ? <HiOutlineStar /> : <HiStar />}
                    {stars >= 4 ? <HiOutlineStar /> : <HiStar />}
                    {stars >= 5 ? <HiOutlineStar /> : <HiStar />}
                </div>)}
        </>
    );
};

export default RatingStarts;
