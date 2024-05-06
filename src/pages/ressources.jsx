import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  useInstantSearch,
} from "react-instantsearch";
import algoliasearch from "algoliasearch";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RiBookFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import authStatusContext from "../contexts/auth.context";
import AlertDialog2 from "../components/feedback/alert-dialog2";
import PropTypes from "prop-types";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCHAPI_KEY
);

function Hit({ hit }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(authStatusContext);
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    navigate("/login", { state: { from: `/ressources/${hit.id}` } });
  };
  const handleClickOpen = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("hittt: ", hit);
  const categoriesMap = {
    Livre: "Livre",
    NoteDeCours: "Note de Cours",
    Exercices: "Exercices",
    PreparationExamen: "Préparation d'examen",
    Tp: "Travail pratique (TP)",
    Td: "Travail dirigé (TD)",
    Rapports: "Rapports",
    Resumes: "Résumés",
    Autre: "Autre",
  };
  const categorieKey = hit.categorie;
  const categorie = categoriesMap[categorieKey] || "Autre";

  // console.log("hit: ", hit);

  return (
    <div className="search-result">
      <AlertDialog2
        open={open}
        handleClose={handleClose}
        handleClickToLogin={handleLinkClick}
      />
      {hit ? (
        <Link
          className=""
          to={`/ressources/${hit.id}`}
          onClick={handleClickOpen}
        >
          <div>
            <RiBookFill color="#967fd6" size={25} />
          </div>
          <div className="search-result-info">
            <h3 className="">
              <Highlight attribute="title" hit={hit} />
            </h3>
            <p className="categorie">categorie: {categorie}</p>
          </div>
        </Link>
      ) : (
        <div>
          <CircularProgress></CircularProgress>
        </div>
      )}
    </div>
  );
}
Hit.propTypes = {
  hit: PropTypes.object,
};

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}
NoResultsBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
};

function NoResults() {
  const { indexUiState } = useInstantSearch();
  return (
    <div>
      <p>
        Aucun document correspondant à votre recherche{" "}
        <q>
          <b>{indexUiState.query}</b>
        </q>{" "}
        n&apos;a été trouvé.
      </p>{" "}
      <p>Essayez une autre recherche avec des mots-clés différents.</p>
    </div>
  );
}

export default function Ressources() {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="ressources-page">
      <InstantSearch searchClient={searchClient} indexName="etudiant2.0">
        <div className="hero">
          <div className="self-center">
            <RiBookFill color="#967fd6" size={150} />
          </div>
          <h1 className="">
            Découvrez une collection complète de ressources éducatives pour vous
            aider à exceller dans vos études.
          </h1>
          <SearchBox
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`search-box ${isFocused ? "search-box-focused" : ""}`}
          />
        </div>
        <div className="hits-container">
          <div>
            <h2>Ressources les plus recentes</h2>
          </div>
          <NoResultsBoundary fallback={<NoResults />}>
            <Hits hitComponent={Hit} />
          </NoResultsBoundary>
        </div>
        {/* <Pagination /> */}
      </InstantSearch>
    </div>
  );
}
