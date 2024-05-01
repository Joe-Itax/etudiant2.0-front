import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./style.css";
import { RiUserAddLine, RiShare2Line, RiFocusLine } from "@remixicon/react";

export default function AboutSection() {
  return (
    <section className="about-section">
      <h2>A propos</h2>
      <div className="main-container">
        <div className="container bg-fuchsia-700">
          <div>
            <h3 className="">
              <RiUserAddLine size={30} />
              <span>Histoire</span>
            </h3>
          </div>
          <div className="box-history">
            {/* <p>
              <b>Née d&apos;une expérience personnelle</b>, Etudiant 2.0 est une
              plateforme qui vise à connecter les étudiants congolais et à
              briser les barrières de l&apos;apprentissage entre les différentes
              universités et institutions du pays.
            </p>
            <p>
              En tant qu&apos;étudiant moi-même, j&apos;ai souvent ressenti un
              sentiment d&apos;isolement et de manque de connexion avec mes
              pairs dans d&apos;autres établissements.
            </p>
            <p>
              C&apos;est pourquoi, à la fin de ma formation de développeur web
              fullstack, j&apos;ai décidé de réaliser Etudiant 2.0 comme projet
              de fin d&apos;études, avec l&apos;ambition de créer un espace
              virtuel où les étudiants congolais pourraient se rassembler,
              partager leurs connaissances et collaborer pour réussir.
            </p> */}
            <p>
              <b>Née d&apos;une expérience personnelle</b>, Etudiant 2.0 est une
              plateforme qui vise à connecter les étudiants congolais et à
              briser les barrières de l&apos;apprentissage.
            </p>
            <p>
              <b> Crée par un étudiant</b>, Etudiant 2.0 est un espace virtuel
              où les étudiants congolais peuvent se rassembler, partager leurs
              connaissances et collaborer pour réussir.
            </p>
          </div>
        </div>

        <div className="container bg-blue-700">
          <div>
            <h3 className="">
              <RiShare2Line size={30} />
              <span>Mission</span>
            </h3>
          </div>
          <div className="box-history">
            <h4>
              <b>Réunir, partager, réussir:</b>
            </h4>

            <ul>
              <li>
                <b>Réunir</b> les étudiants congolais dans une communauté en
                ligne dynamique.
              </li>
              <li>
                <b>Partager</b> des ressources éducatives et favoriser
                l&apos;entraide.
              </li>
              <li>
                <b>Encourager la collaboration</b> sur des projets et des
                initiatives communes.
              </li>
            </ul>
          </div>
        </div>

        <div className="container bg-violet-600">
          <div>
            <h3 className="">
              <RiFocusLine size={30} />
              <span>Vision</span>
            </h3>
          </div>
          <div className="box-history">
            <h4>
              <b>
                {" "}
                Devenir la plateforme de référence pour l&apos;apprentissage et
                la réussite des étudiants congolais.
              </b>
            </h4>

            <ul>
              <li>
                <b>Élargir</b> notre base d&apos;utilisateurs pour inclure tous
                les étudiants du Congo.
              </li>
              <li>
                <b>Développer</b> de nouvelles fonctionnalités pour améliorer
                l&apos;expérience utilisateur.
              </li>
              <li>
                <b>Établir des partenariats</b> pour offrir des opportunités
                supplémentaires.
              </li>
              <li>
                <b>Promouvoir</b> l&apos;éducation de qualité et
                l&apos;épanouissement personnel des étudiants.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cta-box">
        <div className="cta-content">
          {/* <p>
            Rejoignez-nous dans cette aventure collective! Etudiant 2.0 a besoin
            de votre contribution pour continuer à grandir et à se développer.
            Vous pouvez nous aider de plusieurs façons:
          </p> */}
          <p className="text-3xl mb-2">Rejoignez-nous!</p>
          {/* <ul className="">
            <li>
              <b>Inscrivez-vous à la plateforme</b> et créez votre profil
            </li>
            <li>
              <b>Partagez vos ressources éducatives</b> avec la communauté
            </li>
            <li>
              <b>Faites un don</b> pour soutenir le développement de la
              plateforme.
            </li>
            <li>
              <b>Devenez bénévole</b> et contribuez à la gestion de la
              communauté.
            </li>
          </ul> */}
          <div>
            <p className="text-2xl mb-4">
              <b>Inscrivez-vous, partagez, soutenez.</b>
            </p>
          </div>
          <div>
            <p className="text-xl">
              <b>Ensemble</b>, faisons d&apos;Etudiant 2.0 un outil
              indispensable pour la réussite des étudiants congolais!
            </p>
          </div>
          <div className="flex justify-center items-center flex-col">
            <p>Contactez-nous pour plus d&apos;informations.</p>
            <Link to={`/contact`} className="my-8">
              <Button variant="contained">Contactez-nous</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
