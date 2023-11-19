import { jwtDecode } from "jwt-decode";
import { UserRegistration } from "../Resources";
import Cookies from "js-cookie";



const HOST = process.env.REACT_APP_API_SERVER_URL;

export async function register(userdata: UserRegistration): Promise<boolean> {
  const url = `${HOST}/api/users/register`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(userdata),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response.ok;
}

export async function login(email: string, password: string): Promise<Boolean> {
  const url = `${HOST}/api/login`;

  const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      }
  });
  return response.ok
}

export function getUserIDFromJWT() {
  const cookie = Cookies.get("access_token");
  if (cookie) {
      const jwt: any = jwtDecode(cookie);
      const userId = jwt.sub;
      return userId;
  }
  return undefined;
}

export function logout() {
  Cookies.remove("access_token");
}

