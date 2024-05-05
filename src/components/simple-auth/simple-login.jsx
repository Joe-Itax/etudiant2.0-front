import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
// import { LoadingButton } from "@mui/lab";
// import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../feedback/notif";
import authStatusContext from "../../contexts/auth.context";
import currentUserContext from "../../contexts/current-user.context";
import axiosInstance from "../../utils/axios-instance";

import "./style.css";

export default function SimpleLogin() {
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

  const { setIsAuthenticated } = useContext(authStatusContext);
  const { setCurrentUser } = useContext(currentUserContext);

  // const navigate = useNavigate();

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

  if (Object.keys(errors).length > 0) {
    console.log("errors usefom*rm!: ", errors);
  }

  const onSubmit = async (dataFromUser, event) => {
    // console.log("data: ", dataFromUser);
    event.preventDefault();
    try {
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
    } catch (error) {
      // console.error("Error: ", error);
      if (error?.response?.status === 404 || error?.response?.status === 400) {
        setMessageNotif(error.response.data.message);
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      } else if (error.code === "ERR_NETWORK") {
        setMessageNotif("Serveur hors service.");
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      } else {
        setMessageNotif(
          "Oups, Une erreur s'est produite lors de la connection de votre compte.Veuillez réessayé plutard!"
        );
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    }
  };

  return (
    <div className="SimpleLogin-page">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <div className="form-box">
        {" "}
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
      </div>
    </div>
  );
}
