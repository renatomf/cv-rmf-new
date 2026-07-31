import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Languages } from "@/components/sections/Languages";
// import { References } from "@/components/sections/References";
// import { Awards } from "@/components/sections/Awards";
// import { Publications } from "@/components/sections/Publications";
import { Contact } from "@/components/sections/Contact";
import ScrollHero from "@/components/ScrollHero";

const sections = [
  About,
  Experience,
  Skills,
  Education,
  Languages,
  // References,
  // Awards,
  // Publications,
  Contact,
];

export default function Home() {
  return (
    <div className="flex-1">
      <Header />
      <main>
        <ScrollHero />
        {sections.map((SectionComponent, i) => (
          <SectionComponent
            key={i}
            index={`${String(i + 1).padStart(2, "0")}.`}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
