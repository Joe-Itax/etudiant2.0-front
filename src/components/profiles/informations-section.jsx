import { useState, useContext } from "react";
import axiosInstance from "../../utils/axios-instance";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiUserFill } from "@remixicon/react";
import currentUserContext from "../../contexts/current-user.context";
import authStatusContext from "../../contexts/auth.context";
import universityContext from "../../contexts/university.context";
import CustomizedSnackbars from "../feedback/notif";
import InputAutocomplete from "../inputs/autocomplete";

export default function InformationsSection() {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { setIsAuthenticated } = useContext(authStatusContext);
  const { university } = useContext(universityContext);

  // console.log("currentUser: ", currentUser);
  // console.log("university: ", university);

  const universityOfCurrentUser = university.find(
    (univ) => univ.id === currentUser.universityId
  );

  // console.log("universityOfCurrentUser: ", universityOfCurrentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: `${currentUser?.email}`,
      firstname: `${currentUser?.firstname}`,
      lastname: `${currentUser?.lastname}`,
      university: universityOfCurrentUser ? universityOfCurrentUser.title : "",
    },
  });
  const currentUniversity = watch("university");

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const navigate = useNavigate();
  // handleSubmitOpenNotif();
  const onSubmitNewInfos = async (dataFromUser, event) => {
    console.log("data: ", dataFromUser);
    event.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/api/users/${currentUser.id}`,
        dataFromUser,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setMessageNotif("Informations modifiées avec succes !!!");
        setSeverityNotif("success");
        handleSubmitOpenNotif();
        setCurrentUser(res.data.newUserInfo);
        setTimeout(() => {
          // window.location.reload();
        }, 2000);
      }
    } catch (error) {
      // console.error("Erreur lors de la modification des infos: ", error);

      if (error?.response.status === 401) {
        setMessageNotif(
          "Vous n'etes pas autorisé à faire cette opération. Vous allez être redirigé vers la page de connection."
        );

        setTimeout(() => {
          setIsAuthenticated(false);
          navigate("/login");
        }, 5000);
      } else if (error.response.status === 400) {
        setMessageNotif(
          "Un autre utilisateur est déjà enregistré avec cet email."
        );
      } else {
        setMessageNotif(error.code);
      }
      setSeverityNotif("error");
      handleSubmitOpenNotif();
    }
  };

  const [isFocusField, setIsFocusField] = useState({
    firstname: false,
    lastname: false,
    email: false,
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

  return (
    <>
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />

      <section className="informations py-4 px-8 max-[500px]:px-0">
        <h2 className="flex gap-2 items-center text-2xl font-semibold">
          <RiUserFill size={30} onClick={handleSubmitOpenNotif} /> Mes
          informations
        </h2>
        <div className="mt-0 py-2 flex">
          <form
            onSubmit={handleSubmit(onSubmitNewInfos)}
            className="flex w-full flex-col gap-4"
          >
            <div className="bg-[#371577] flex flex-wrap p-8 gap-8 justify-center items-center rounded-md">
              {/* Champ de l'e-mail */}
              <div className="relative emailField">
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
              <div className="relative firstField">
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
                      required: "Veuillez indiquer votre Prénom.",
                      minLength: {
                        value: 3,
                        message: `La longueure minimum du Prénom est de 3`,
                      },
                    })}
                    onBlur={(e) => {
                      const firstnameValue = getValues("firstname");
                      if (!firstnameValue) {
                        handleBlurFirstnameField();
                      }
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
              <div className="relative lastnameField">
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
              <div className="relative universityField">
                <div className="flex items-center gap-1 relative">
                  {/* <select
                    name="university"
                    id="university"
                    className="inputControlled focus:border-[#5396e7] focus:shadow-[0_0_0_3px_#4869ee3f] border-[#AB8AF1]"
                    {...register("university")}
                  >
                    <option value="" className="">
                      -- Veuillez choisir votre université --
                    </option>
                    <option value="UNIKIN">UNIKIN</option>
                  </select> */}
                  <InputAutocomplete
                    onChangee={(event, newValue) => {
                      // Utiliser setValue pour mettre à jour la valeur du formulaire avec react-hook-form
                      setValue("university", newValue);
                    }}
                    valuee={currentUniversity}
                    label="Université"
                    className={``}
                    options={university}
                  />
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
    </>
  );
}
