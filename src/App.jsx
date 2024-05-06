import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Ressources from "./pages/ressources";
import ResourceDetail from "./components/ressource-detail/ressource-detail";
import Contact from "./pages/contact";
import Upload from "./pages/upload";
import UploadSuccess from "./pages/upload-success";
import Profil from "./pages/profil";
import Layout from "./components/layout";
import ContextProvider from "./components/context-provider/context-provider";
import { useEffect } from "react";
import SearchResults from "./pages/search";

// console.log("import.meta.env: ", import.meta.env);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ressources",
        element: <Ressources />,
      },
      {
        path: "/ressources/:id",
        element: <ResourceDetail />,
      },
      {
        path: "/search-results",
        element: <SearchResults />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/upload/success",
        element: <UploadSuccess />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  // {
  //   path: "/account/activate",
  //   element: <ActiveAccount />,
  // },
]);
export default function App() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <ContextProvider>
        <RouterProvider router={routes} />
      </ContextProvider>
    </>
  );
}
