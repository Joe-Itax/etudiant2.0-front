import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/axios-instance";

import authStatusContext from "../../contexts/auth.context";
import currentUserContext from "../../contexts/current-user.context";
import usersContext from "../../contexts/users.context";
import universityContext from "../../contexts/university.context";
import ressourceContext from "../../contexts/ressource.context";

// import { checkAuthStatus } from "../../utils/helper";

export default function ContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [university, setUniversity] = useState([]);
  const [ressource, setRessource] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const usersReq = await axiosInstance.get(`/api/users`);
        // console.log("users: ", usersReq);
        setUsers(usersReq.data.users);
        const universityReq = await axiosInstance.get(`/api/universities`);
        // console.log("university: ", universityReq);
        setUniversity(universityReq.data.universities);

        const ressourceReq = await axiosInstance.get(`/api/ressources`);
        console.log("ressourceReq: ", ressourceReq);
        setRessource(ressourceReq.data.ressources);

        const auth = await axiosInstance.get(`/api/auth/status`);
        console.log("auth: ", auth);
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
      <usersContext.Provider value={{ users, setUsers }}>
        <ressourceContext.Provider value={{ ressource, setRessource }}>
          <universityContext.Provider value={{ university, setUniversity }}>
            <authStatusContext.Provider
              value={{ isAuthenticated, setIsAuthenticated }}
            >
              <currentUserContext.Provider
                value={{ currentUser, setCurrentUser }}
              >
                {children}
              </currentUserContext.Provider>
            </authStatusContext.Provider>
          </universityContext.Provider>
        </ressourceContext.Provider>
      </usersContext.Provider>
    </>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.any,
};
