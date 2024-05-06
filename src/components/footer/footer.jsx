import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiFacebookCircleFill,
} from "@remixicon/react";
import authStatusContext from "../../contexts/auth.context";
import logo from "/assets/Etudiant-20.svg";
import "./style.css";

export default function Footer() {
  const { isAuthenticated } = useContext(authStatusContext);
  return (
    <footer>
      <div className="logo-box">
        <Link to={`/`}>
          <img src={logo} alt="logo Etudiant 2.0" />
        </Link>
      </div>
      <div className="menu-box">
        <ul>
          <li>
            <Link to={`/`}>Accueil</Link>
          </li>
          <li>
            <Link to={`/ressources`}>Ressources</Link>
          </li>
          <li>
            <Link to={`/contact`}>Contact</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to={`/profil`}>Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={`/login`}>Se connecter</Link>
              </li>
              <li>
                <Link to={`/signup`}>S&apos;enregistrer</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="links-box">
        <div>
          <Link
            to={`https://github.com/Joe-Itax/etudiant2.0-front/tree/dev/front`}
            target="_blank"
            rel="noreferrer"
          >
            <RiGithubFill size={40} />
          </Link>
        </div>
        <div>
          <Link to={`#`} rel="noreferrer">
            <RiLinkedinBoxFill size={40} />
          </Link>
        </div>
        <div>
          <Link to={`#`} rel="noreferrer">
            <RiFacebookCircleFill size={40} />
          </Link>
        </div>
      </div>
      <div className="copy-box">
        <div>
          <span>&copy; 2024 Etudiant 2.0. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
}
