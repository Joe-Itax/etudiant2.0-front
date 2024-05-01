import { useState } from "react";
import AlertDialog from "../feedback/alert-dialog";
import { RiDeleteBin5Fill } from "@remixicon/react";

export default function DangerSection() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitDeleteAccountReq = async () => {
    alert(`Compte supprimer avec succès !`);
    handleClose();
  };
  return (
    <>
      <section className="danger-zone py-4 px-8 max-[500px]:px-0 flex flex-col">
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
