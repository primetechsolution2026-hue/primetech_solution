import { Navbar } from "./components/Navbar";
import { Hero } from "./pages/Hero";
import { WhoWeAre } from "./pages/WhoWeAre";
import { Services } from "./pages/Services";
import { FeaturedWork } from "./pages/FeaturedWork";
import { Team } from "./pages/Team";
import { Contact } from "./pages/Contact";
import { Footer } from "./components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Services />
        <FeaturedWork />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}