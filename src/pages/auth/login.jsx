import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useForm();

  const onSubmit = (data, event) => {
    console.log("data: ", data);
    event.preventDefault();
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

  //console.log("isFocusEmailFiel: ", isFocusEmailFiel);

  return (
    <div className={`relative w-full h-full text-white bg-[#171933]`}>
      <div
        className={`absolute w-full flex flex-col justify-center items-center -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 p-4`}
      >
        <h1 className="text-[2.5rem] sm:text-5xl font-bold mb-5 text-center">
          Se connecter
        </h1>
        <div className="login-with-google flex items-center gap-4 mb-4 border border-yellow-50 px-1 py-2 cursor-pointer rounded">
          <svg
            className="w-[30px] h-[30px]"
            viewBox="-3 0 262 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </svg>
          <span> Continuer avec Google</span>
        </div>

        <div className="mb-4">
          <p>Ou</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#22244D] px-3 py-6 w-[15rem] min-[350px]:w-[20rem] sm:w-[25rem] rounded border border-solid border-[#2A2E5E] shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
        >
          {/* Champ de l'e-mail */}
          <div className="relative mb-8 emailField">
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="email"
                className={`absolute bg-[#171933] px-2 ${
                  isFocusEmailFiel
                    ? "-translate-x-1 -translate-y-2/4 left-4 top-0"
                    : "-translate-x-2 -translate-y-2/4 left-4 top-2/4"
                }`}
              >
                Adresse e-mail
              </label>
              <input
                className="w-full h-[50px] bg-[#171933] border border-solid border-[#171933] focus:outline-none focus:border-[#5396e7] focus:shadow-[0_0_0_3px_#4869ee3f] pl-2 rounded"
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

          <div className="relative mb-4 passwordField">
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="password"
                className={`absolute bg-[#171933] px-2 ${
                  isFocusPasswordFiel
                    ? "-translate-x-1 -translate-y-2/4 left-4 top-0"
                    : "-translate-x-2 -translate-y-2/4 left-4 top-2/4"
                }`}
              >
                Mot de passe
              </label>
              <input
                className="w-full h-[50px] bg-[#171933] border border-solid border-[#171933] focus:outline-none focus:border-[#5396e7] focus:shadow-[0_0_0_3px_#4869ee3f] pl-2 rounded"
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

        <div className="mt-8 flex flex-col justify-center ">
          <span className="text-center mb-8">
            Pas de compte?{" "}
            <Link
              to="/signup"
              className="text-[#5396e7] underline hover:no-underline"
            >
              Créez-en un
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
