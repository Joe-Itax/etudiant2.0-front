import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "@remixicon/react";
import Avatar from "react-avatar";
import logo from "/assets/Etudiant-20.svg";
import { RiMenu4Fill } from "@remixicon/react";
import { RiCloseLargeLine } from "@remixicon/react";
import "./header.css";
import { CircularProgress } from "@mui/material";

import currentUserContext from "../../contexts/current-user.context";
import authStatusContext from "../../contexts/auth.context";
import axios from "axios";
import CustomBouton from "../bouttons/custom-button";

import OpenMobileMenu from "./navbar-mobile/navbar-mobile";

export default function Header() {
  const [isUnderTablet, setIsUnderTablet] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsUnderTablet(window.innerWidth < 768);
    };

    handleResize(); // Appel initial pour définir la valeur initiale

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(menuIsOpen);

  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(authStatusContext);

  const handleLogoutSubmit = async () => {
    try {
      const logoutRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {
          withCredentials: true,
        }
      );
      // console.log(logoutRes);
      if (logoutRes.status === 200) {
        setIsAuthenticated(false);
        setCurrentUser({});
        navigate("/");
      }
    } catch (error) {
      console.log("erreur: ", error);
    }
  };

  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const openMenu = () => {
    setMenuIsOpen(true);
    setState({ ...state, top: true });
  };
  const closeMenu = () => {
    setMenuIsOpen(false);
    setState({ ...state, top: false });
  };

  return (
    <header className="relative z-50">
      <div className="flex max-[767px]:w-full md:w-96 lg:w-[30rem] max-[767px]:justify-between items-center">
        <div className="logo ">
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="md:hidden">
          <RiMenu4Fill
            color="#555"
            className="cursor-pointer"
            onClick={openMenu}
          />
        </div>
      </div>
      <nav
        className={`first ${
          isUnderTablet ? (menuIsOpen ? "block" : "hidden") : "block"
        }`}
      >
        {isUnderTablet ? (
          <OpenMobileMenu toggleDrawer={toggleDrawer} state={state}>
            <RiCloseLargeLine
              color="#555"
              className="cursor-pointer block self-end mb-4"
              onClick={closeMenu}
            />
            <ul className="first-ul">
              <li>
                <NavLink to={"/"}>Accueil</NavLink>
              </li>
              <li>
                <NavLink to={"/ressources"}>Ressources</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"}>Contact</NavLink>
              </li>
              {isUnderTablet && (
                <div className="isUndertable">
                  {!isAuthenticated ? (
                    <div className="not-connected">
                      <li className={``}>
                        <Link to={"/signup"} className="signup">
                          S&apos;enregistrer
                        </Link>
                      </li>
                      <li className={``}>
                        <Link to={"/login"} className="login">
                          Se connecter
                        </Link>
                      </li>
                    </div>
                  ) : currentUser.profile ? (
                    <div className="box-profil-image text-gray-700">
                      <li>
                        <div className="flex items-center text-gray-700">
                          <div>
                            <Link to={"/profil"} className="logedin">
                              {!currentUser?.profile.urlProfilImage ? (
                                <Avatar
                                  name={`${currentUser.firstname} ${currentUser.lastname}`}
                                  round={true}
                                  size="55"
                                  src={null}
                                  alt="Avatar"
                                />
                              ) : (
                                <img
                                  src={`${currentUser?.profile.urlProfilImage}`}
                                  alt="Image du profil du user"
                                  className="w-[55px] h-[55px] rounded-full object-cover"
                                />
                              )}
                            </Link>
                          </div>
                          <div>
                            <div className="flex flex-col">
                              <span className="text-gray-900">{`${currentUser.firstname} ${currentUser.lastname}`}</span>
                              <span className="text-sm">{`${currentUser.email}`}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <span
                          className="logout cursor-pointer"
                          onClick={handleLogoutSubmit}
                        >
                          Se deconnecter
                        </span>
                      </li>
                    </div>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              )}
            </ul>
          </OpenMobileMenu>
        ) : (
          <ul className="first-ul">
            <li>
              <NavLink to={"/"}>Accueil</NavLink>
            </li>
            <li>
              <NavLink to={"/ressources"}>Ressources</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>Contact</NavLink>
            </li>
            {isUnderTablet && (
              <div className="isUndertable">
                {!isAuthenticated ? (
                  <div className="not-connected">
                    <li className={``}>
                      <Link to={"/signup"} className="signup">
                        S&apos;enregistrer
                      </Link>
                    </li>
                    <li className={``}>
                      <Link to={"/login"} className="login">
                        Se connecter
                      </Link>
                    </li>
                  </div>
                ) : currentUser.profile ? (
                  <div className="box-profil-image text-gray-700">
                    <li>
                      <div className="flex items-center text-gray-700">
                        <div>
                          <Link to={"/profil"} className="logedin">
                            {!currentUser?.profile.urlProfilImage ? (
                              <Avatar
                                name={`${currentUser.firstname} ${currentUser.lastname}`}
                                round={true}
                                size="55"
                                src={null}
                                alt="Avatar"
                              />
                            ) : (
                              <img
                                src={`${currentUser?.profile.urlProfilImage}`}
                                alt="Image du profil du user"
                                className="w-[55px] h-[55px] rounded-full object-cover"
                              />
                            )}
                          </Link>
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <span className="text-gray-900">{`${currentUser.firstname} ${currentUser.lastname}`}</span>
                            <span className="text-sm">{`${currentUser.email}`}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="">
                      <span
                        className="logout cursor-pointer"
                        onClick={handleLogoutSubmit}
                      >
                        Se deconnecter
                      </span>
                    </li>
                  </div>
                ) : (
                  <CircularProgress />
                )}
              </div>
            )}
          </ul>
        )}
      </nav>

      <nav className="second">
        {!isAuthenticated ? (
          <ul className="">
            <li>
              <Link to={`/signup`}>
                <CustomBouton variant={"primary"}>Créer un compte</CustomBouton>
              </Link>
            </li>
            <li>
              <Link to={`/login`}>
                <CustomBouton variant={"secondary"}>Se connecter</CustomBouton>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="second">
            <li>
              <Link to={"/profil"} className="logedin">
                {!currentUser?.profile?.urlProfilImage ? (
                  <Avatar
                    name={`${currentUser.firstname} ${currentUser.lastname}`}
                    round={true}
                    size="55"
                    src={null}
                    alt="Avatar"
                  />
                ) : (
                  <img
                    src={`${currentUser.profile.urlProfilImage}`}
                    alt="Image du profil du user"
                    className="w-[55px] h-[55px] rounded-full object-cover"
                  />
                )}
              </Link>
            </li>
            <li className="text-red">
              <RiLogoutBoxRLine
                color="#555"
                className="text-red cursor-pointer"
                onClick={handleLogoutSubmit}
              />
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
