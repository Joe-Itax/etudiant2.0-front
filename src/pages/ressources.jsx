import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import { useEffect, useState } from "react";
import { RiBookFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCHAPI_KEY
);

const Hit = ({ hit }) => {
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

  return (
    <div className="search-result">
      <Link className="" to={`/ressources/${hit.id}`}>
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
    </div>
  );
};
Hit.propTypes = {
  hit: PropTypes.object,
};

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
          <Hits hitComponent={Hit} className="" />
        </div>
        {/* <Pagination /> */}
      </InstantSearch>
    </div>
  );
}

// import { useState } from "react";
// import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
// import algoliasearch from "algoliasearch";
// import { useNavigate } from "react-router-dom";
// import { RiBookFill } from "@remixicon/react";
// import PropTypes from "prop-types";

// const searchClient = algoliasearch(
//   import.meta.env.VITE_ALGOLIA_APP_ID,
//   import.meta.env.VITE_ALGOLIA_SEARCHAPI_KEY
// );

// const Hit = ({ hit }) => (
//   <div className="search-result">
//     <RiBookFill color="#967fd6" size={25} />
//     <div>
//       <h3>{hit.title}</h3>
//       <p>Catégorie: {hit.categorie}</p>
//     </div>
//   </div>
// );

// Hit.propTypes = {
//   hit: PropTypes.object.isRequired,
// };

// const AutoCompleteSearch = () => {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const handleKeyPress = (event) => {
//     console.log("Query value:", query);
//     if (event.key === "Enter" && query.trim() !== "") {
//       console.log("Navigating with query:", query);
//       navigate(`/search-results?query=${query}`);
//     }
//   };

//   return (
//     <div>
//       <SearchBox
//         onChangeCapture={(e) => setQuery(e.target.value)}
//         placeholder="Rechercher des ressources..."
//         onKeyDown={handleKeyPress}
//       />
//       {query && (
//         <div className="autocomplete-hits">
//           <Hits hitComponent={Hit} />
//           <button onClick={() => navigate(`/search-results?query=${query}`)}>
//             Voir tous les résultats
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const Ressources = () => (
//   <div className="ressources-page">
//     <InstantSearch searchClient={searchClient} indexName="etudiant2.0">
//       <AutoCompleteSearch />
//     </InstantSearch>
//   </div>
// );

// export default Ressources;
