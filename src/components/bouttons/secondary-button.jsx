import PropTypes from "prop-types";

export default function SecondaryBouton({ children }) {
  return (
    <button
      className={`px-4 py-2 border border-purple-700 rounded-md text-xl font-semibold bg-purple-100 hover:bg-purple-200 text-purple-700`}
    >
      {children}
    </button>
  );
}

SecondaryBouton.propTypes = {
  children: PropTypes.node,
};
