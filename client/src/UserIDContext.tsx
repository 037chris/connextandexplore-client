import { createContext, useContext } from "react";

interface UserIDContextType {
    userID: string | undefined;
    setUserID: (userID: string | undefined) => void
}

export const UserIDContext = createContext<UserIDContextType>({} as UserIDContextType);
export const useUserIDContext = () => useContext(UserIDContext);