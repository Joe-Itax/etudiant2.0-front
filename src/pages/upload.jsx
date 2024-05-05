import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import Footer from "../components/footer/footer";
import FileUploader from "../components/file-uploader/file-uploader";
import logo from "/assets/Etudiant-20.svg";

export default function Upload() {
  window.scrollTo({
    top: 0,
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-16 border-b bg-blue-50">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo Etudiant 2.0" />
          </Link>
        </div>
        <div className="mt-4 flex">
          <span className="text-2xl text-center px-2">
            Partage{" "}
            <ReactTyped
              className="text-blue-800 font-semibold"
              strings={[
                "livres",
                "notes de cours",
                "exercices corrigé",
                "exercices non corrigé",
                "interros corrigés",
                "interros non corrigés",
                "examens corrigés",
                "examens non corrigés",
              ]}
              typeSpeed={150}
              backDelay={2000}
              backSpeed={100}
              loop
            />{" "}
            pour aider tes pairs
          </span>
        </div>
      </div>
      <div className="w-full px-4 sm:px-8 py-10 sm:py-20 md:py-32 flex justify-center items-center">
        <FileUploader />
      </div>
      <Footer></Footer>
    </div>
  );
}
