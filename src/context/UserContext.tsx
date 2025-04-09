import { createContext, ReactNode, useContext, useState } from "react";
import { UserContextType, UserProfile } from "@/types/userTypes";


const initialUserContext: UserContextType = {
  userDetails : null,
  isLoading : false,
  isError : false,
  setUserDetails : () => {},
  setIsLoading : () => {},
  setIsError : () => {},
   };

interface chidrenProps {
    children : ReactNode;
}

export const UserContext = createContext<UserContextType>(initialUserContext);

export const UserContextProvider = ({children}: chidrenProps) => {

    const [userDetails, setUserDetails] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
   
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, isLoading, setIsLoading, isError, setIsError }}>
        {children}
    </UserContext.Provider>
  )
}


export const useUserContext = () => useContext(UserContext);
