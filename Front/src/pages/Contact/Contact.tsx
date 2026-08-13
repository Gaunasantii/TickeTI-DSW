import { NavBar } from "../../components/NavBar/NavBar.tsx";
import { Footer } from "../../components/Footer/Footer.tsx";
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