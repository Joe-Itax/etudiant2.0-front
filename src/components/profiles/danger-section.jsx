import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../feedback/alert-dialog";
import { RiDeleteBin5Fill } from "@remixicon/react";
import axiosInstance from "../../utils/axios-instance";
import currentUserContext from "../../contexts/current-user.context";
import authStatusContext from "../../contexts/auth.context";
import CustomizedSnackbars from "../feedback/notif";

export default function DangerSection() {
  const { currentUser } = useContext(currentUserContext);
  const { setIsAuthenticated } = useContext(authStatusContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };
  const handleSubmitDeleteAccountReq = async () => {
    try {
      const res = await axiosInstance.put(
        `/api/users/delete-account/${currentUser.id}`
      );

      // console.log("delete account response: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("info");
      handleSubmitOpenNotif();
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      // console.log("Erreur lors de la suppression du compte: ", error);
      setSeverityNotif("error");
      console.error("Error lors du login: ", error);
      if (
        error?.response?.status === 404 ||
        error?.response?.status === 400 ||
        error?.response
      ) {
        setMessageNotif(error.response.data.message);
      }

      if (error?.code === "ERR_NETWORK") {
        setMessageNotif(`${error?.message}: Serveur hors service.`);
      } else if (error?.response?.data) {
        setMessageNotif(error?.response?.data.message);
      } else {
        setMessageNotif(
          "Oups, Une erreur s'est produite lors de la connection de votre compte.Veuillez réessayé plutard!"
        );
      }
      handleSubmitOpenNotif();
    }
    handleClose();
  };
  return (
    <>
      <section className="danger-zone py-4 px-8 max-[500px]:px-0 flex flex-col">
        <CustomizedSnackbars
          open={openNotif}
          message={messageNotif}
          setOpen={setOpenNotif}
          severity={severityNotif}
        />
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
            onClick={handleClickOpen}
            value="Supprimer mon compte"
            className="inputSubmitToLogindanger bg-[red] hover:bg-red-800 text-white"
          />
        </div>
        <AlertDialog
          handleSubmitDeleteAccountReq={handleSubmitDeleteAccountReq}
          open={open}
          handleClose={handleClose}
        />
      </section>
    </>
  );
}
