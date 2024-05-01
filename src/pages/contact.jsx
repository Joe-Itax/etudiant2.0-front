import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, styled } from "@mui/material";
import { Send } from "@mui/icons-material";
import authStatusContext from "../contexts/auth.context";
import currentUserContext from "../contexts/current-user.context";
import axiosInstance from "../utils/axios-instance";
import TransitionAlerts from "../components/feedback/alert";

export default function Contact() {
  window.scrollTo({
    top: 0,
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleOpenAlert = () => {
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setOpen(false);
  };
  if (open) {
    setTimeout(() => {
      handleCloseAlert();
    }, 10000);
  }

  const { isAuthenticated } = useContext(authStatusContext);
  const { currentUser } = useContext(currentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstname: `${currentUser?.firstname || ""}`,
      lastname: `${currentUser?.lastname || ""}`,
      sujet: "",
      email: `${currentUser?.email || ""}`,
      message: "",
    },
  });

  const onSubmit = async (dataFromUser, event) => {
    if (isAuthenticated) {
      dataFromUser.userId = currentUser.id;
    }
    // console.log("data: ", dataFromUser);
    event.preventDefault();

    window.scrollTo({
      top: 0,
    });
    try {
      const res = await axiosInstance.post(`/api/contact`, dataFromUser, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // console.log(res);
      reset();
      setMessage(res.data.message);
      setSeverity("success");
      handleOpenAlert();
    } catch (error) {
      if (error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.code);
      }
      setSeverity("error");
      handleOpenAlert();

      // console.error("Erreur lors de la modification des infos: ", error);
    }
  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <TransitionAlerts
        open={open}
        handleCloseAlert={handleCloseAlert}
        message={message}
        severity={severity}
      />
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contactez-nous!
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Vous avez des questions, des suggestions ou des commentaires à
          partager? N&apos;hésitez pas à nous contacter! Nous sommes toujours
          ravis de recevoir des nouvelles de notre communauté d&apos;étudiants
          congolais.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Prénom *
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="firstname"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("firstname", {
                  required: "Veuillez indiquer votre Prénom.",
                  minLength: {
                    value: 3,
                    message: `La longueure minimum du Prénom est de 3`,
                  },
                  pattern: {
                    value: /\S/,
                    message:
                      "Le contenu de ce champ ne doit pas être vide ou contenir uniquement des espaces",
                  },
                })}
              />
            </div>
            {errors.firstname?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.firstname?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nom *
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("lastname", {
                  required: "Veuillez indiquer votre Nom.",
                  minLength: {
                    value: 3,
                    message: `La longueure minimum du nom est de 3`,
                  },
                  pattern: {
                    value: /\S/,
                    message:
                      "Le contenu de ce champ ne doit pas être vide ou contenir uniquement des espaces",
                  },
                })}
              />
            </div>
            {errors.lastname?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.lastname?.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="sujet"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Sujet
            </label>
            <div className="mt-2.5">
              <select
                {...register("sujet", {
                  required: "Veuillez indiquer votre sujet.",
                })}
                id="sujet"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Veuillez choisir le sujet</option>
                <option value="Questions générales">Questions générales</option>
                <option value="Commentaires sur la plateforme">
                  Commentaires sur la plateforme
                </option>
                <option value="Signalement d'un problème">
                  Signalement d&apos;un problème
                </option>
                <option value="Soutenir la communauté">
                  Soutenir la communauté
                </option>
                <option value="Devenir bénévole et contribuer à la gestion de la communauté">
                  Devenir bénévole et contribuer à la gestion de la communauté
                </option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            {errors.sujet?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.sujet?.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("email", {
                  required: "Veuillez indiquer votre adresse e-mail.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Veuillez saisir une adresse e-mail valide",
                  },
                })}
              />
            </div>
            {errors.email?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("message", {
                  required: "Veuillez indiquer votre message.",
                  minLength: {
                    value: 10,
                    message: `La longueure minimum du message est de 10 caractères`,
                  },
                  pattern: {
                    value: /\S/,
                    message:
                      "Le contenu de ce champ ne doit pas être vide ou contenir uniquement des espaces",
                  },
                })}
              />
            </div>
            {errors.message?.message && (
              <p className="text-red-500 text-[0.8rem]">
                {errors.message?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {/* <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Envoyer
          </button> */}
          <ButtonMuiCustomized
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            endIcon={<Send />}
            variant="contained"
          >
            Envoyer
          </ButtonMuiCustomized>
        </div>
      </form>
    </div>
  );
}

const ButtonMuiCustomized = styled(Button)({
  textTransform: "none",
  width: "full",
  display: "flex",
  alignItems: "center",
  borderRadius: "0.375rem",
  backgroundColor: "rgb(79 70 229 / 1)",
  padding: "0.625rem 0.875rem",
  textAlign: "center",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "700",
  color: "#fff",
  boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)",
  "&:hover": {
    backgroundColor: "rgb(99 102 241 / 1)",
  },
  "&:focus-visible": {
    outline: "2px solid #667EEA",
    outlineOffset: "2px",
  },
});
