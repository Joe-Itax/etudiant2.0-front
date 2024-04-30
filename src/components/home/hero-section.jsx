import { Link } from "react-router-dom";
import CustomBouton from "../bouttons/custom-button";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="content">
        <h1 className="text-4xl min-[450px]:text-5xl font-bold">
          Connectez-vous, collaborez, réussissez avec Etudiant 2.0
        </h1>
        <div className="slogan">
          <h2 className="text-2xl min-[450px]:text-3xl font-semibold">
            Etudiant 2.0 : Apprenez au-delà des frontières de votre université.
          </h2>
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center sm:flex-nowrap items-center gap-4 max-[640px]:mt-8">
          <div className="sm:my-8">
            <Link to={`/ressources`}>
              <CustomBouton variant="primary">
                Découvrez les ressources
              </CustomBouton>
            </Link>
          </div>
          <div>
            <Link to={`/signup`}>
              <CustomBouton variant={"secondary"}>
                Inscrivez-vous gratuitement
              </CustomBouton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
