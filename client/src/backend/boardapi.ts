import { jwtDecode } from "jwt-decode";
import {
  UserRegistration,
  eventResource,
  eventsResource,
  userResource,
  usersResource,
} from "../Resources";
import Cookies from "js-cookie";
import { fetchWithErrorHandling } from "./validation";

const HOST = process.env.REACT_APP_API_SERVER_URL;






export async function signup(user: UserRegistration): Promise<boolean> {
  const url = `${HOST}/api/users/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        name: {
          first: user.name.first,
          last: user.name.last,
        },
        password: user.password,
        address: {
          street: user.address.street,
          houseNumber: user.address.houseNumber,
          postalCode: user.address.postalCode,
          city: user.address.city,
          country: user.address.country,
          stateOrRegion: user.address.stateOrRegion,
          apartmentNumber: user.address.apartmentNumber,
        },
        profilePicture: user.profilePicture,
        birthDate: user.birthDate,
        gender: user.gender,
        socialMediaUrls: {
          facebook: user.socialMediaUrls?.facebook,
          instagram: user.socialMediaUrls?.instagram,
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Signup failed:", result);
      throw new Error(result.message || "Signup failed");
    }

    return true;
  } catch (error) {
    console.error("Error in signup function:", error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<Boolean> {
  const url = `${HOST}/api/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      // Assuming the server returns the JWT in a field named "access_token"
      const accessToken = result.access_token;

      // Set the JWT in the cookies
      Cookies.set("access_token", accessToken);

      return true;
    } else {
      console.error("Login failed:", response);
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// export async function getUser(userId: string) {
//   const url = `${HOST}/api/users/${userId}`;

//   try {
//     const token = Cookies.get('access_token');

//     if (!token) {
//       console.error('No access token available.');
//       // Handle the absence of the token as needed
//       return null;
//     }

//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log('getUser response:', response);

//     if (!response.ok) {
//       console.error('Error fetching user profile:', response);
//       throw new Error('Error fetching user profile');
//     }

//     const userProfile = await response.json();
//     return userProfile;
//   } catch (error) {
//     console.error('Error in getUser function:', error);
//     throw error;
//   }
// }

export function getUserIDFromJWT() {
  try {
    const cookie = Cookies.get("access_token");
    if (cookie) {
      const jwt: any = jwtDecode(cookie);
      console.log("Decoded JWT:", jwt);
      return jwt?.sub || undefined;
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
  return undefined;
}

export function logout() {
  Cookies.remove("access_token");
}

function headers() {
  const headers: any = {
    "Content-Type": "application/json",
  };
  const jwt = Cookies.get("access_token");
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  return headers;
}

/**
 *
 * @returns users as usersResource
 */
export async function getAllUsers(): Promise<usersResource> {
  const url = `${HOST}/api/users`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response as usersResource;
  } catch (err) {
    throw err;
  }
}

export async function getUser(userid: string): Promise<userResource> {
  if (!userid) {
    throw new Error("Userid is invalid.");
  }
  const url = `${HOST}/api/users/${userid}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as userResource;
  } catch (err) {
    throw err;
  }
}

export async function updateUser(user: userResource): Promise<userResource> {
  if (!user.id) {
    throw new Error("Userid is invalid.");
  }
  const url = `${HOST}/api/users/${user.id}`;
  try {
    console.log("userinfo:", user);
    const response = await fetchWithErrorHandling(url, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(user),
    });
    return response as userResource;
  } catch (err) {
    throw err;
  }
}

export async function deleteUser(userid: string): Promise<Boolean> {
  if (!userid) {
    throw new Error("Userid is invalid.");
  }
  const url = `${HOST}/api/users/${userid}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "DELETE",
      headers: headers(),
    });
    return response as Boolean;
  } catch (err) {
    throw err;
  }
}

export async function getAllEvents(): Promise<eventsResource> {
  const url = `${HOST}/api/events`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as eventsResource;
  } catch (err) {
    throw err;
  }
}

export async function getParticipantsOfEvent(
  eventId: string
): Promise<usersResource> {
  if (!eventId) {
    throw new Error("Invalid eventId, can not get Participants of event.");
  }
  const url = `${HOST}/api/events/${eventId}/participants`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as usersResource;
  } catch (err) {
    throw err;
  }
}

/**
 * public api call to retrieve information about an event. (no logged-in user is needed)
 * @param eventId
 */
