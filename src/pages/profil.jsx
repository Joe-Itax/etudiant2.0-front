import { useState } from "react";
import Avatar from "react-avatar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RiUserFill, RiLock2Fill, RiDeleteBin5Fill } from "@remixicon/react";
import "./index.css";

export default function Profil() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      email: `johndoe@gmail.com`,
      firstname: `Jonh`,
      lastname: `Doe`,
      university: ``,
    },
  });

  const onSubmitNewInfos = async (dataFromUser, event) => {
    delete dataFromUser["currentPassword"];
    delete dataFromUser["newPassword"];
    delete dataFromUser["confirmNewPassword"];
    console.log("data: ", dataFromUser);
    event.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${1}`,
        dataFromUser,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true, // Activer l'envoi des cookies avec la requête
        }
      );
      console.log(res);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const onSubmitNewPassword = async (dataFromUser, event) => {
    delete dataFromUser["email"];
    delete dataFromUser["firstname"];
    delete dataFromUser["lastname"];
    delete dataFromUser["university"];
    delete dataFromUser["confirmNewPassword"];
    // console.log("data: ", dataFromUser);
    event.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${1}`,
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
  };

  const submitDeleteAccountReq = async () => {
    console.log(`Compte supprimer avec succès !`);
  };

  const [isFocusField, setIsFocusField] = useState({
    firstname: false,
    lastname: false,
    email: false,
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
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
  //currentPassword
  const handleFocusCurrentPasswordField = () => {
    changeStateField("currentPassword", true);
  };
  const handleBlurCurrentPasswordField = () => {
    changeStateField("currentPassword", false);
  };
  //newPassword
  const handleFocusNewPasswordField = () => {
    changeStateField("newPassword", true);
  };
  const handleBlurNewPasswordField = () => {
    changeStateField("newPassword", false);
  };
  //confirmNewPassword
  const handleFocusConfirmNewPasswordField = () => {
    changeStateField("confirmNewPassword", true);
  };
  const handleBlurConfirmNewPasswordField = () => {
    changeStateField("confirmNewPassword", false);
  };

  const currentPassword = watch("currentPassword", "");
  const newPassword = watch("newPassword", "");

  return (
    <div className="profil-main-container px-16 max-[500px]:px-8 mt-4">
      <div className="flex border-b p-8 flex-col sm:flex-row">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
          <div className="avatar flex flex-col items-center">
            <Avatar
              name="John Doe"
              round={true}
              size="150px"
              src={null}
              alt="Avatar"
              className={`text-2xl`}
            />
            <span className="cursor-pointer max-[639px]:text-center">
              Modifier ma photo de profil
              {/* <input type="file" name="profil-image" id="" /> */}
            </span>
          </div>
          <div className="flex flex-col max-[639px]:text-center">
            <span className="text-3xl font-semibold">John Doe</span>
            <span>Inscrit depuit 12 jours</span>
          </div>
        </div>
      </div>
      <section className="informations p-8 max-[500px]:px-0">
        <h2 className="flex gap-2 items-center text-2xl font-semibold">
          <RiUserFill size={30} /> Mes informations
        </h2>
        <div className="mt-0 py-2 flex">
          <form
            onSubmit={handleSubmit(onSubmitNewInfos)}
            className="flex w-full flex-col gap-4"
          >
            <div className="bg-[#371577] flex p-8 gap-8 justify-center items-center rounded-md flex-wrap">
              {/* Champ de l'e-mail */}
              <div className="relative emailField w-full md:w-auto">
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="email"
                    className={`labelControlled ${
                      isFocusField.email || getValues("email")
                        ? "focus"
                        : "noFocus"
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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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

              {/* Champ du prenom|firstname */}
              <div className="relative firstField w-full md:w-auto">
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="firstname"
                    className={`labelControlled ${
                      isFocusField.firstname || getValues("firstname")
                        ? "focus"
                        : "noFocus"
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
                      required: "Veuillez indiquer votre Nom.",
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
              <div className="relative lastnameField w-full md:w-auto">
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="lastname"
                    className={`labelControlled ${
                      isFocusField.lastname || getValues("lastname")
                        ? "focus"
                        : "noFocus"
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
                      required: "Veuillez indiquer votre Prénom.",
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

              {/* Champ de l'université */}
              <div className="relative universityField w-full md:w-auto">
                <div className="flex items-center gap-1 relative">
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
            </div>

            <div className="font-bold self-end">
              <input
                type="submit"
                value="Modifier mon profil"
                className="inputSubmitToLogin bg-purple-800 hover:bg-purple-900 text-white"
              />
            </div>
          </form>
        </div>
      </section>

      <section className="password p-8 max-[500px]:px-0">
        <h2 className="flex gap-2 items-center text-2xl font-semibold">
          <RiLock2Fill size={30} /> Mot de passe
        </h2>
        <div className="mt-0 py-2 flex">
          <form
            onSubmit={handleSubmit(onSubmitNewPassword)}
            className="flex w-full flex-col gap-4"
          >
            <div className="bg-[#371577] flex p-8 gap-8 justify-center items-center rounded-md flex-wrap">
              {/* Champ du password actuel*/}
              <div className="relative passwordField w-full md:w-auto">
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="currentPassword"
                    className={`labelControlled ${
                      isFocusField.currentPassword ? "focus" : "noFocus"
                    }`}
                  >
                    Mot de passe actuel *
                  </label>
                  <input
                    className={`inputControlled ${
                      errors.currentPassword ? "error" : "noError"
                    }`}
                    onFocus={handleFocusCurrentPasswordField}
                    type="password"
                    id="currentPassword"
                    {...register("currentPassword", {
                      required: "Veuillez indiquer votre mot de passe actuel.",
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
                      const emailValue = getValues("currentPassword");
                      if (!emailValue) {
                        handleBlurCurrentPasswordField();
                      }
                      // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
                      register("currentPassword").onBlur(e);
                    }}
                  />
                </div>
                {errors.currentPassword?.message && (
                  <p className="text-red-500 text-[0.8rem]">
                    {errors.currentPassword?.message}
                  </p>
                )}
              </div>

              {/* Champ du nouveau password*/}
              <div className="relative passwordField w-full md:w-auto">
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="newPassword"
                    className={`labelControlled ${
                      isFocusField.newPassword ? "focus" : "noFocus"
                    }`}
                  >
                    Nouveau *
                  </label>
                  <input
                    className={`inputControlled ${
                      errors.newPassword ? "error" : "noError"
                    }`}
                    onFocus={handleFocusNewPasswordField}
                    type="password"
                    id="newPassword"
                    {...register("newPassword", {
                      required: "Veuillez indiquer votre nouveau mot de passe.",
                      minLength: {
                        value: 8,
                        message:
                          "Le mot de passe doit contenir au minimum 8 caractère",
                      },
                      validate: {
                        passwordMatch: (value) =>
                          value !== currentPassword ||
                          "Définissez un nouveau mot de passe différent de l'ancien",
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
                      const emailValue = getValues("currentPassword");
                      if (!emailValue) {
                        handleBlurNewPasswordField();
                      }
                      // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
                      register("newPassword").onBlur(e);
                    }}
                  />
                </div>
                {errors.newPassword?.message && (
                  <p className="text-red-500 text-[0.8rem]">
                    {errors.newPassword?.message}
                  </p>
                )}
              </div>

              {/* Champ du confirmation du nouveau password*/}
              <div className="relative passwordField w-full md:w-auto">
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="confirmNewPassword"
                    className={`labelControlled ${
                      isFocusField.confirmNewPassword ? "focus" : "noFocus"
                    }`}
                  >
                    Confirmer *
                  </label>
                  <input
                    className={`inputControlled ${
                      errors.confirmNewPassword ? "error" : "noError"
                    }`}
                    onFocus={handleFocusConfirmNewPasswordField}
                    type="password"
                    id="confirmNewPassword"
                    {...register("confirmNewPassword", {
                      required:
                        "Veuillez confirmer votre nouveau mot de passe.",
                      minLength: {
                        value: 8,
                        message:
                          "Le mot de passe doit contenir au minimum 8 caractère",
                      },
                      validate: {
                        passwordMatch: (value) =>
                          value === newPassword ||
                          "Les mots de passe ne correspondent pas",
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
                      const emailValue = getValues("confirmNewPassword");
                      if (!emailValue) {
                        handleBlurConfirmNewPasswordField();
                      }
                      // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
                      register("confirmNewPassword").onBlur(e);
                    }}
                  />
                </div>
                {errors.confirmNewPassword?.message && (
                  <p className="text-red-500 text-[0.8rem]">
                    {errors.confirmNewPassword?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="font-bold self-end">
              <input
                type="submit"
                value="Modifier mon mot de passe"
                className="inputSubmitToLogin bg-purple-800 hover:bg-purple-900 text-white"
              />
            </div>
          </form>
        </div>
      </section>

      <section className="danger-zone p-8 max-[500px]:px-0 flex flex-col">
        <h2 className="flex gap-2 items-center text-2xl font-semibold text-[red]">
          <RiDeleteBin5Fill size={30} color="red" /> Danger zone
        </h2>
        <div className="mt-2 rounded-md py-6 flex flex-col bg-[#371577] p-8 mb-4 text-white text-xl">
          <div>
            <span>Vous n&apos;êtes pas satisfait du contenu du site?</span>
          </div>
          <div>
            <span>
              Ou vous souhaitez supprimer toutes les informations associées à ce
              compte?
            </span>
          </div>
        </div>
        <div className="font-bold self-end">
          <input
            type="button"
            onClick={submitDeleteAccountReq}
            value="Supprimer mon compte"
            className="inputSubmitToLogin bg-[red] hover:bg-red-800 text-white"
          />
        </div>
      </section>
    </div>
  );
}
