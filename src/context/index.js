"use client";

import { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [Favorites, setFavorites]= useState([])
  const [Account, setAccount] = useState([]);
  const [loader, setLoader] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(null);
  const [media, setMedia] = useState([]);
  const { data: session } = useSession();
  useEffect(() =>{
   setLoggedIn(JSON.parse(sessionStorage.getItem("loggedIn")))
  },[]);
  // console.log({LoggedIn});
  return (
    <AppContext.Provider
      value={{
        Favorites,
        setFavorites,
        Account,
        setAccount,
        loader,
        setLoader,
        setLoggedIn,
        LoggedIn,
        setMedia,
        media,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
