import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import amico from "/assets/amico.svg";
import "./auth.css";
import authStatusContext from "../../contexts/auth.context";
import CustomizedSnackbars from "../../components/notif";

export default function SignUp() {
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
    // reset,
  } = useForm();

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(authStatusContext);

  // console.log("isAuthenticated: ", isAuthenticated);

  useEffect(() => {
    /*if (isAuthenticated) {
      navigate("/profil");
    }*/
  }, [isAuthenticated, navigate]);
  const onSubmit = async (dataFromUser, event) => {
    dataFromUser["universityId"] = dataFromUser["university"];
    delete dataFromUser["university"];
    if (dataFromUser.universityId === "") {
      dataFromUser.universityId = null;
    }
    event.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        dataFromUser,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true, // Activer l'envoi des cookies avec la requête
        }
      );
      // const dataa = await res.json();
      console.log(res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setIsAuthenticated(res.data.isLoggedIn);
    } catch (error) {
      console.error("Error: ", error);
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
  //University
  /*const changeStateUniversityField = () => {
    setIsFocusUniversityFiel(true);
  };
  const changeStateUniversityFieldFalse = () => {
    setIsFocusUniversityFiel(false);
  };*/
  useEffect(() => {
    setTimeout(function () {
      if (isAuthenticated) {
        navigate("/profil");
      }
    }, 3000);
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full h-auto mt-20 flex justify-center items-center relative min-[860px]:px-20 min-[400px]:px-10 px-4">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <div className="bg-[#371577] flex justify-center min-[860px]:gap-16 gap-10 p-4 py-10 rounded-md mb-20 max-w-[70rem] w-full">
        <div className="form flex flex-col items-start justify-around md:w-[50%] w-[100%] min-[860px]:max-w-[25rem] max-[768px]:px-2 max-[550px]:px-2">
          <h1 className="text-[2rem] sm:text-4xl font-bold mb-5 text-left text-white">
            Créer un compte
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 w-full"
            autoComplete="off"
          >
            {/* Champ du PreNom|firstname */}
            <div className="relative mb-8 firstField">
              <div className="flex flex-col gap-1 relative">
                <label
                  htmlFor="firstname"
                  className={`labelControlled ${
                    isFocusField.firstname ? "focus" : "noFocus"
                  }`}
                >
                  Prenom *
                </label>
                <input
                  autoComplete="nope123"
                  className={`inputControlled ${
                    errors.firstname ? "error" : "noError"
                  }`}
                  onFocus={handleFocusFirstnameField}
                  type="text"
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
                  autoComplete="nope345"
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

            {/* Champ de l'université */}
            <div className="relative mb-8 universityField">
              <div className="flex items-center gap-1 relative">
                <label htmlFor="university" className={`text-white`}>
                  Université:
                </label>
                <select
                  name="university"
                  id="university"
                  className="inputControlled focus:border-[#5396e7] focus:shadow-[0_0_0_3px_#4869ee3f] border-[#AB8AF1]"
                  {...register("university")}
                >
                  <option value="" className="">
                    -- Veuillez choisir votre université --
                  </option>
                  <option value="UNIKIN">UNIKIN</option>
                </select>
              </div>
              {errors.password?.message && (
                <p className="text-red-500 text-[0.8rem]">
                  {errors.university?.message}
                </p>
              )}
            </div>
            <div className="font-bold">
              <input
                type="submit"
                value="S'inscrire"
                className="inputSubmitToLogin"
              />
            </div>
          </form>
          <div className="w-full mt-8 flex flex-col justify-center items-center text-center text-[#cecece]">
            <span className="text-center mb-8">
              Vous avez déjà un compte?{" "}
              <Link
                to="/login"
                className="text-[#fff] underline hover:no-underline"
              >
                Connectez-vous
              </Link>
              .
            </span>
          </div>
        </div>
        <div className="img w-[50%] lg:max-w-[25rem] relative hidden md:block">
          <img
            src={amico}
            alt="Svg"
            className="w-full absolute bottom-[-5rem]"
          />
        </div>
      </div>
    </div>
  );
}
