import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Ressources from "./pages/ressources";
import Contact from "./pages/contact";
import Upload from "./pages/upload";
import UploadSuccess from "./pages/upload-success";
import ActiveAccount from "./pages/active-account";
import Layout from "./components/layout";
import Profil from "./pages/profil";
import ContextProvider from "./components/context-provider/context-provider";
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
  {
    path: "/account/activate",
    element: <ActiveAccount />,
  },
]);
function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={routes} />
      </ContextProvider>
    </>
  );
}

export default App;
