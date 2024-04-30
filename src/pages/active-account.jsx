import logo from "/assets/Etudiant-20.svg";

export default function ActiveAccount() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-12">
          <img src={logo} alt="logo Etudiant 2.0" />
        </div>
        <div className="mt-4 flex">
          <h2 className="text-3xl font-bold text-center px-2 mb-12">
            Active ton compte
          </h2>
        </div>
        <div className="px-8 text-center">
          <span>
            Parle nous de toi et nous pourrons te recommander des documents, de
            nouvelles fonctionnalités et bien plus encore !
          </span>
        </div>
      </div>
      <div className="w-full px-4 sm:px-8 py-10 sm:py-20 md:py-32 flex justify-center items-center">
        <div>Hello</div>
      </div>
    </div>
  );
}
