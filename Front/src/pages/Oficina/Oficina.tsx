import { NavBar } from "../../components/Layout/NavBar";
import { Footer } from "../../components/Layout/Footer";
import { OficinaSection } from "./components/OficinaSection";

export const OficinaPage = () => {
    return (
        <>
            <NavBar />
            <OficinaSection />
            <Footer />
        </>
    );
};