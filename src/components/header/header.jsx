import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiLogoutBoxRLine } from "@remixicon/react";
import Avatar from "react-avatar";
import logo from "/assets/Etudiant-20.svg";
import { RiMenu4Fill } from "@remixicon/react";
import { RiCloseLargeLine } from "@remixicon/react";
import "./header.css";

export default function Header() {
  const [isUnderTablet, setIsUnderTablet] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const openMenu = () => {
    setMenuIsOpen(true);
  };
  const closeMenu = () => {
    setMenuIsOpen(false);
  };
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

  return (
    <header className="relative">
      <div className="flex max-[767px]:w-full md:w-96 lg:w-[30rem] max-[767px]:justify-between items-center">
        <div className="logo ">
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="md:hidden">
          {!menuIsOpen ? (
            <RiMenu4Fill
              color="#555"
              className="cursor-pointer"
              onClick={openMenu}
            />
          ) : (
            <RiCloseLargeLine
              color="#555"
              className="cursor-pointer"
              onClick={closeMenu}
            />
          )}
        </div>
      </div>
      <nav
        className={`first ${
          isUnderTablet ? (menuIsOpen ? "block" : "hidden") : "block"
        }`}
      >
        <ul className="">
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
            <div className="border-t pt-4">
              {/* eslint-disable-next-line no-constant-condition */}
              {false ? (
                <>
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
                </>
              ) : (
                <div className="text-gray-700">
                  <li>
                    <div className="flex items-center text-gray-700">
                      <div>
                        <Link to={"/profil"} className="logedin">
                          <Avatar
                            name="John Doe"
                            round={true}
                            size="55"
                            src={null}
                            alt="Avatar"
                          />
                        </Link>
                      </div>
                      <div>
                        <div className="flex flex-col">
                          <span className="text-gray-900">John Doe</span>
                          <span className="text-sm">johndoe@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="px-4">
                    <span className="px-4 cursor-pointer">Se deconnecter</span>
                  </li>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>

      <nav className="second">
        {/* eslint-disable-next-line no-constant-condition*/}
        {false ? (
          <ul className="">
            <li>
              <Link to={"/signup"} className="signup">
                S&apos;enregistrer
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="login">
                Se connecter
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="second">
            <li>
              <Link to={"/profil"} className="logedin">
                <Avatar
                  name="John Doe"
                  round={true}
                  size="55"
                  src={null}
                  alt="Avatar"
                />
              </Link>
            </li>
            <li className="text-red">
              <RiLogoutBoxRLine
                color="#555"
                className="text-red cursor-pointer"
              />
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
