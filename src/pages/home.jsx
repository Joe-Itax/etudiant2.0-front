import { Link } from "react-router-dom";
import PrimaryBouton from "../components/bouttons/primary-button";
import SecondaryBouton from "../components/bouttons/secondary-button";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero w-full min-[1150px]:w-2/3 flex flex-col gap-8 text-center sm:text-start">
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
              <PrimaryBouton>Découvrez les ressources</PrimaryBouton>
            </Link>
          </div>
          <div>
            <Link to={`/signup`}>
              <SecondaryBouton>Inscrivez-vous gratuitement</SecondaryBouton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
