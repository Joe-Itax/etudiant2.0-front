import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Avatar from "react-avatar";
import "./index.css";
import InformationsSection from "../components/profiles/informations-section";
import PasswordSection from "../components/profiles/password-section";
import DangerSection from "../components/profiles/danger-section";
import authStatusContext from "../contexts/auth.context";
import currentUserContext from "../contexts/current-user.context";
import { formatTimestamp } from "../utils/helper";

import { CircularProgress } from "@mui/material";
import InputFileUpload from "../components/profiles/profile-uploader";
// import axios from "axios";
import axiosInstance from "../utils/axios-instance";
import CustomizedSnackbars from "../components/feedback/notif";

export default function Profil() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const { isAuthenticated } = useContext(authStatusContext);
  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const res = await axiosInstance.put(
        `/api/users/${currentUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Fichier téléchargé avec succès:", res);
      if (res.status === 200) {
        setCurrentUser(res.data.user);
        setMessageNotif(res.data.message);
        setSeverityNotif("success");
        handleSubmitOpenNotif();
      } else {
        setMessageNotif(
          "Une erreur est survenue lors de la modification de votre photo de profile. Veuillez réessayer plustard."
        );
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    } catch (error) {
      // console.error("Erreur lors du téléchargement du fichier:", error);
      if (error?.response?.status === 404 || error?.response?.status === 400) {
        setMessageNotif(error.response.data.message);
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }

      if (error?.code === "ERR_NETWORK") {
        setMessageNotif(`${error?.code}`);
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    }
  };

  if (isAuthenticated) {
    return (
      <div className="profile-page profil-main-container px-16 max-[500px]:px-8 mt-4">
        <CustomizedSnackbars
          open={openNotif}
          message={messageNotif}
          setOpen={setOpenNotif}
          severity={severityNotif}
        />
        <div className="flex border-b p-8 flex-col sm:flex-row">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
            <div className="avatar flex gap-4 flex-col items-center">
              {currentUser?.profile?.urlProfilImage ? (
                <div className="w-[150px] h-[150px] rounded-[100%]">
                  <img
                    src={`${currentUser.profile.urlProfilImage}`}
                    alt="Photo de profil du user"
                    className="w-full h-full rounded-full"
                  />
                </div>
              ) : (
                <Avatar
                  name={`${currentUser.firstname} ${currentUser.lastname}`}
                  round={true}
                  size="150px"
                  src={null}
                  alt="Avatar"
                  className={`text-2xl`}
                />
              )}
              <span className="cursor-pointer max-[639px]:text-center">
                <InputFileUpload onFileUpload={handleFileUpload} />
                {/* <input type="file" name="profil-image" id="" /> */}
              </span>
            </div>
            <div className="flex flex-col max-[639px]:text-center">
              <span className="text-3xl font-semibold">{`${currentUser.firstname} ${currentUser.lastname}`}</span>
              <span>
                Inscrit{" "}
                {`${
                  currentUser?.createdAt &&
                  formatTimestamp(currentUser?.createdAt)
                }`}
              </span>
            </div>
          </div>
        </div>

        <InformationsSection />
        <PasswordSection />
        <DangerSection />
      </div>
    );
  } else if (isAuthenticated === null) {
    return (
      <div className="flex w-full h-[30rem] justify-center items-center">
        {" "}
        <CircularProgress />
      </div>
    );
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
}
