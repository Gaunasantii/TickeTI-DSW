import { NavBar } from "../../components/Layout/NavBar.tsx";
import { Footer } from "../../components/Layout/Footer.tsx";
import { AjustesSection } from "./components/AjustesSection.tsx";
import { Sidebar } from "../../components/Layout/Sidebar.tsx";



export const AjustesPage = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />

            <main className="ml-64 min-h-screen">
                <AjustesSection />
            </main>
        </div>
    );
};