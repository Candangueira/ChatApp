import {createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  
  
  const { currentUser } = useContext(AuthContext);
  
  const INITIAL_STATE = {
      chatId: "null",
      user: {},
  };
  // update the chatId and the user based on the user
  const chatReducer = (state, action) => {
    
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "RESET":
        return {
          user: {},
          chatId: "null"
        };
      
      default:
        return state;
    }
    
  };


  // useReducer to manage the state
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};