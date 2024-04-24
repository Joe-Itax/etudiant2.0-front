import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomizedSnackbars from "../notif";
import PropTypes from "prop-types";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ onFileUpload }) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitOpenNotif = () => {
    setOpen(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Vous obtenez le premier fichier sélectionné

    if (file) {
      const isValidType = file.type.startsWith("image/"); // Autoriser uniquement les images
      const isValidSize = file.size <= 2 * 1024 * 1024; // Taille inférieure ou égale à 2MB

      if (!isValidType) {
        console.warn("Seuls les fichiers image sont autorisés.");
        setSeverity("error");
        setMessage("Seuls les fichiers image sont autorisés.");
        handleSubmitOpenNotif();
      } else if (!isValidSize) {
        console.warn("Le fichier doit être inférieur ou égal à 2MB.");
        setSeverity("error");
        setMessage("Le fichier doit être inférieur ou égal à 2MB.");
        handleSubmitOpenNotif();
      } else {
        // Si le fichier est valide, appelez la fonction de rappel
        if (onFileUpload) {
          onFileUpload(file);
        }
      }
    }
  };

  return (
    <>
      <CustomizedSnackbars
        open={open}
        severity={severity}
        message={message}
        setOpen={setOpen}
      />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Modifier ma photo de profil
        <VisuallyHiddenInput
          type="file"
          accept="image/*" // Autoriser uniquement les images
          onChange={handleFileChange} // Déclencher la validation lors de la sélection de fichiers
        />
      </Button>
    </>
  );
}

InputFileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};
