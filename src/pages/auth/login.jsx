import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import amico from "/assets/amico.svg";
import "./auth.css";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useForm();

  const onSubmit = async (dataFromUser, event) => {
    // console.log("data: ", dataFromUser);
    event.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
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
    } catch (error) {
      console.error("Error: ", error);
    }
    // if (event.currentTarget || event.target) {
    //   event.currentTarget.reset();
    //   event.target.reset();
    // }
    // reset();
  };

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
    <div className="w-full h-auto mt-20 flex justify-center items-center relative min-[860px]:px-20 min-[400px]:px-10 px-4">
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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
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
  );
}
