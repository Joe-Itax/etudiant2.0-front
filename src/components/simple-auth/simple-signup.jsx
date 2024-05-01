import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../feedback/notif";
import authStatusContext from "../../contexts/auth.context";
import currentUserContext from "../../contexts/current-user.context";
import axiosInstance from "../../utils/axios-instance";

import "./style.css";

export default function SimpleSignup() {
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

  const onSubmit = async (dataFromUser, event) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post(`/api/auth/signup`, dataFromUser, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true, // Activer l'envoi des cookies avec la requête
      });
      // const dataa = await res.json();
      // console.log(res);
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
        setMessageNotif("Une erreur s'est produite.");
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    }
  };

  const [isFocusField, setIsFocusField] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  });
  const changeStateField = (fieldName, value) => {
    setIsFocusField({
      ...isFocusField,
      [fieldName]: value,
    });
  };

  //Firstname
  const handleFocusFirstnameField = () => {
    changeStateField("firstname", true);
  };
  const handleBlurFirstnameField = () => {
    changeStateField("firstname", false);
  };

  //Lastname
  const handleFocusLastnameField = () => {
    changeStateField("lastname", true);
  };
  const handleBlurLastnameField = () => {
    changeStateField("lastname", false);
  };

  //Email
  const handleFocusEmailField = () => {
    changeStateField("email", true);
  };
  const handleBlurEmailField = () => {
    changeStateField("email", false);
  };

  //Password
  const handleFocusPasswordField = () => {
    changeStateField("password", true);
  };
  const handleBlurPasswordField = () => {
    changeStateField("password", false);
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
          {/* Champ du PreNom|firstname */}
          <div className="relative mb-8 firstField">
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="email"
                className={`labelControlled ${
                  isFocusField.firstname ? "focus" : "noFocus"
                }`}
              >
                Prenom *
              </label>
              <input
                className={`inputControlled ${
                  errors.firstname ? "error" : "noError"
                }`}
                onFocus={handleFocusFirstnameField}
                type="firstname"
                id="firstname"
                {...register("firstname", {
                  required: "Veuillez indiquer votre prenom.",
                  minLength: {
                    value: 3,
                    message: `La longueure minimum du nom est de 3`,
                  },
                })}
                onBlur={(e) => {
                  const firstnameValue = getValues("firstname");
                  if (!firstnameValue) {
                    handleBlurFirstnameField();
                  }
                  // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
                  register("firstname").onBlur(e);
                }}
              />
            </div>
            {errors.firstname?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.firstname?.message}
              </p>
            )}
          </div>

          {/* Champ du nom|lastname */}
          <div className="relative mb-8 lastnameField">
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="lastname"
                className={`labelControlled ${
                  isFocusField.lastname ? "focus" : "noFocus"
                }`}
              >
                Nom *
              </label>
              <input
                className={`inputControlled ${
                  errors.lastname ? "error" : "noError"
                }`}
                onFocus={handleFocusLastnameField}
                type="text"
                id="lastname"
                {...register("lastname", {
                  required: "Veuillez indiquer votre nom.",
                  minLength: {
                    value: 3,
                    message: `La longueure minimum du prénom est de 3`,
                  },
                })}
                onBlur={(e) => {
                  const lastnameValue = getValues("lastname");
                  if (!lastnameValue) {
                    handleBlurLastnameField();
                  }
                  // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
                  register("lastname").onBlur(e);
                }}
              />
            </div>
            {errors.lastname?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.lastname?.message}
              </p>
            )}
          </div>

          {/* Champ de l'e-mail */}
          <div className="relative mb-8 emailField">
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="email"
                className={`labelControlled ${
                  isFocusField.email ? "focus" : "noFocus"
                }`}
              >
                Adresse e-mail *
              </label>
              <input
                className={`inputControlled ${
                  errors.email ? "error" : "noError"
                }`}
                onFocus={handleFocusEmailField}
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
                    handleBlurEmailField();
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
                  isFocusField.password ? "focus" : "noFocus"
                }`}
              >
                Mot de passe *
              </label>
              <input
                className={`inputControlled ${
                  errors.password ? "error" : "noError"
                }`}
                onFocus={handleFocusPasswordField}
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
                    handleBlurPasswordField();
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
