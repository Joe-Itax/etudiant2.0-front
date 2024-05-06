import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="relative mt-[92.3px] md:mt-[111px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
