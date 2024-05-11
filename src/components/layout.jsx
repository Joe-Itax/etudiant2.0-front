import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import Header from "./header/header";
import Footer from "./footer/footer";

import universityContext from "../contexts/university.context";
import ressourceContext from "../contexts/ressource.context";
import Loader from "./Loader/loader";
import ScrollTop from "./scroll-to-top/scroll-to-top";

export default function Layout() {
  const [loading, setLoading] = useState(false);

  const { university } = useContext(universityContext);
  const { ressource } = useContext(ressourceContext);

  useEffect(() => {
    if (ressource.length > 0 && university.length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [ressource, university]);

  return (
    <>
      {loading ? (
        <>
          <Header />
          <main className="relative mt-[92.3px] md:mt-[111px]">
            <Outlet />
          </main>
          <Footer />
          <ScrollTop>
            {" "}
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUp />
            </Fab>
          </ScrollTop>
        </>
      ) : (
        <div className="relative w-full h-full">
          <Loader></Loader>
        </div>
      )}
    </>
  );
}
