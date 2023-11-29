import React from 'react';
import Heading from './Heading';
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
        <div className="flex items-center justify-center h-screen pt-36 ">
          <div className="pt-24 pb-20 w-full max-w-screen-lg mx-auto bg-white border-solid border-2 border-neutral-200 rounded-md">
            <div className="max-w-xl mx-auto bg-cover bg-center bg-white text-black rounded-md overflow-hidden md:flex">
              {/* Image on the left side */}
              <div className="md:w-1/2 h-full">
                <img
                  className="w-full h-full object-cover"
                  src={imageSrc}
                  alt={title}
                />
              </div>
    
              {/* Text content on the right side */}
              <div className="md:w-1/2 pl-6">
                <div className='border-b-2 border-neutral-200 pb-20'>
                  <Heading title={title} subtitle={subtitle}/>
                  
                  <div className="flex items-center mt-4 gap-2">
                    <FaInstagram size={19} className='text-red-500'/>
                    <div className="text-sm">
                      <p className="text-gray-800 leading-none">{socials?.instagram}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 gap-2">
                    <FaFacebookSquare size={19} className='text-blue-500'/>
                    <div className="text-sm">
                      <p className="text-gray-800 leading-none">{socials?.facebook}</p>
                    </div>
                  </div>
                </div>
                <p className='pt-7 text-gray-800'>{userFirstName} hat noch nichts über sich geschrieben</p>

                
              </div>
              
            </div>
          </div>
        </div>
      );
};

export default HorizontalCard;
