import { Link } from "react-router-dom";
import HeroSection from "../components/home/hero-section";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />

      <section className="upload-ressources">
        <h2 className="font-bold text-3xl text-blue-700">
          Partagez vos connaissances et aidez vos pairs!
        </h2>
        <div className="my-8 text-xl w-full lg:w-[50rem] self-center">
          <div>
            <span>
              Vous avez des livres, des notes de cours, des exercices, des
              interros, des examens corrigés ou non, ou d&apos;autres ressources
              éducatives à partager?{" "}
            </span>
          </div>
          <div>
            <span>
              Contribuez à la communauté Etudiant 2.0 en soumettant vos
              ressources dès aujourd&apos;hui!
            </span>
          </div>
          <div>
            <span className="font-semibold">
              Vos documents aideront d&apos;autres étudiants à apprendre et à
              réussir.
            </span>
          </div>
        </div>
        <Link to={"/upload"} className="self-center">
          <Button
            startIcon={<CloudUpload />}
            variant="contained"
            className="button-mui"
          >
            Partager des documents
          </Button>
        </Link>
      </section>
    </div>
  );
}
