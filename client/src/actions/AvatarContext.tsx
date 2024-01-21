import React, { createContext, useReducer, Dispatch, ReactNode } from "react";

type AvatarState = {
  avatarUrl: string | null;
};

type AvatarAction = { type: "SET_AVATAR"; payload: string | null };

type AvatarContextType = {
  state: AvatarState;
  dispatch: Dispatch<AvatarAction>;
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

const avatarReducer = (
  state: AvatarState,
  action: AvatarAction
): AvatarState => {
  switch (action.type) {
    case "SET_AVATAR":
      return { ...state, avatarUrl: action.payload };
    default:
      return state;
  }
};

type AvatarProviderProps = {
  children: ReactNode;
};

const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(avatarReducer, { avatarUrl: null });

  return (
    <AvatarContext.Provider value={{ state, dispatch }}>
      {children}
    </AvatarContext.Provider>
  );
};

export { AvatarProvider, AvatarContext };
