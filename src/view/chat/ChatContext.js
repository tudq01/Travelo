import { createContext, useContext, useReducer } from "react";

const INITIAL_STATE = {
  roomId: "",
  areaName: "",
};

export const ChatContext = createContext();

const chatReducer = (state, action) => {
  switch (action.type) {
    case "change_room": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [chatCtx, chatDispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider
      value={{
        chatCtx,
        chatDispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
