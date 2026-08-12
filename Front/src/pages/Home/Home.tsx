import { NavBar } from "../../components/NavBar/NavBar.tsx";
import { Footer } from "../../components/Footer/Footer.tsx";
import { HeroSection } from "./Components/HeroSection/HeroSection.tsx";
import { FeatureSection } from "./Components/FeatureSection/FeatureSection.tsx";
import { TrustedBySection } from "./Components/TrustedBySection/TrustedBySection.tsx";

export const HomePage=()=>{
  return(
    <>
    <NavBar></NavBar>
    <HeroSection></HeroSection>
    <TrustedBySection></TrustedBySection>
    <FeatureSection></FeatureSection>
    <Footer></Footer>
    </>
  );
}