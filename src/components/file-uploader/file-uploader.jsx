import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  TextField,
} from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import { LoadingButton } from "@mui/lab";
import { Dropzone, FileMosaic, FilesUiProvider } from "@files-ui/react";
import authStatusContext from "../../contexts/auth.context";
import "./file-uploader.css";
import { RiDeleteBinLine } from "@remixicon/react";
import { fileSizeFormater } from "@files-ui/react";
import InputAutocomplete from "../inputs/autocomplete";
import BasicTabs from "../custom-tab-panel.jsx/custom-tab-panel";
import SimpleSignup from "../simple-auth/simple-signup";
import SimpleLogin from "../simple-auth/simple-login";
// import axios from "axios";
import axiosInstance from "../../utils/axios-instance";
import currentUserContext from "../../contexts/current-user.context";
import universityContext from "../../contexts/university.context";
import CustomizedSnackbars from "../feedback/notif";
import { Send } from "@mui/icons-material";

export default function MultiStepForm() {
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(authStatusContext); // Vérifier si l'utilisateur est authentifié
  const { currentUser } = useContext(currentUserContext);
  const { university } = useContext(universityContext);

  const [activeStep, setActiveStep] = useState(0); // Gérer l'étape actuelle
  const [files, setFiles] = useState([]);
  /*const [formData, setFormData] = useState({
    title: "",
    description: "",
    categorie: "",
    university: "",
  });*/
  const [filesData, setFilesData] = useState([]);

  const allFieldsFilled = filesData.every((fileData) => {
    return (
      fileData.title.trim() !== "" &&
      fileData.description.trim() !== "" &&
      fileData.categorie.trim() !== ""
    );
  });

  const handleNext = () => {
    if (allFieldsFilled || activeStep === 0) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1); // Revenir à l'étape précédente
  };

  const handleSubmit = async () => {
    if (
      files.length === filesData.length &&
      filesData.every(
        (fileData) =>
          fileData.title.trim() !== "" && fileData.description.trim() !== ""
      )
    ) {
      setLoading(true);
      const formDataToSend = new FormData();
      const isFileDuplicate = (formData, file) => {
        for (const [key, value] of formData.entries()) {
          // Vérifie si les caractéristiques du fichier correspondent à un fichier existant dans formData
          if (
            key === "files" &&
            value.name === file.name &&
            value.size === file.size &&
            value.type === file.type
          ) {
            return true; // Le fichier est un doublon
          }
        }
        return false; // Le fichier n'est pas un doublon
      };

      files.forEach((file) => {
        const fileData = filesData.find((data) => data.id === file.id);

        if (fileData) {
          // Utilisez la fonction `isFileDuplicate` pour garantir que le fichier n'est pas déjà ajouté
          if (!isFileDuplicate(formDataToSend, file.file)) {
            formDataToSend.append("files", file.file); // Ajoutez le fichier uniquement s'il n'est pas un doublon
            formDataToSend.append(`title`, fileData.title);
            formDataToSend.append(`description`, fileData.description);
            formDataToSend.append(`categorie`, fileData.categorie);
            formDataToSend.append(`university`, fileData.university);
          } else {
            console.warn(
              `Le fichier "${file.file.name}" est déjà dans FormData.`
            );
          }
        } else {
          setLoading(false);
          console.error("Données du fichier manquantes :", file);
        }
      });
      formDataToSend.append("userId", currentUser?.id || "");

      try {
        const res = await axiosInstance.post(`/api/ressources`, formDataToSend);

        setMessageNotif(res.data.message);
        setSeverityNotif("success");
        handleSubmitOpenNotif();
        setTimeout(() => {
          navigate("/upload/success", { state: { from: "/upload" } });
        }, 2000);
        // console.log("ress: ", res);
        // console.log("formDataToSend: ", formDataToSend);
      } catch (error) {
        setLoading(false);
        setSeverityNotif("error");
        console.error("Erreur lors de la soumission :", error);
        if (
          error?.response?.status === 404 ||
          error?.response?.status === 400
        ) {
          setMessageNotif(error.response.data.message);
        } else if (error.code === "ERR_NETWORK") {
          setMessageNotif("Serveur hors service.");
        } else if (error.response.data) {
          setMessageNotif(error.response.data.message);
        } else {
          setMessageNotif("Une erreur s'est produite.");
        }
        handleSubmitOpenNotif();
      }
    } else {
      setLoading(false);
      alert(
        "Veuillez remplir tous les champs obligatoires pour chaque fichier."
      );
    }
  };

  const updateFileData = (fileId, key, value) => {
    setFilesData((prev) => {
      const fileDataIndex = prev.findIndex(
        (fileData) => fileData.id === fileId
      );

      if (fileDataIndex >= 0) {
        const updatedFileData = { ...prev[fileDataIndex], [key]: value };
        const updatedFilesData = [...prev];
        updatedFilesData[fileDataIndex] = updatedFileData;
        return updatedFilesData;
      } else {
        return prev;
      }
    });
  };

  const updateFiles = (incommingFiles) => {
    //do something with the files
    setFiles(incommingFiles);

    const initialFileData = incommingFiles.map((file) => ({
      id: file.id,
      title: "",
      description: "",
      categorie: "",
      university: "",
    }));
    setFilesData(initialFileData);
  };
  // console.log(files);
  const removeFile = (id) => {
    if (files.length === 1) {
      // console.log(files);
      setActiveStep(0);
    }
    // Supprime un fichier de la liste
    setFiles(files.filter((x) => x.id !== id));
    // console.log(files);
  };

  const validateUniqueFiles = (file) => {
    const errorList = [];
    let isFileAlreadyExist = false;
    const fileExists = files.some(
      (existingFile) => existingFile.name === file.name
    );
    if (fileExists) {
      isFileAlreadyExist = false;
      errorList.push(`Ce fichier semble avoir déjà été partagé : ${file.name}`);
    } else {
      isFileAlreadyExist = true;
    }
    return { valid: isFileAlreadyExist, errors: errorList };
  };

  useEffect(() => {
    if (isAuthenticated && files.length > 0 && allFieldsFilled) {
      handleSubmit();
    }
  }, [isAuthenticated]);

  return (
    <div className="custom-uploader">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Uploader</StepLabel>
          <StepContent className="flex w-full">
            <FilesUiProvider
              config={{
                localization: "FR-fr",
              }}
            >
              <Dropzone
                className="w-full flex text-[10px]"
                label="Glissez-déposez vos fichiers ici ou cliquez pour téléverser."
                accept="application/pdf"
                maxFileSize={Number.parseFloat(5 * 1024 * 1024).toFixed(0)}
                maxFiles={1}
                onChange={updateFiles}
                value={files}
                autoClean
                groupUpload
                footerConfig={{
                  customFooter: (
                    <div
                      style={{
                        padding: ".2rem",
                      }}
                      className="bg-cyan-100 text-sm mt-6 py-4"
                    >
                      Fichiers supportés : <b>.pdf</b>
                    </div>
                  ),
                }}
                validator={validateUniqueFiles}
              >
                {files.map((file) => (
                  <FileMosaic key={file.id} {...file} onDelete={removeFile} />
                ))}
              </Dropzone>
            </FilesUiProvider>
            <div className="mt-8 text-center text-sm text-gray-500">
              <span>
                En uploadant des documents sur Etudiant 2.0, tu déclares
                posséder les droits d’auteur de ces documents ou avoir la
                permission des titulaires des droits d&apos;utiliser et de
                télécharger les documents.
              </span>
            </div>
            {files.length > 0 && (
              <Button variant="contained" onClick={handleNext}>
                Suivant
              </Button>
            )}
          </StepContent>
        </Step>

        <Step className="step-details">
          <StepLabel>Détails</StepLabel>
          <StepContent>
            {files.map((file, index) => {
              const fileData = filesData.find((data) => data.id === file.id);
              return (
                <div
                  key={index}
                  className="border rounded-md py-5 px-2 sm:p-5 flex flex-col gap-7"
                >
                  <div className="flex items-center justify-between py-4 border-b mb-4">
                    <div className="flex gap-2 justify-center items-center">
                      <div className="w-16 h-16">
                        {file.name.endsWith(".pdf") ? (
                          <img
                            src="https://user-images.githubusercontent.com/43678736/132086672-3a856fda-823d-4997-b802-c7c640e6ef44.png"
                            alt={`preview ${file.name}`}
                            height="100%"
                          ></img>
                        ) : (
                          <img
                            src="https://user-images.githubusercontent.com/43678736/132086606-715ccb66-4702-4f7d-9b09-ac93ba17b643.png"
                            alt={`preview ${file.name}`}
                            height="100%"
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <h3>{file.name}</h3>
                        <div>
                          <span className="text-[12px]">
                            {fileSizeFormater(file.size)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <RiDeleteBinLine
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFile(file.id)}
                      ></RiDeleteBinLine>
                    </div>
                  </div>
                  {/* Universite doc input */}
                  <div className="form-step2 university-input">
                    <div className="main-box-of-label-and-input">
                      <div className="label-box">
                        <label>Université</label>
                      </div>
                      <div className="input-box">
                        <InputAutocomplete
                          className="input-autocomplete"
                          label={"Université"}
                          options={university}
                          valuee={fileData?.university || ""}
                          onChangee={(e, newValue) =>
                            updateFileData(file.id, "university", newValue)
                          }
                        />

                        <span className="text-sm text-start text-gray-600">
                          Si le document ne provient de votre institution
                          actuelle, vous pouvez laisser ce champ vide, sinon
                          vous pouvez faire mention de votre institution.
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Categorie doc input */}
                  <div className="form-step2 university-input">
                    <div className="main-box-of-label-and-input">
                      <div className="label-box">
                        <label>
                          Catégorie <span className="text-red-700">*</span>
                        </label>
                      </div>
                      <div className="input-box">
                        <InputAutocomplete
                          className="input-autocomplete"
                          label={"Type de document *"}
                          options={categorie}
                          valuee={fileData?.categorie || ""}
                          onChangee={(e, newValue) =>
                            updateFileData(file.id, "categorie", newValue)
                          }
                        />

                        <span className="text-sm text-start text-gray-600 hidden">
                          Si le document ne provient de votre institution
                          actuelle, vous pouvez laisser ce champ vide, sinon
                          vous pouvez faire mention de votre institution.
                        </span>
                      </div>
                    </div>
                    {/* <div className="flex items-center gap-8">
                      <div>Titre du document:</div>
                      <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div> */}
                  </div>
                  {/* Titre doc input */}
                  <div className="form-step2 university-input">
                    <div className="main-box-of-label-and-input">
                      <div className="label-box">
                        <label>
                          Titre <span className="text-red-700">*</span>
                        </label>
                      </div>
                      <div className="input-box">
                        <TextField
                          className="w-full"
                          label="Titre *"
                          name="titre"
                          value={fileData?.title || ""}
                          onChange={(e) =>
                            updateFileData(file.id, "title", e.target.value)
                          }
                        />

                        <span className="text-sm text-start text-gray-600">
                          Donne à ton document un titre descriptif et clair
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Dexcription doc input */}
                  <div className="form-step2 university-input">
                    <div className="main-box-of-label-and-input">
                      <div className="label-box">
                        <label>
                          Description <span className="text-red-700">*</span>
                        </label>
                      </div>
                      <div className="input-box">
                        <TextField
                          className="w-full"
                          id="outlined-multiline-static"
                          label="Description *"
                          placeholder="Merci de donner autant d'informations supplémentaires que possibles."
                          multiline
                          rows={4}
                          value={fileData?.description || ""}
                          onChange={(e) =>
                            updateFileData(
                              file.id,
                              "description",
                              e.target.value
                            )
                          }
                        />

                        <span className="text-sm text-start text-gray-600">
                          Merci de donner autant d&apos;informations
                          supplémentaires que possibles sur le document.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Button onClick={handleBack} variant="outlined">
              Retour
            </Button>
            {isAuthenticated ? (
              !allFieldsFilled ? (
                <div></div>
              ) : (
                <LoadingButton
                  onClick={handleSubmit}
                  variant="contained"
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<Send />}
                >
                  Soumettre
                </LoadingButton>
              )
            ) : allFieldsFilled ? (
              <Button onClick={handleNext} variant="contained">
                Suivant
              </Button>
            ) : (
              <div></div>
            )}
          </StepContent>
        </Step>

        {!isAuthenticated && (
          <Step className="step-auth">
            <StepLabel>Terminer</StepLabel>
            <StepContent className="step-auth-content">
              <div className="step-auth-content-details">
                <h2>Tu as presque terminé</h2>
                <div className="text-center">
                  <span>
                    Merci de créer un compte ou de vous connecté afin de
                    terminer la mise en ligne :
                  </span>
                </div>
              </div>
              <BasicTabs
                login={<SimpleLogin />}
                signup={<SimpleSignup />}
              ></BasicTabs>
              {/* Votre formulaire */}

              <Button onClick={handleBack} variant="outlined">
                Retour
              </Button>
              {isAuthenticated && (
                <LoadingButton
                  onClick={handleSubmit}
                  variant="contained"
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<Send />}
                >
                  Soumettre
                </LoadingButton>
              )}
            </StepContent>
          </Step>
        )}
      </Stepper>
    </div>
  );
}

const categorie = [
  {
    id: 1,
    title: "Livre",
  },
  {
    id: 2,
    title: "Note De Cours",
  },
  {
    id: 3,
    title: "Exercices",
  },
  {
    id: 4,
    title: "Préparation d'examen",
  },
  {
    id: 5,
    title: "Travail pratique (TP)",
  },
  {
    id: 6,
    title: "Travail dirigé (TD)",
  },
  {
    id: 7,
    title: "Rapports",
  },
  {
    id: 8,
    title: "Résumés",
  },
  {
    id: 9,
    title: "Autre",
  },
];

/*import { useState } from "react";
import { Dropzone, FileMosaic, FilesUiProvider } from "@files-ui/react";
// import FilesUiProvider from "@files-ui/react";

export default function FileUploader() {
  const [files, setFiles] = useState([]);

  const updateFiles = (incommingFiles) => {
    //do something with the files
    setFiles(incommingFiles);
  };

  const removeFile = (id) => {
    // Supprime un fichier de la liste
    setFiles(files.filter((x) => x.id !== id));
  };

  const validateUniqueFiles = (file) => {
    const errorList = [];
    let isFileAlreadyExist = false;
    const fileExists = files.some(
      (existingFile) => existingFile.name === file.name
    );
    if (fileExists) {
      isFileAlreadyExist = false;
      errorList.push("Le fichier existe déjà.");
    } else {
      isFileAlreadyExist = true;
    }
    return { valid: isFileAlreadyExist, errors: errorList };
  };

  return (
    {<FilesUiProvider
      config={{
        localization: "FR-fr",
      }}
    >
    //   <Dropzone
    //     label="Glisser déposez vos fichiers ici ou cliquez sur sur cette zone pour téléverser vos fichiers."
    //     accept={"application/pdf"}
        footerConfig={{
          customFooter: (
            <div
              style={{
                fontSize: "18px",
                backgroundColor: "",
                padding: ".8rem",
              }}
            >
              Fichiers supportés : <b>.pdf</b>
            </div>
          ),
        }}
        validator={validateUniqueFiles}
        maxFileSize={30 * 1024 * 1024}
        onChange={updateFiles}
        value={files}
        autoClean
        uploadConfig={{
          url: "http://localhost:3001/api/ressources",
        }}
        actionButtons={{
          position: "after",
          uploadButton: {
            style: { textTransform: "uppercase" },
            label: "Télécharger",
          },
          cleanButton: {
            style: { textTransform: "uppercase" },
            label: "Nettoyer",
          },
          deleteButton: {
            style: { textTransform: "uppercase" },
            label: "Supprimer",
          },
          abortButton: {
            style: { textTransform: "uppercase" },
            label: "Abandonner",
          },
        }}
        className="bg-[#f1f7fe] px-4 relative h-80 sm:h-[400px] md:h-[500px]"
        groupUpload
      >
        {/* Afficher les fichiers sous forme de mosaïque *
        {files.map((file) => (
          <FileMosaic key={file.id} {...file} onDelete={removeFile} />
        ))}
      </Dropzone>
    </FilesUiProvider>}
  );
}
*/
