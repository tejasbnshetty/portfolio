import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PersonalSnapshot from "@/components/PersonalSnapshot";
import Projects from "@/components/Projects";
import EngineeringImpact from "@/components/EngineeringImpact";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Research from "@/components/Research";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageBurst from "@/components/PageBurst";
import ScrollProgress from "@/components/ScrollProgress";
import Blobs from "@/components/Blobs";

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <PageBurst />
      <ScrollProgress />
      <Blobs />
      <Navbar />
      <Hero />
      <PersonalSnapshot />
      <Journey />
      <EngineeringImpact />
      <Projects />
      <Skills />
      <Research />
      <Footer />
    </main>
  );
}