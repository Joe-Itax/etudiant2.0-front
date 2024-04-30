import PropTypes from "prop-types";

export default function CustomBouton({ children, variant }) {
  return (
    <button
      className={`px-4 py-2 border rounded-md text-xl font-semibold ${
        variant === "primary"
          ? "bg-purple-700 border-transparent  hover:bg-purple-800 text-white"
          : variant === "secondary"
          ? "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-700"
          : ""
      }`}
    >
      {children}
    </button>
  );
}

CustomBouton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};
