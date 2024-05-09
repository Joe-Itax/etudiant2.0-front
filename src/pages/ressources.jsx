import { useEffect } from "react";
import DisplayRessources from "../components/ressource-detail/display-ressources";

export default function Ressources() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="ressources-page">
      <DisplayRessources />
    </div>
  );
}
