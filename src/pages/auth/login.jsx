import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios-instance";
import amico from "/assets/amico.svg";
import "./auth.css";
import { CircularProgress } from "@mui/material";

import authStatusContext from "../../contexts/auth.context";

import CustomizedSnackbars from "../../components/feedback/notif";
import currentUserContext from "../../contexts/current-user.context";
import usersContext from "../../contexts/users.context";
// import ressourceContext from "../../contexts/ressource.context";
export default function Login() {
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
  const location = useLocation();

  const from = location.state?.from || "/"; // Retourne à la page précédente ou à la racine

  const { isAuthenticated, setIsAuthenticated } = useContext(authStatusContext);
  const { setCurrentUser } = useContext(currentUserContext);
  const { setUsers } = useContext(usersContext);

  console.log("isAuthenticated: ", isAuthenticated);

  // console.log(auth);
  const onSubmit = async (dataFromUser, event) => {
    // console.log("data: ", dataFromUser);
    event.preventDefault();
    try {
      console.log("log before fetch");
      const res = await axiosInstance.post(`/api/auth/login`, dataFromUser, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // console.log("res: ", res); //joeitax3@gmail.com
      // setIsAuthenticated(res?.data?.isLoggedIn);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setIsAuthenticated(res.data.isLoggedIn);
      setCurrentUser(res.data.user);
      setUsers(res.data.users);
      navigate(from, { replace: true });
      // l;
    } catch (error) {
      // console.error("Error lors du login: ", error);
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
  };

  setTimeout(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, 1000);

  const [isFocusEmailFiel, setIsFocusEmailFiel] = useState(false);
  const [isFocusPasswordFiel, setIsFocusPasswordFiel] = useState(false);

  const changeStateEmailField = () => {
    setIsFocusEmailFiel(true);
  };
  const changeStateEmailFieldFalse = () => {
    setIsFocusEmailFiel(false);
  };
  const changeStatePasswordField = () => {
    setIsFocusPasswordFiel(true);
  };
  const changeStatePasswordFieldFalse = () => {
    setIsFocusPasswordFiel(false);
  };

  return (
    <div className="login-page">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      {isAuthenticated ? (
        <div className="w-full mt-40 h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full h-auto mt-20 flex justify-center items-center relative min-[860px]:px-20 min-[400px]:px-10 px-4">
          <CustomizedSnackbars
            open={openNotif}
            message={messageNotif}
            setOpen={setOpenNotif}
            severity={severityNotif}
          />
          <div className="bg-[#371577] flex justify-center min-[860px]:gap-16 gap-10 p-4 py-10 rounded-md mb-20 max-w-[70rem] w-full">
            <div className="img w-[50%] lg:max-w-[25rem] relative hidden md:block">
              <img
                src={amico}
                alt="Svg"
                className="w-full absolute bottom-[-5rem]"
              />
            </div>
            <div className="form flex flex-col items-start justify-around md:w-[50%] w-[100%] min-[860px]:max-w-[25rem] max-[768px]:px-12 max-[550px]:px-2">
              <h1 className="text-[2rem] sm:text-4xl font-bold mb-5 text-left text-white">
                Se connecter
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className="mt-4 w-full"
              >
                {/* Champ de l'e-mail */}
                <div className="relative mb-8 emailField">
                  <div className="flex flex-col gap-1 relative">
                    <label
                      htmlFor="email"
                      className={`labelControlled ${
                        isFocusEmailFiel ? "focus" : "noFocus"
                      }`}
                    >
                      Adresse e-mail
                    </label>
                    <input
                      className={`inputControlled ${
                        errors.email ? "error" : "noError"
                      }`}
                      onFocus={changeStateEmailField}
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Veuillez indiquer votre adresse e-mail.",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Veuillez saisir une adresse e-mail valide",
                        },
                      })}
                      onBlur={(e) => {
                        const emailValue = getValues("email");
                        if (!emailValue) {
                          changeStateEmailFieldFalse();
                        }
                        // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
                        register("email").onBlur(e);
                      }}
                    />
                  </div>
                  {errors.email?.message && (
                    <p className="text-red-500 text-[0.8rem]">
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                {/* Champ du password */}
                <div className="relative mb-8 passwordField">
                  <div className="flex flex-col gap-1 relative">
                    <label
                      htmlFor="password"
                      className={`labelControlled ${
                        isFocusPasswordFiel ? "focus" : "noFocus"
                      }`}
                    >
                      Mot de passe
                    </label>
                    <input
                      className={`inputControlled ${
                        errors.password ? "error" : "noError"
                      }`}
                      onFocus={changeStatePasswordField}
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "Veuillez indiquer votre mot de passe.",
                        minLength: {
                          value: 8,
                          message:
                            "Le mot de passe doit contenir au minimum 8 caractère",
                        },
                        validate: {
                          uppercase: (value) =>
                            /^(?=.*[A-Z])/.test(value) ||
                            "Le mot de passe doit contenir au moins une majuscule",
                          lowercase: (value) =>
                            /^(?=.*[a-z])/.test(value) ||
                            "Le mot de passe doit contenir au moins une minuscule",
                          number: (value) =>
                            /^(?=.*\d)/.test(value) ||
                            "Le mot de passe doit contenir au moins un chiffre",
                          specialCharacter: (value) =>
                            /^(?=.*[@#$*§])/.test(value) ||
                            "Le mot de passe doit contenir au moins un caractère spécial parmi '&#@$*§'",
                        },
                      })}
                      onBlur={(e) => {
                        const emailValue = getValues("password");
                        if (!emailValue) {
                          changeStatePasswordFieldFalse();
                        }
                        // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
                        register("password").onBlur(e);
                      }}
                    />
                  </div>
                  {errors.password?.message && (
                    <p className="text-red-500 text-[0.8rem]">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <div className="font-bold">
                  <input
                    type="submit"
                    value="Se connecter"
                    className="inputSubmitToLogin"
                  />
                </div>
              </form>
              <div className="w-full mt-8 flex flex-col justify-center items-center text-center text-[#cecece]">
                <span className="text-center mb-8">
                  Pas de compte?{" "}
                  <Link
                    to="/signup"
                    className="text-[#fff] underline hover:no-underline"
                  >
                    Créez-en un
                  </Link>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
