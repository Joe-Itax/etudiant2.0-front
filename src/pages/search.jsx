// import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
// import algoliasearch from "algoliasearch";
// import { useEffect, useState } from "react";
// import { RiBookFill } from "@remixicon/react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

// const searchClient = algoliasearch(
// import.meta.env.VITE_ALGOLIA_APP_ID,
// import.meta.env.VITE_ALGOLIA_SEARCHAPI_KEY
// );

// const Hit = ({ hit }) => {
//   console.log("hittt: ", hit);
//   const categoriesMap = {
//     Livre: "Livre",
//     NoteDeCours: "Note de Cours",
//     Exercices: "Exercices",
//     PreparationExamen: "Préparation d'examen",
//     Tp: "Travail pratique (TP)",
//     Td: "Travail dirigé (TD)",
//     Rapports: "Rapports",
//     Resumes: "Résumés",
//     Autre: "Autre",
//   };
//   const categorieKey = hit.categorie;
//   const categorie = categoriesMap[categorieKey] || "Autre";

//   return (
//     <div className="search-result">
//       <Link className="" to={`/ressources/${hit.id}`}>
//         <div>
//           <RiBookFill color="#967fd6" size={25} />
//         </div>
//         <div className="search-result-info">
//           <h3 className="">
//             <Highlight attribute="title" hit={hit} />
//           </h3>
//           <p className="categorie">categorie: {categorie}</p>
//         </div>
//       </Link>
//     </div>
//   );
// };
// Hit.propTypes = {
//   hit: PropTypes.object,
// };

// export default function Ressources() {
// const [isFocused, setIsFocused] = useState(false);
// const handleFocus = () => {
//   setIsFocused(true);
// };
// const handleBlur = () => {
//   setIsFocused(false);
// };
// useEffect(() => {
//   window.scrollTo({
//     top: 0,
//   });
// }, []);

//   return (
// <div className="ressources-page">
//   <InstantSearch searchClient={searchClient} indexName="etudiant2.0">
//     <div className="hero">
//       <div className="self-center">
//         <RiBookFill color="#967fd6" size={150} />
//       </div>
//       <h1 className="">
//         Découvrez une collection complète de ressources éducatives pour vous
//         aider à exceller dans vos études.
//       </h1>
//       <SearchBox
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         className={`search-box ${isFocused ? "search-box-focused" : ""}`}
//       />
//     </div>
//     <div className="hits-container">
//       <div>
//         <h2>Ressources les plus recentes</h2>
//       </div>
//       <Hits hitComponent={Hit} className="" />
//     </div>
//     {/* <Pagination /> */}
//   </InstantSearch>
// </div>
//   );
// }

import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Highlight,
} from "react-instantsearch";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch";
import { useLocation } from "react-router-dom";
import { RiBookFill } from "@remixicon/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCHAPI_KEY
);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

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

const SearchResults = () => {
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

  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const newQuery = query.get("query");
    if (newQuery) {
      setSearchQuery(newQuery);
    }
  }, [query]);

  console.log("searchQuerysearchQuery: ", searchQuery);
  return (
    // <InstantSearch searchClient={searchClient} indexName="etudiant2.0">
    //   <SearchBox defaultRefinement={searchQuery} />
    //   <div className="hits-container">
    //     <Hits hitComponent={Hit} />
    //   </div>
    //   <Pagination />
    // </InstantSearch>
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
            defaultValue={searchQuery}
            onChangeCapture={(e) => {
              setSearchQuery(e.target.value);
            }}
            queryHook={(query, search) => {
              search(search);
            }}
            autoFocus
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
};

export default SearchResults;