export async function getEvent(eventId: string): Promise<eventResource> {
  if (!eventId) {
    throw new Error("Invalid eventId, can not get Event.");
  }
  const url = `${HOST}/api/events/${eventId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as eventResource;
  } catch (err) {
    throw err;
  }
}

/**
 * get all the events where the logged in user joined/ is a participant of.
 * returns empty array of events if no events are found.
 * could also be modified to return an "error" message that the user did not join any events yet.
 */
export async function getJoinedEvents(): Promise<eventsResource> {
  const url = `${HOST}/api/events/joined`;
  try {
    const response: eventsResource & { message: string } =
      await fetchWithErrorHandling(url, {
        method: "GET",
        headers: headers(),
      });
    if (response.message) {
      return { events: [] };
    } else {
      return response as eventsResource;
    }
  } catch (err) {
    throw err;
  }
}

/**
 * a user (user who is currently logged in) can leave an event with this api call.
 * Currently does not pass the errors, only returns false if any error appeared.
 * possible backend outcomes can be expected in the thrown error:
 * err.message === "User is not participating in the event" ||
 * err.message === "Can not cancel participation as event manager"
 * return res.status(409).json({ Error: err.message });
 * return res.status(500).json({ Error: "Canceling event failed" });
 */
export async function exitEvent(eventId: string): Promise<boolean> {
  if (!eventId) {
    throw new Error("invalid eventId, can not leave event.");
  }
  const url = `${HOST}/api/events/${eventId}/ecancel`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "DELETE",
      headers: headers(),
    });
    return true;
  } catch (err) {
    return false; //throw err;
  }
}

export async function postEvent(
  eventdata: eventResource
): Promise<eventResource> {
  const url = `${HOST}/api/events/create`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(eventdata),
    });
    return response as eventResource;
  } catch (err) {
    throw err;
  }
}

/**
 *
 * @param query [query("query").isString().notEmpty()], keine ahnung ob das richtig ist?!
 */
export async function searchEvents(query: string): Promise<eventsResource> {
  if (!query) {
    throw new Error("invalid eventid, can not search for any events");
  }
  const url = `${HOST}/api/events/search`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
      body: JSON.stringify(query),
    });
    return response as eventsResource;
  } catch (err) {
    throw err;
  }
}

export async function getEventOwner(eventId: string): Promise<userResource> {
  if (!eventId) {
    throw new Error("invalid eventid, can not get event manager");
  }
  const url = `${HOST}/api/events/creator/${eventId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as userResource;
  } catch (err) {
    throw err;
  }
}

// bitte erstmal so lassen. Khatia
export async function createEvent(eventData: eventResource): Promise<boolean> {
  const url = `${HOST}/api/events/create`;

  try {
    // Get the JWT from the cookies
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error('Access token not found. User may not be authenticated.');
      throw new Error('User not authenticated');
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('Raw Response:', response);
    const responseData = await response.json();
    console.log(responseData);
    
    if (!response.ok) {
      const result = await response.json();

      console.error('Event creation failed:', result);
      throw new Error(result.message || 'Event creation failed');

    }

    return true;
  } catch (error) {
    console.error('Error in createEvent function:', error);
    throw error;
  }
}


/**
 * public api call to retrieve all user created events. (logged-in user is needed)
 * @param userId 
 */
export async function getCreatedEvent(userId:string):Promise<eventsResource> {
  if(!userId) {
    throw new Error("Invalid userId, can not get User.")
  }
  const url = `${HOST}/api/events/creator/${userId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method:"GET",
      headers:headers()
    });
    return response as eventsResource;
  } catch(err) {
    throw err;
  }
}

/**
 * It is also possible to return a message if the event got deleted.
 * if the event got deleted the response looks like this: { message: "Event successfully deleted" } with the statusCode 204.
 * if the event could not be deleted the response looks like this: { message: "Event could not be deleted" } with the statusCode 405.
 * @param eventId
 * @returns Currently this api call returns: true if the event got deleted otherwise false
 */
export async function deleteEvent(eventId: string): Promise<Boolean> {
  if (!eventId) {
    throw new Error("invalid eventid, can not delete event");
  }
  const url = `${HOST}/api/events/${eventId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "DELETE",
      headers: headers(),
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function updateEvent(
  eventData: eventResource
): Promise<eventResource> {
  if (!eventData.id) {
    throw new Error("invalid eventid, can not update event");
  }
  const url = `${HOST}/api/events/${eventData.id}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(eventData),
    });
    return response as eventResource;
  } catch (e) {
    throw e;
  }
}
