import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Research from "@/components/Research";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Research />
      <Footer />
    </main>
  );
}