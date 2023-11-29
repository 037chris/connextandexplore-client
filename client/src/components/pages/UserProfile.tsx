import React, { useEffect, useState } from 'react';
import Heading from '../Heading';
import Button from '../Button';
import HorizontalCard from '../ProfileCard';
import { useUserIDContext } from '../../UserIDContext';
import { getUser } from '../../backend/boardapi';
import Footer from '../web/Footer';

const user = {
  name: 'John Doe',
  location: 'Berlin, Country',
  imageSrc: '/images/profile-photo-about.png', // Replace with the actual path to the image
  socials: {
    instagram: 'instagram',
    facebook: 'facebook',
  },
};

const UserProfile: React.FC = () => {
  const { userID } = useUserIDContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");

  const [socialInsta, setSocialInsta] = useState("");
  const [socialFacebook, setSocialFacebook] = useState("");
  // const [image, setImage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('User ID:', userID);

        // Assuming getUser function returns an object with a name property
        const currentUser = await getUser(userID || "");
        setFirstName(currentUser.name.first); 
        setLastName(currentUser.name.last); 

        setCityName(currentUser.address.city); 
        setCountryName(currentUser.address.country); 

        setSocialInsta(currentUser.socialMediaUrls.instagram || "");
        setSocialFacebook(currentUser.socialMediaUrls.facebook || "");

        // setImage(currentUser.profilePicture); // Assuming profilePicture is the image URL

        localStorage.setItem('userProfile', JSON.stringify(currentUser));
        console.log('User profile:', currentUser.name);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userID) {
      fetchUserProfile(); 
    }
  }, [userID]);

  return (
    <div className='relative'>
      <div
        className='pb-36 bg-cover bg-center relative'
        style={{ backgroundImage: "url('/images/back-img.png')" }}
      >
        <HorizontalCard
          title={`${firstName} ${lastName}`} 
          subtitle={`${cityName} ${countryName}`}
          imageSrc={user.imageSrc}
          socials={{ instagram: socialInsta, facebook: socialFacebook }}
          userFirstName={firstName}
        />
      </div>

      {/* Button outside HorizontalCard but within the background container */}
      <div className="absolute bottom-0 inset-x-0 md:left-3/4 md:bottom-24 w-full md:w-52">
        <Button
          label='Profil bearbeiten'
          onClick={() => {}}
        />
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
