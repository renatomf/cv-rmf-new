import { Section } from "@/components/Section";
import ScrollHero from "@/components/ScrollHero";

const experience = [
  {
    meta: "Remote  •  2022–Present",
    role: "Freelance Developer",
    description:
      "Built custom dashboards, internal tools, and landing pages for startups in healthtech, fintech, and B2B SaaS. Worked end-to-end from wireframes to production.",
  },
  {
    meta: "Draftspace  •  San Francisco  •  2019–2022",
    role: "Lead Engineer",
    description:
      "Led development of a collaborative writing platform used by 100K+ users. Focused on performance, real-time sync, and a seamless editor experience.",
  },
  {
    meta: "Northflow  •  Remote  •  2016–2019",
    role: "Fullstack Developer",
    description:
      "Built and maintained full-stack features across multiple product lines, improving reliability, test coverage, and deployment speed.",
  },
  {
    meta: "Peak Studio  •  Berlin  •  2014–2016",
    role: "Frontend Intern",
    description:
      "First job in tech. Learned the ropes of frontend development, accessibility, and shipping on time. Built UI components and maintained design systems.",
  },
];

const skills = [
  "TypeScript",
  "JavaScript",
  "HTML5 / CSS3",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Tailwind CSS",
  "React Native",
  "Flutter",
  "Node.js",
  "Express",
  "GraphQL",
  "tRPC",
  "REST APIs",
  "PostgreSQL",
  "Drizzle ORM",
  "Neon",
  "Git & GitHub",
  "CI/CD",
  "AWS",
  "Vercel",
  "Cloudflare",
  "Inngest",
  "Software Architecture",
  "Clean Architecture",
  "SOLID Principles",
  "System Design",
  "Performance Optimization",
  "Code Reviews & Mentoring",
  "Testing & QA",
  "Debugging",
  "AI Engineering",
  "Technical Leadership",
  "Product Thinking",
  "Remote Collaboration",
];

const education = [
  {
    meta: "Frontend Masters  •  2021–2022",
    title: "Advanced JavaScript & React Track",
    description:
      "Completed advanced coursework in frontend performance, component architecture, and modern development workflows. Focused on clean code, accessibility, and scalable design systems.",
  },
  {
    meta: "UC Berkeley Extension  •  2017–2018",
    title: "Certificate Program: Full-Stack Web Development",
    description:
      "Completed a hands-on program focused on JavaScript, React, Node.js, and REST APIs. Built team-based projects and deployed scalable applications using cloud infrastructure.",
  },
  {
    meta: "University of Southern California  •  2010–2014",
    title: "Bachelor's Degree: Computer Science",
    description:
      "Studied core computer science principles including software engineering, algorithms, and system architecture. Graduated with strong foundations in both theoretical and practical aspects of programming.",
  },
];

const languages = [
  { name: "English", level: "Highly proficient" },
  { name: "Spanish", level: "Native speaker" },
  { name: "German", level: "Beginner A2" },
  { name: "Russian", level: "Beginner A1" },
];

const references = [
  {
    name: "Julia Reyes",
    role: "Haven Health  •  Founder",
    quote:
      "Mark is one of the rare engineers who moves fast without breaking things. He shipped our MVP end-to-end and never lost sight of the details.",
  },
  {
    name: "David Lin",
    role: "Northflow  •  Head of Technology",
    quote:
      "Reliable, calm under pressure, and a great communicator. Mark's code reviews made the whole team better.",
  },
  {
    name: "Sarah Kim",
    role: "Draftspace  •  VP of Engineering",
    quote:
      "He led our editor rewrite from scratch and delivered a faster, more stable product than we thought possible on that timeline.",
  },
];

const awards = [
  { title: "Website of the Month", meta: "Awwwards  •  2024" },
  { title: "Top Project of the Week", meta: "Product Hunt  •  2024" },
  { title: "DevPost Hackathon Winner", meta: "DevPost  •  2023" },
];

