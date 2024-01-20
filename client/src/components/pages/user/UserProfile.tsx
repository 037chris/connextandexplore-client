import React, { useEffect, useState } from "react";
import Heading from "../../Heading";
import Button from "../../html/Button";
import HorizontalCard from "./ProfileCard";
import { useUserIDContext } from "../../../UserIDContext";
import {
  getCreatedEvent,
  getEvent,
  getEventOwner,
  getUser,
} from "../../../backend/boardapi";
import Footer from "../../html/Footer";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  eventResource,
  eventsResource,
  userResource,
} from "../../../Resources";
import { Header } from "../../html/Header";

import { HOST } from "../../../backend/getHostApi";
const user = {
  name: "John Doe",
  location: "Berlin, Country",
  imageSrc: "/images/profile-photo-about.png", // Replace with the actual path to the image
  socials: {
    instagram: "instagram",
    facebook: "facebook",
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
  const [profilePicture, setProfilePicture] = useState("");

  const [events, setEvents] = useState<eventsResource | null>(null);
  // const params = useParams();
  // const eventdID = params.eventID;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("User ID:", userID);
        const currentUser = await getUser(userID || "");
        setFirstName(currentUser.name.first);
        setLastName(currentUser.name.last);
        setProfilePicture(currentUser?.profilePicture || "");
        setSocialInsta(currentUser.socialMediaUrls?.instagram || "");
        setSocialFacebook(currentUser.socialMediaUrls?.facebook || "");

        localStorage.setItem("userProfile", JSON.stringify(currentUser));
        //console.log('User profile:', currentUser.name);
        document.title = "Dein Profil - Connect & Explore";
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userID) {
      fetchUserProfile();
    }
  }, [userID]);

  const handleShowEvents = async () => {
    try {
      const currentUserEvents: eventsResource = await getCreatedEvent(userID!);
      setEvents(currentUserEvents);
      console.log("User Event:", currentUserEvents);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  return (
    <>
      <Header homeRoute={"page"} headline={`${firstName}'s Profil`} />
      <div className="max-grid content-pt">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
          <div className="lg:col-span-1"></div>
          <div className="col-span-1 lg:col-span-4">
            <HorizontalCard
              title={`${firstName} ${lastName}`}
              subtitle={`${cityName} ${countryName}`}
              imageSrc={
                profilePicture
                  ? `${HOST}/images/users/${profilePicture}`
                  : user.imageSrc
              }
              socials={{ instagram: socialInsta, facebook: socialFacebook }}
              userFirstName={firstName}
            />
            {/* Responsive Button in the right corner */}
            {/* <div">
            <Button
              label='Profil bearbeiten'
              onClick={() => navigate('/settings')}
            />
          </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
