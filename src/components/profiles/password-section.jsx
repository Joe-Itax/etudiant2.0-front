import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RiLock2Fill } from "@remixicon/react";
import CustomizedSnackbars from "../notif";

export default function PasswordSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const onSubmitNewPassword = async (dataFromUser, event) => {
    // delete dataFromUser["confirmNewPassword"];

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
      // const dataa = await res.json();
      console.log(res);
      if (res.status === 200) {
        setMessageNotif(res.data.message);
        setSeverityNotif("success");
        handleSubmitOpenNotif();
      } else {
        setMessageNotif(
          "Une erreur est survenue lors de la modification de votre mot de passe. Veuillez réessayer plustard."
        );
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    } catch (error) {
      console.error("Error: ", error);
      setMessageNotif(error.response.data.message);
      setSeverityNotif("error");
      handleSubmitOpenNotif();
    }
  };

  const [isFocusField, setIsFocusField] = useState({
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
    <>
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <section className="password py-4 px-8 max-[500px]:px-0">
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
    </>
  );
}
