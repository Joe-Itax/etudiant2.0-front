import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiLogoutBoxRLine } from "@remixicon/react";
import Avatar from "react-avatar";
import logo from "/assets/Etudiant-20.svg";
import "./header.css";

export default function Header() {
  const [isUnderTablet, setIsUnderTablet] = useState(false);

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

  return (
    <header className="relative hidden">
      <div className="logo ">
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <nav className="first">
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
          <li className={!isUnderTablet ? "hidden" : ""}>
            <Link to={"/signup"} className="signup">
              S&apos;enregistrer
            </Link>
          </li>
          <li className={!isUnderTablet ? "hidden" : ""}>
            <Link to={"/login"} className="login">
              Se connecter
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="second">
        {/* eslint-disable-next-line no-constant-condition*/}
        {true ? (
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
