import { jwtDecode } from "jwt-decode";
import {
  ChatResource,
  CommentResource,
  CommentWithRatingsResource,
  CommentsResource,
  CommentsWithRatingsResource,
  UserRegistration,
  eventResource,
  eventResourceRegistration,
  eventsResource,
  userResource,
  usersResource,
  usersResourceNA,
  userResourceNA,
} from "../Resources";
import Cookies from "js-cookie";
import { fetchWithErrorHandling } from "./validation";
let HOST: any;
if (process.env.NODE_ENV === "development") {
  HOST = process.env.REACT_APP_API_SERVER_URL;
} else if (process.env.NODE_ENV === "production") {
  HOST = process.env.REACT_APP_API_SERVER_URL_PROD;
  console.log("Here is prod envirement : ");
  console.log("HOST : ", HOST);
  console.log("node env : ", process.env.NODE_ENV);
}

export async function signup(
  user: UserRegistration | FormData
): Promise<boolean> {
  const url = `${HOST}/api/users/register`;

  try {
    let formData: FormData;

    if (user instanceof FormData) {
      // If user is already a FormData object, use it directly
      formData = user;
    } else {
      // Convert UserRegistration object to FormData
      formData = new FormData();
      formData.append("email", user.email);
      formData.append("name[first]", user.name.first);
      formData.append("name[last]", user.name.last);
      formData.append("password", user.password);
      formData.append("address[postalCode]", user.address.postalCode);
      formData.append("address[city]", user.address.city);
      formData.append("birthDate", user.birthDate);
      formData.append("gender", user.gender);
      formData.append(
        "socialMediaUrls[facebook]",
        user.socialMediaUrls?.facebook || ""
      );
      formData.append(
        "socialMediaUrls[instagram]",
        user.socialMediaUrls?.instagram || ""
      );

      // Check if user.profilePicture is defined and is a File
      if (user.profilePicture !== undefined && user.profilePicture.length > 0) {
        formData.append("profilePicture", user.profilePicture[0]);
      }
    }

    const response = await fetch(url, {
      method: "POST",
      body: formData,
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
  console.log("HOST : ", HOST);
  console.log("url : ", url);
  console.log("node env : ", process.env.NODE_ENV);
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
      if (isTokenExpired(cookie)) {
        console.log(jwt);
        return undefined;
      }
      return jwt?.sub || undefined;
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
  return undefined;
}

function isTokenExpired(token: string): boolean {
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp ? decodedToken.exp < currentTime : false;
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
    if (isTokenExpired(jwt)) {
      logout();
      sessionStorage.clear();
      console.log("token expired");
      throw new Error("Token expired!");
    }
    headers.Authorization = `Bearer ${jwt}`;
  }
  return headers;
}
function headersMulti() {
  const headers: any = {};
  const jwt = Cookies.get("access_token");

  if (jwt) {
    if (isTokenExpired(jwt)) {
      logout();
      sessionStorage.clear();
      throw new Error("Token expired!");
    }
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
/**
 *
 * @returns users as usersResourceNA
 */
export async function getAllUsersNA(): Promise<usersResourceNA> {
  const url = `${HOST}/api/users`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response as usersResourceNA;
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
export async function getUserInfos(userid: string): Promise<userResourceNA> {
  if (!userid) {
    throw new Error("Userid is invalid.");
  }
  const url = `${HOST}/api/users/user/${userid}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
    });
    return response as userResource;
  } catch (err) {
    throw err;
  }
}
export async function updateUser(formData: FormData): Promise<userResource> {
  if (!formData.get("id")) {
    throw new Error("Userid is invalid.");
  }

  const url = `${HOST}/api/users/${formData.get("id")}`;
  console.log("formData: ", formData);
  console.log("url: ", url);
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "PUT",
      headers: headersMulti(),
      body: formData,
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
  const url = `${HOST}/api/events/${eventId}/cancel`;
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
    console.log("Event data :", eventdata);
    const formData = new FormData();
    if (eventdata.name) {
      formData.append("name", eventdata.name);
    }

    if (eventdata.date) {
      const dateString = eventdata.date.toISOString();
      formData.append("date", dateString);
    }

    if (eventdata.description) {
      formData.append("description", eventdata.description);
    }
    formData.append("price", "0");
    const addressString = JSON.stringify(eventdata.address);
    formData.append("address", addressString);

    if (eventdata.category) {
      const categoryString = JSON.stringify(eventdata.category);
      formData.append("category", categoryString);
    }

    if (eventdata.thumbnail) {
      formData.append("thumbnail", eventdata.thumbnail);
    }

    if (eventdata.hashtags) {
      const hashtagsString = JSON.stringify(eventdata.hashtags);
      formData.append("hashtags", hashtagsString);
    }
    console.log("Formdata:", formData);
    const response = await fetchWithErrorHandling(url, {
      method: "POST",
      headers: headersMulti(),
      body: formData,
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
  // Kodieren der Query für die URL
  const encodedQuery = encodeURIComponent(query);

  // Hinzufügen der Query zur URL
  const url = `${HOST}/api/events/search?query=${encodedQuery}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
      //body: JSON.stringify(query),
    });
    //console.log(response);
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
      console.error("Access token not found. User may not be authenticated.");
      throw new Error("User not authenticated");
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Raw Response:", response);
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const result = await response.json();

      console.error("Event creation failed:", result);
      throw new Error(result.message || "Event creation failed");
    }

    return true;
  } catch (error) {
    console.error("Error in createEvent function:", error);
    throw error;
  }
}

/**
 * public api call to retrieve all user created events. (logged-in user is needed)
 * @param userId
 */
export async function getCreatedEvent(userId: string): Promise<eventsResource> {
  if (!userId) {
    throw new Error("Invalid userId, can not get User.");
  }
  const url = `${HOST}/api/events/creator/${userId}`;
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
    return response as Boolean;
  } catch (e) {
    return false;
  }
}

