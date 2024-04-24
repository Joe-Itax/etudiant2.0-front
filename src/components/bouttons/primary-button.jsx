import PropTypes from "prop-types";

export default function PrimaryBouton({ children }) {
  return (
    <button
      className={`px-4 py-2 border border-transparent rounded-md text-xl font-semibold bg-purple-700 hover:bg-purple-800 text-white`}
    >
      {children}
    </button>
  );
}

PrimaryBouton.propTypes = {
  children: PropTypes.node,
};
