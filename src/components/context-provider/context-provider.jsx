import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import authStatusContext from "../../contexts/auth.context";
import currentUserContext from "../../contexts/current-user.context";

// import { checkAuthStatus } from "../../utils/helper";

export default function ContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const auth = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/status`,
          {
            withCredentials: true, // Activer l'envoi des cookies avec la requête
          }
        );

        console.log(auth);
        setCurrentUser(auth.data.user);
        setIsAuthenticated(auth.data.isAuthenticated);
      } catch (err) {
        console.log(
          "erreur lors de la recupération du status de connection: ",
          err
        );
        setIsAuthenticated(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <authStatusContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          {children}
        </currentUserContext.Provider>
      </authStatusContext.Provider>
    </>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.any,
};
