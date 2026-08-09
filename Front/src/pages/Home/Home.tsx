import { NavBar } from "./Components/NavBar/NavBar.tsx";
import { Footer } from "./Components/Footer/Footer.tsx";
import { HeroSection } from "./Components/HeroSection/HeroSection.tsx";

export const HomePage=()=>{
  return(
    <>
    <NavBar></NavBar>
    <HeroSection></HeroSection>
    <Footer></Footer>
    </>
  );
}