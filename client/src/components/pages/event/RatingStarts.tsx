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
            {stars > 0 && (
                <div className="flex stars">
                    {stars > 1 ? <HiStar /> : <HiOutlineStar />}
                    {stars >= 2 ? <HiStar /> : <HiOutlineStar />}
                    {stars >= 3 ? <HiStar /> : <HiOutlineStar />}
                    {stars >= 4 ? <HiStar /> : <HiOutlineStar />}
                    {stars >= 5 ? <HiStar /> : <HiOutlineStar />}
                </div>)}
        </>
    );
};

export default RatingStarts;
