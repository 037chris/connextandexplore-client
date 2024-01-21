// CommentContext.tsx
import React, { createContext, useReducer, Dispatch, ReactNode } from "react";

type CommentResource = {
  title: string;
  stars: number;
  content: string;
  edited: boolean;
  creator: string;
  creatorName: string | null;
  event: string;
  eventName: string | null;
};

type CommentState = {
  comments: CommentResource[];
};

type CommentAction =
  | { type: "SET_COMMENTS"; payload: CommentResource[] }
  | { type: "ADD_COMMENT"; payload: CommentResource }
  | {
      type: "EDIT_COMMENT";
      payload: { index: number; comment: CommentResource };
    };

type CommentContextType = {
  state: CommentState;
  dispatch: Dispatch<CommentAction>;
};

const CommentContext = createContext<CommentContextType | undefined>(undefined);

const commentReducer = (
  state: CommentState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    case "ADD_COMMENT":
      return { ...state, comments: [...state.comments, action.payload] };
    case "EDIT_COMMENT":
      const newComments = [...state.comments];
      newComments[action.payload.index] = action.payload.comment;
      return { ...state, comments: newComments };
    default:
      return state;
  }
};

const CommentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, { comments: [] });

  return (
    <CommentContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider, CommentContext };
