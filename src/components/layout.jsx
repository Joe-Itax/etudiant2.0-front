import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";
import authStatusContext from "../contexts/auth.context";
import universityContext from "../contexts/university.context";
import ressourceContext from "../contexts/ressource.context";
import Loader from "./Loader/loader";

export default function Layout() {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(authStatusContext);
  const { university } = useContext(universityContext);
  const { ressource } = useContext(ressourceContext);

  console.log("isAuthenticated in Layout: ", isAuthenticated);

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
        </>
      ) : (
        <div className="relative w-full h-full">
          <Loader></Loader>
        </div>
      )}
    </>
  );
}
