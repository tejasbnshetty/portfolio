import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Research from "@/components/Research";
// import Extras from "@/components/Extras";
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
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Research />
      {/* <Extras /> */}
      <Footer />
    </main>
  );
}