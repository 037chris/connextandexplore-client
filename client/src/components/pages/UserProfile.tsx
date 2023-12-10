import React, { useEffect, useState } from 'react';
import Heading from '../Heading';
import Button from '../Button';
import HorizontalCard from '../ProfileCard';
import { useUserIDContext } from '../../UserIDContext';
import { getCreatedEvent, getEvent, getEventOwner, getUser } from '../../backend/boardapi';
import Footer from '../web/Footer';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { eventResource, eventsResource, userResource } from '../../Resources';

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
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [socialInsta, setSocialInsta] = useState("");
  const [socialFacebook, setSocialFacebook] = useState("");

  const [events, setEvents] = useState<eventsResource | null>(null)
  // const params = useParams();
  // const eventdID = params.eventID;


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('User ID:', userID);
        const currentUser = await getUser(userID || "");
        setFirstName(currentUser.name.first); 
        setLastName(currentUser.name.last); 
        setCityName(currentUser.address.city); 
        setCountryName(currentUser.address.country); 
        setSocialInsta(currentUser.socialMediaUrls?.instagram || "");
        setSocialFacebook(currentUser.socialMediaUrls?.facebook || "");

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


//   async function load() {
//     const e = await getBoard();
//     setEvents(c);
// }

// React.useEffect(() => { load(); }, [userID]);



  const handleShowEvents = async () => {
    try {
      const currentUserEvents: eventsResource = await getCreatedEvent(userID!);
      setEvents(currentUserEvents);
      console.log('User Event:', currentUserEvents);
    } catch (error) {
      console.error('Error fetching user events:',  error)
    }
  }

  return (
    <div className='relative'>
      <div
        className='pb-36 bg-cover bg-center relative'
        style={{ backgroundImage: "url('/images/back-img.png')" }}
      >
        <div className="container mx-auto px-4">
          <HorizontalCard
            title={`${firstName} ${lastName}`} 
            subtitle={`${cityName} ${countryName}`}
            imageSrc={user.imageSrc}
            socials={{ instagram: socialInsta, facebook: socialFacebook }}
            userFirstName={firstName}
          />
          {/* Responsive Button in the right corner */}
          <div className="absolute bottom-0 right-0 md:bottom-36 md:right-52 w-full md:w-52">
            <Button
              label='Profil bearbeiten'
              onClick={() => navigate('/settings')}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
