import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";

export default function OpenMobileMenu({ toggleDrawer, state, children }) {
  return (
    <div>
      <Drawer
        anchor={"top"}
        open={state.top}
        onClose={toggleDrawer("top", false)}
      >
        {children}
      </Drawer>
    </div>
  );
}

OpenMobileMenu.propTypes = {
  children: PropTypes.node,
  toggleDrawer: PropTypes.func,
  state: PropTypes.object,
};
