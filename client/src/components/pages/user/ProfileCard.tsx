import React from 'react';
import Heading from '../../Heading';
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

interface HorizontalCardProps {
  imageSrc?: string;
  title: string;
  subtitle?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
  }
  userFirstName: string;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ imageSrc, title, subtitle, socials, userFirstName }) => {
    return (
       <>
       <div className="profil-card">
          <div className="img-container">
          <img
          src={imageSrc} 
          alt={userFirstName}
          className="profile-picture"
        />
          </div>
          <div>
            <p>{userFirstName}</p>
          </div>
          
       </div>
       </>
      );
};

export default HorizontalCard;
