import { NavBar } from "../../components/Layout/NavBar.tsx";
import { Footer } from "../../components/Layout/Footer.tsx";
import { AjustesSection } from "./components/AjustesSection.tsx";

export const AjustesPage = () => {
    return (
        <>
            <NavBar />
            <AjustesSection />
            <Footer />
        </>
    );
};