const publications = [
  {
    title: "How I Built and Launched a Micro SaaS in 30 Days",
    meta: "Indie Hackers  •  2024",
  },
  {
    title: "Designing Developer Tools with UX in Mind",
    meta: "Smashing Magazine  •  2023",
  },
  {
    title: "The Cost of Overengineering: A Case Study from a Failed Product",
    meta: "TechCrunch  •  2022",
  },
];

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 translate-y-px opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex-1">
      <header className="fixed inset-x-0 py-4 top-0 z-10 bg-transparent">
        <div className="mx-auto flex max-w-348 items-start justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-4 text-md font-medium">
            <span className="font-semibold tracking-tight">Mark Anderson</span>
            <span className="flex items-center gap-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="text-accent">Available for work</span>
            </span>
          </div>
          <div className="flex flex-col items-start gap-1 text-sm">
            <div className="flex items-center gap-44">
              <a
                href="#"
                className="font-medium text-[15px] transition-colors hover:text-accent"
              >
                Download CV
              </a>
              <span className="text-muted">PT - EN</span>
            </div>
            <a
              href="mailto:mark@anderson.dev"
              className="font-medium transition-colors hover:text-accent text-[15px]"
            >
              Contact Me
            </a>
          </div>
        </div>
      </header>

      <main>
        <ScrollHero />
        <Section index="01." title="about">
          <p className="max-w-2xl text-[15px] font-medium leading-snug md:max-w-md md:text-[16px]">
            I&rsquo;m a senior software engineer with 10+ years of experience
            building web apps, tools, and internal platforms. I care about clean
            code, clear interfaces, and solving real problems with simple
            solutions. Currently based in Los Angeles, available for freelance
            work or collaboration on thoughtful digital products.
          </p>
        </Section>
        <Section index="02." title="Experience">
          <div className="flex flex-col gap-12">
            {experience.map((item) => (
              <div key={item.role + item.meta}>
                <p className="text-sm text-muted">{item.meta}</p>
                <h3 className="mt-1 text-xl font-semibold md:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-3 max-w-2xl text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section index="03." title="Skills">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-line px-4 py-2 text-sm text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section index="04." title="Education">
          <div className="flex flex-col gap-12">
            {education.map((item) => (
              <div key={item.title}>
                <p className="text-sm text-muted">{item.meta}</p>
                <h3 className="mt-1 text-xl font-semibold md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section index="05." title="Languages">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {languages.map((lang) => (
              <div key={lang.name}>
                <p className="font-semibold">{lang.name}</p>
                <p className="mt-1 text-sm text-muted">{lang.level}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section index="06." title="References">
          <div className="grid gap-10 md:grid-cols-3">
            {references.map((ref) => (
              <div key={ref.name}>
                <p className="italic leading-relaxed text-muted">
                  &ldquo;{ref.quote}&rdquo;
                </p>
                <p className="mt-4 font-semibold">{ref.name}</p>
                <p className="text-sm text-muted">{ref.role}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section index="07." title="Awards">
          <div className="flex flex-col divide-y divide-line">
            {awards.map((award) => (
              <a
                key={award.title}
                href="#"
                className="group flex items-center justify-between gap-4 py-5 first:pt-0"
              >
                <span className="font-medium">{award.title}</span>
                <span className="flex items-center gap-2 text-sm text-muted">
                  {award.meta}
                  <ExternalLinkIcon />
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section index="08." title="Publications">
          <div className="flex flex-col divide-y divide-line">
            {publications.map((pub) => (
              <a
                key={pub.title}
                href="#"
                className="group flex flex-col gap-1 py-5 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <span className="font-medium">{pub.title}</span>
                <span className="flex shrink-0 items-center gap-2 text-sm text-muted">
                  {pub.meta}
                  <ExternalLinkIcon />
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section index="09." title="Contact">
          <div>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted">Phone</p>
                <a href="tel:+12135550192" className="mt-1 block font-medium">
                  +1 213 555 0192
                </a>
              </div>
              <div>
                <p className="text-sm text-muted">Email</p>
                <a
                  href="mailto:mark@anderson.dev"
                  className="mt-1 block font-medium"
                >
                  mark@anderson.dev
                </a>
              </div>
              <div>
                <p className="text-sm text-muted">Site</p>
                <a
                  href="https://anderson.dev"
                  className="mt-1 block font-medium"
                >
                  anderson.dev
                </a>
              </div>
              <div>
                <p className="text-sm text-muted">Socials</p>
                <div className="mt-1 flex flex-col">
                  <a href="#" className="font-medium">
                    Instagram
                  </a>
                  <a href="#" className="font-medium">
                    LinkedIn
                  </a>
                  <a href="#" className="font-medium">
                    X
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <p className="text-xl text-muted md:text-2xl">
                Thanks for being here
              </p>
              <h3 className="mt-2 text-4xl font-extrabold uppercase leading-none md:text-6xl">
                Let&rsquo;s make
                <br />
                something great
              </h3>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">Mark Anderson</span>
            <span className="size-1.5 rounded-full bg-accent" />
            Available for work
          </div>
          <span>(UTC–8)</span>
        </div>
      </footer>
    </div>
  );
}