// boardapi.ts
export async function updateEvent(
  eventId: string,
  eventData: eventResource
): Promise<eventResource> {
  if (!eventId) {
    throw new Error("Invalid eventId, cannot update event");
  }
  const url = `${HOST}/api/events/${eventId}`;
  try {
    console.log("Event data :", eventData);
    const formData = new FormData();
    if (eventId) {
      formData.append("eventId", eventId);
    }
    if (eventData.name) {
      formData.append("name", eventData.name);
    }

    if (eventData.date) {
      const dateString = eventData.date.toISOString();
      formData.append("date", dateString);
    }

    if (eventData.description) {
      formData.append("description", eventData.description);
    }
    formData.append("price", "0");
    if (eventData.address) {
      const addressString = JSON.stringify(eventData.address);
      formData.append("address", addressString);
    }

    if (eventData.category) {
      const categoryString = JSON.stringify(eventData.category);
      formData.append("category", categoryString);
    }

    if (eventData.thumbnail) {
      formData.append("thumbnail", eventData.thumbnail);
    }

    if (eventData.hashtags) {
      const hashtagsString = JSON.stringify(eventData.hashtags);
      formData.append("hashtags", hashtagsString);
    }
    console.log("Formdata:", formData);

    const response = await fetchWithErrorHandling(url, {
      method: "PUT",
      headers: headersMulti(),
      body: formData,
    });
    return response as eventResource;
  } catch (e) {
    throw e;
  }
}

export async function joinEvent(eventId: string): Promise<boolean> {
  if (!eventId) {
    throw new Error("invalid eventId, can not join event.");
  }
  const url = `${HOST}/api/events/${eventId}/join`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "POST",
      headers: headers(),
    });
    return true;
  } catch (err) {
    return false; //throw err;
  }
}

export async function createComment(
  comment: CommentResource
): Promise<CommentResource> {
  const url = `${HOST}/api/comments/post`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(comment),
    });
    return response as CommentResource;
  } catch (err) {
    throw err;
  }
}

export async function getAllComments(
  comments: CommentsResource
): Promise<CommentsResource> {
  const url = `${HOST}/api/comments`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as CommentsResource;
  } catch (err) {
    throw err;
  }
}

export async function getComment(
  commentId: string,
  eventId: string
): Promise<CommentWithRatingsResource> {
  if (!commentId) {
    throw new Error("invalid commentId, can not access comment.");
  }
  if (!eventId) {
    throw new Error("invalid eventId, can not access comments of no event.");
  }
  const url = `${HOST}/api/comments/event/${eventId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    const r = response as CommentsWithRatingsResource;

    // Verwenden Sie find anstelle von filter, um den ersten übereinstimmenden Kommentar zu finden.
    const result = r.comments.find((comment) => comment.id === commentId);

    // Wenn kein Kommentar gefunden wurde, werfen Sie einen Fehler oder handhaben Sie den Fall entsprechend.
    if (!result) {
      throw new Error("Comment not found.");
    }

    return result;
  } catch (err) {
    throw err;
  }
}

export async function getCommentsOfEvent(
  eventId: string
): Promise<CommentsWithRatingsResource> {
  if (!eventId) {
    throw new Error("invalid eventId, can not access comments of no event.");
  }
  const url = `${HOST}/api/comments/event/${eventId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as CommentsWithRatingsResource;
  } catch (err) {
    throw err;
  }
}

//used to display comments on admin dashboard
export async function getCommentsOfUser(
  userId: string
): Promise<CommentsWithRatingsResource> {
  if (!userId) {
    throw new Error("invalid eventId, can not access comments of no event.");
  }
  const url = `${HOST}/api/comments/event/${userId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as CommentsWithRatingsResource;
  } catch (err) {
    throw err;
  }
}

export async function updateComment(
  comment: CommentResource
): Promise<CommentResource> {
  if (!comment.id) {
    throw new Error("invalid commentId, can not update.");
  }
  const url = `${HOST}/api/comments/${comment.id}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(comment),
    });
    return response as CommentResource;
  } catch (err) {
    throw err;
  }
}

export async function deleteComment(commentId: string): Promise<boolean> {
  if (!commentId) {
    throw new Error("invalid commentId, can not update.");
  }
  const url = `${HOST}/api/comments/${commentId}`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "DELETE",
      headers: headers(),
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function getAVGRatingOfEvent(eventId: string): Promise<number> {
  if (!eventId) {
    throw new Error("invalid eventId, can not access comments of no event.");
  }
  const url = `${HOST}/api/comments/event/${eventId}/average-rating`;
  try {
    const response = await fetchWithErrorHandling(url, {
      method: "GET",
      headers: headers(),
    });
    return response as number;
  } catch (err) {
    return 0;
  }
}

export async function getChat(id: string) {
  try {
    const response = await fetchWithErrorHandling(`${HOST}/api/chat/${id}`, {
      method: "GET",
      headers: headers(),
    });

    return response as ChatResource;
  } catch (error) {
    throw new Error("Error fetching chat data");
  }
}

export async function sendChatMessage(id: string, message: string) {
  try {
    const response = await fetchWithErrorHandling(`${HOST}/api/chat/${id}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ message }),
    });

    return response as ChatResource;
  } catch (error) {
    throw error;
  }
}
