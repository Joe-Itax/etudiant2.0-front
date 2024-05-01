/*import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "/assets/Etudiant-20.svg";
import currentUserContext from "../contexts/current-user.context";
import authStatusContext from "../contexts/auth.context";
import CustomizedSnackbars from "../components/notif";
import axiosInstance from "../utils/axios-instance";

export default function ActiveAccount() {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { isAuthenticated } = useContext(authStatusContext);
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (dataFromUser, event) => {
    // console.log("data: ", dataFromUser);
    event.preventDefault();
    try {
      const res = await axiosInstance.post(
        `/api/users/${currentUser?.id}`,
        dataFromUser,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log("res: ", res); //joeitax3@gmail.com
      // setIsAuthenticated(res?.data?.isLoggedIn);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      //  setIsAuthenticated(res.data.isLoggedIn);
      //  setCurrentUser(res.data.user);
    } catch (error) {
      // console.error("Error: ", error);
      if (error?.response?.status === 404 || error?.response?.status === 400) {
        setMessageNotif(error.response.data.message);
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }

      if (error.code === "ERR_NETWORK") {
        setMessageNotif("Serveur hors service.");
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    }
    // if (event.currentTarget || event.target) {
    //   event.currentTarget.reset();
    //   event.target.reset();
    // }
    // reset();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser.isActive) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, currentUser]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-12">
          <img src={logo} alt="logo Etudiant 2.0" />
        </div>
        <div className="mt-4 flex">
          <h2 className="text-3xl font-bold text-center px-2 mb-12">
            Active ton compte
          </h2>
        </div>
        <div className="px-8 text-center">
          <span>
            Parle nous de toi et nous pourrons te recommander des documents, de
            nouvelles fonctionnalités et bien plus encore !
          </span>
        </div>
      </div>
      <div className="w-full px-4 sm:px-8 py-10 sm:py-20 md:py-32 flex justify-center items-center">
        <form>Hello</form>
      </div>
    </div>
  );
}
*/
