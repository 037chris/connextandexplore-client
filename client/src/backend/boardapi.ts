import { jwtDecode } from "jwt-decode";
import { UserRegistration } from "../Resources";
import Cookies from "js-cookie";



const HOST = process.env.REACT_APP_API_SERVER_URL;

export async function signup(user: UserRegistration): Promise<boolean> {
  const url = `${HOST}/api/users/register`;
  try {
  const response = await fetch(url, {
    method: 'POST',
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
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('Signup failed:', result);
    throw new Error(result.message || 'Signup failed');
  }

  return true;
} catch (error) {
  console.error('Error in signup function:', error);
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
      console.error('Login failed:', response);
      return false;
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}


// export function getUserIDFromJWT() {
//   try {
//     const cookie = Cookies.get("access_token");
//     if (cookie) {
//       const jwt: any = jwtDecode(cookie);
//       console.log("Decoded JWT:", jwt);
//       const userId = jwt?.sub;
//       if (userId) {
//         return userId;
//       } else {
//         console.error("JWT does not contain 'sub' property");
//       }
//     }
//   } catch (error) {
//     console.error("Error decoding JWT:", error);
//   }
//   return undefined;
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

