import { NavBar } from "../../components/Layout/NavBar.tsx";
import { Footer } from "../../components/Layout/Footer.tsx";
import { ContactSection } from "./Components/ContactSection/ContactSection.tsx";

export const ContactPage = () => {
    return (
        <>
            <NavBar />
            <ContactSection />
            <Footer />
        </>
    );
};