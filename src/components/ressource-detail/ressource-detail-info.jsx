import { Link } from "react-router-dom";
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
import PropTypes from "prop-types";

export default function RessourceDetailInfo({
  currentRessource,
  categorie,
  findNameOfUniversityIfExist,
  findUserPublishedResource,
  handleClickDownloadResource,
  handleSubmit,
  onSubmit,
  register,
  errors,
  users,
  currentUser,
}) {
  return (
    <div className="resource-info">
      <Link className="flex" to={`/ressources`}>
        <RiArrowLeftLine />
        <span>Voir toutes les ressources</span>
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
          {!currentRessource || !users.length > 0 ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            currentRessource.Comment.map((comment) => {
              const author = users.find((user) => user.id === comment.authorId);
              // console.log("author: ", author);
              // console.log("users: ", users);
              return (
                <div key={comment.id}>
                  <div className="comment">
                    <div className="author">
                      <div className="profile-image">
                        {!author?.profile?.urlProfilImage ? (
                          <div className="">
                            <Avatar
                              name={`${author.firstname} ${author.lastname}`}
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
            }).reverse()
          )}
        </div>
      </div>
    </div>
  );
}
RessourceDetailInfo.propTypes = {
  className: PropTypes.node,
  currentRessource: PropTypes.object.isRequired,
  categorie: PropTypes.string.isRequired,
  findNameOfUniversityIfExist: PropTypes.object.isRequired,
  findUserPublishedResource: PropTypes.object.isRequired,
  handleClickDownloadResource: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
};
