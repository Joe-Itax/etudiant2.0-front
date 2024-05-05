import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CircularProgress, Button } from "@mui/material";
import { Send, Download } from "@mui/icons-material";
import { formatTimestamp } from "../../utils/helper";
import {
  RiInformation2Fill,
  RiArrowLeftLine,
  RiCommunityFill,
  RiFocus2Fill,
  RiUserSharedFill,
} from "@remixicon/react";
import Avatar from "react-avatar";
import currentUserContext from "../../contexts/current-user.context";
import usersContext from "../../contexts/users.context";
import universityContext from "../../contexts/university.context";
import ressourceContext from "../../contexts/ressource.context";
import axiosInstance from "../../utils/axios-instance";
import "./style.css";
import CustomizedSnackbars from "../feedback/notif";

// console.log(res);
export default function ResourceDetail() {
  const { id } = useParams();

  const { currentUser } = useContext(currentUserContext);
  const { users } = useContext(usersContext);
  const { university } = useContext(universityContext);
  const { ressource } = useContext(ressourceContext);

  // console.log("resssssource: ", ressource);

  let findUserPublishedResource;
  let findNameOfUniversityIfExist;
  let currentRessource;
  // if (resource) {
  // findUserPublishedResource = users.find(
  //   (user) => resource.userId === user.id
  // );

  // findNameOfUniversityIfExist = university.find(
  //   (university) => resource.universityId === university.id
  // );
  // }
  if (ressource) {
    ressource.map((res) => {
      findUserPublishedResource = users.find((user) => res.userId === user.id);

      findNameOfUniversityIfExist = university.find(
        (university) => res.universityId === university.id
      );

      if (res.id == id) {
        currentRessource = res;
      }

      // currentRessource = res.find((ress) => ress.id === id);
    });
  }

  console.log("currentRessource: ", currentRessource);

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataFromUser, event) => {
    dataFromUser.authorId = currentUser.id;
    dataFromUser.targetId = currentRessource.id;

    event.preventDefault();
    reset();

    try {
      const res = await axiosInstance.post(
        `/api/ressources/${currentRessource.id}/comment`,
        dataFromUser
      );
      console.log("res: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
    } catch (error) {
      setSeverityNotif("error");
      handleSubmitOpenNotif();
    }
  };

  /* useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axiosInstance.get(`/api/ressources/${id}`);
        // console.log(res);
        setResource(res.data.ressource);
        setComments(res.data.ressource.Comment);
      } catch (error) {
        console.log("erreur lors de la récuperation de la ressource: ", error);
      }
    };

    fetchResource();
  }, [id]);*/

  // console.log(comments);

  if (!currentRessource) {
    return (
      <div className="w-full flex justify-center my-24">
        <CircularProgress />
      </div>
    );
  }

  const categoriesMap = {
    Livre: "Livre",
    NoteDeCours: "Note de Cours",
    Exercices: "Exercices",
    PreparationExamen: "Préparation d'examen",
    Tp: "Travail pratique (TP)",
    Td: "Travail dirigé (TD)",
    Rapports: "Rapports",
    Resumes: "Résumés",
    Autre: "Autre",
  };

  // console.log("currentRessource: ", currentRessource);
  // console.log("ressource: ", resource);

  const categorieKey = currentRessource.categorie;
  const categorie = categoriesMap[categorieKey] || "Autre";

  const handleClickDownloadResource = () => {
    alert("fichier téléchargé");
  };

  return (
    <div className="resource-detail">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <div className="resource-info">
        <Link className="block" to={`/ressources`}>
          <RiArrowLeftLine />
        </Link>
        <span className="title-section">
          <RiInformation2Fill size={20} color="#3092FA" />{" "}
          <span>Information</span>
        </span>
        <h1>{currentRessource.title}</h1>
        <p className="description-resource">{currentRessource.description}</p>

        <div>
          <p className="flex items-center gap-2">
            <RiFocus2Fill size={30} color="#3092FA" /> Catégorie:
          </p>
          <span className="content-info">{categorie}</span>
        </div>

        {findNameOfUniversityIfExist && (
          <div>
            <p className="flex items-center gap-2">
              <RiCommunityFill size={30} color="#3092FA" /> Université:{" "}
            </p>
            <span className="content-info">
              {findNameOfUniversityIfExist.title} -{" "}
              {findNameOfUniversityIfExist.abbreviation}
            </span>
          </div>
        )}

        <div>
          <p className="flex items-center gap-2">
            <RiUserSharedFill size={30} color="#3092FA" /> Partagé par:{" "}
          </p>
          {findUserPublishedResource && (
            <span className="content-info">
              {findUserPublishedResource.firstname}{" "}
              {findUserPublishedResource.lastname}
            </span>
          )}
        </div>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleClickDownloadResource}
        >
          Télécharger le document
        </Button>
        <div className="commentaire border-t py-4">
          <span className="title">Commentaires</span>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div>
              <div className="mt-2.5">
                <textarea
                  name="content"
                  id="content"
                  rows={2}
                  className=""
                  {...register("content", {
                    required: "Le champ Commentaire est requis.",
                    minLength: {
                      value: 5,
                      message: `La longueure minimum du message est de 5 caractères`,
                    },
                    pattern: {
                      value: /\S/,
                      message:
                        "Le contenu de ce champ ne doit pas être vide ou contenir uniquement des espaces",
                    },
                  })}
                />
              </div>
              {errors.content?.message && (
                <div>
                  <p className="text-red-500 text-[0.8rem] text-end">
                    {errors.content?.message}
                  </p>
                </div>
              )}
            </div>

            <div className="self-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#1976d2] px-4 py-2 rounded-full text-white font-bold"
              >
                <Send /> <span>Publié</span>
              </button>
            </div>
          </form>
          <div className="comments">
            {!currentRessource ? (
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            ) : (
              currentRessource.Comment.map((comment) => {
                const author = users.find(
                  (user) => user.id === comment.authorId
                );
                // console.log("author: ", author);
                return (
                  <div key={comment.id}>
                    <div className="comment">
                      <div className="author">
                        <div className="profile-image">
                          {!author?.profile?.urlProfilImage ? (
                            <div className="">
                              <Avatar
                                name={`${currentUser.firstname} ${currentUser.lastname}`}
                                round={true}
                                size="50px"
                                src={null}
                                alt="Avatar"
                                className={`text-2xl`}
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full">
                              <img
                                src="https://lh3.googleusercontent.com/a/ACg8ocLDVlOkxeOA4vNldYH2LzZrZKmUEVSjSt1k71BaKuM4Uxxyg_k=s96-c"
                                alt=""
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                          )}
                        </div>
                        <div className="details-info">
                          <div className="name">
                            <span>
                              {author.firstname} {author.lastname}
                            </span>
                          </div>
                          <div className="createdAt">
                            <span>{formatTimestamp(comment.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="resource-content">
        <div>Contenu du fichier pdf</div>
      </div>
    </div>
  );
}
