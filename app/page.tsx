"use client";
  import { useEffect, useState, useRef } from "react";
  import type { FormEvent } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Space_Grotesk, Poppins } from "next/font/google";
  import { TbWorld } from "react-icons/tb";
  import { FaGithub, FaLinkedin } from "react-icons/fa";

  const spaceGrotesk = Space_Grotesk({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-space-grotesk",
  });

  const poppins = Poppins({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-poppins",
  });

  const sections = [
    { id: "about", title: "About" },
    { id: "experience", title: "Experience" },
    { id: "skills", title: "Skills" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const skillGroups = [
    { label: "Languages", items: ["Java", "Python", "PHP", "C++", "JavaScript", "SQL", "HTML/CSS"] },
    { label: "Frameworks & Tools", items: ["FastAPI", "React", "Laravel", "Ruby on Rails", "Git", "IntelliJ", "PyCharm"] },
    { label: "Cloud", items: ["AWS Bedrock", "GCP"] },
    { label: "Libraries", items: ["NumPy", "Pandas", "SciPy", "Matplotlib", "TensorFlow", "Scrapy", "Kivy"] }
  ];

  const workProjects = [
    {
      title: "DigiLib",
      description: "A RAG-powered academic research tool that retrieves and ranks credible sources using conversational AI, cutting research time by 40% — winner of 2nd place ($2,000) in the Bardusch Family IdeaMakers Challenge",
      tags: ["Python", "AWS Bedrock", "React", "LLaMA 3"],
      link: "https://www.digilib.site/",
      modal: undefined as "creditwise" | undefined,
      platforms: [
        { icon: TbWorld, color: "#4285F4" }
      ]
    },
    {
      title: "AI Voice Copilot",
      description: "An AI voice copilot providing real-time guidance on web platforms, using AWS Bedrock with Anthropic models to deliver recommendations at 800ms latency",
      tags: ["Python", "JavaScript", "React", "FastAPI", "AWS Bedrock"],
      link: "https://github.com/madhurakhandkar",
      modal: undefined as "creditwise" | undefined,
      platforms: [
        { icon: TbWorld, color: "#4285F4" }
      ]
    },
    {
      title: "Creditwise",
      description: "A web application enabling transfer students to verify credit transfer eligibility across institutions, centralizing data for 30+ course equivalencies across 3 universities",
      tags: ["React", "Firebase", "Figma"],
      link: "https://github.com/madhurakhandkar",
      modal: "creditwise" as const,
      platforms: [
        { icon: TbWorld, color: "#4285F4" }
      ]
    }
  ];

  export default function Home() {
    const [activeSection, setActiveSection] = useState("about");
    const [activeModal, setActiveModal] = useState<"creditwise" | null>(null);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setContactStatus("sending");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: "e378618d-618a-494e-89b5-ad4de5f49171",
            subject: `Portfolio message from ${contactName || "a visitor"}`,
            name: contactName,
            email: contactEmail,
            message: contactMessage,
          }),
        });
        const result = await res.json();
        if (result.success) {
          setContactStatus("success");
          setContactName("");
          setContactEmail("");
          setContactMessage("");
        } else {
          setContactStatus("error");
        }
      } catch {
        setContactStatus("error");
      }
    };

    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll("section");
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = sectionId === "about" ? 0 : section.offsetTop;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    };

    if (theme === "light") {
      return (
        <LightMode
          onToggleTheme={() => setTheme("dark")}
          activeSection={activeSection}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          contactName={contactName}
          setContactName={setContactName}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          contactMessage={contactMessage}
          setContactMessage={setContactMessage}
          contactStatus={contactStatus}
          handleContactSubmit={handleContactSubmit}
          scrollToSection={scrollToSection}
          fontClassName={`${spaceGrotesk.variable} ${poppins.variable} ${spaceGrotesk.className}`}
        />
      );
    }

    return (
      <div className={`${spaceGrotesk.className} bg-black text-[#fefeff] flex flex-col min-h-screen`}>
        <div className="flex-grow">
              {/* Top Navigation */}
              <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm">
                <nav className="flex items-center gap-4 md:gap-8 justify-start md:justify-center text-sm overflow-x-auto scrollbar-hide px-4 md:px-8 py-6"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {sections.map(({ id, title }) => (
                    <motion.button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`transition-colors whitespace-nowrap flex-shrink-0 ${
                        activeSection === id
                          ? 'text-[#fefeff] font-medium'
                          : 'text-[#969696] hover:text-[#fefeff]'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      {title}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => setTheme("light")}
                    aria-label="Switch to light mode"
                    className="flex-shrink-0 w-9 h-9 rounded-full border border-[#969696] flex items-center justify-center text-[#969696] hover:text-[#fefeff] hover:border-[#fefeff] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 20 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="material-symbols-outlined text-[18px] leading-none">light_mode</span>
                  </motion.button>
                </nav>
              </header>

              {/* Main Content */}
              <main className="flex-grow">
                {/* Hero / About Section */}
                <section id="about" className="min-h-screen flex items-center pt-28 md:pt-24 pb-12">
                  <motion.div
                    className="max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
                      <motion.div variants={fadeUp} className="md:col-span-7 space-y-6">
                        <h1 className="font-display text-headline-lg-mobile md:text-display leading-tight">
                          Building    <span className="text-wild-strawberry italic">intelligent</span> tools
                        </h1>
                        <div className={`${poppins.className} space-y-2`}>
                          <p className="text-base md:text-lg leading-relaxed text-[#fefeff] max-w-xl">
                            Graduating December 2026, majoring in Computer Science at Penn State. Looking to grow into full-stack and AI roles.
                          </p>
                          <p className="text-base md:text-lg leading-relaxed text-[#fefeff] max-w-xl">
                             Currently a SWE Intern  at Mile6 and previous SWE Intern for Penn State. 
                          </p>
                          <p className="text-base md:text-lg leading-relaxed text-[#fefeff] max-w-xl">
                            Apart from that, I'm the Outreach Director for Penn State&apos;s AWS Student Builder Group.
                          </p>

                          <div className="flex flex-wrap gap-4 pt-4">
                            <motion.a
                              href="/Madhura_K_Resume.pdf"
                              download
                              className="inline-flex items-center gap-2 px-8 py-4 bg-[#fefeff] text-black rounded-full font-button text-button shadow-lg shadow-[#fefeff]/10"
                              whileHover={{ rotate: [0, -2, 2, -2, 0] }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.4 }}
                            >
                              Download Resume
                              <span className="material-symbols-outlined text-[18px]">download</span>
                            </motion.a>
                            <motion.a
                              href="#contact"
                              onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
                              className="inline-block px-8 py-4 border-2 border-[#fefeff] text-[#fefeff] rounded-full font-button text-button hover:bg-[#fefeff] hover:text-black transition-colors"
                              whileHover={{ rotate: [0, -2, 2, -2, 0] }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.4 }}
                            >
                              Let&apos;s Connect
                            </motion.a>
                          </div>

                          <div className="flex gap-8 pt-2">
                            <motion.a
                              href="https://github.com/madhurakhandkar"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub"
                              className="text-[#969696] hover:text-[#fefeff] transition-colors"
                              whileHover={{ y: -3 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                              <FaGithub className="text-4xl" />
                            </motion.a>
                            <motion.a
                              href="https://linkedin.com/in/madhurakhandkar"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                              className="text-[#969696] hover:text-[#fefeff] transition-colors"
                              whileHover={{ y: -3 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                              <FaLinkedin className="text-4xl" />
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUp} className="md:col-span-5 relative group max-w-sm mx-auto md:mx-0 md:ml-auto">
                        <div className="absolute inset-0 bg-[#fefeff]/10 blob-mask transform rotate-6 scale-105 group-hover:rotate-12 transition-transform duration-500"></div>
                        <div className="relative blob-mask overflow-hidden shadow-2xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/profile.png"
                            alt="Madhura Khandkar"
                            className="w-full h-auto object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Scroll Down Arrow */}
                    <motion.div
                      variants={fadeUp}
                      className="mt-12 md:mt-16 flex justify-center"
                    >
                      <motion.div
                        className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#fefeff]"
                        animate={{
                          y: [0, 10, 0],
                          opacity: [0.6, 0.3, 0.6]
                        }}
                        whileHover={{ scale: 1.4 }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }}
                        onClick={() => scrollToSection("experience")}
                        style={{ cursor: "pointer" }}
                      />
                    </motion.div>
                  </motion.div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <motion.div
                    className="max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">Experience</motion.h2>
                    <div className="max-w-2xl mx-auto space-y-16">
                      <motion.div variants={staggerContainer}>
                        <motion.div variants={fadeUp} className="space-y-2 mb-4">
                  
                          <h3 className="text-2xl md:text-3xl font-medium text-[#fefeff]">Software Engineering Intern - Mile6</h3>
                          <p className="text-sm text-[#fefeff]">May 2026 - Present &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Philadelphia, PA</p>
                        </motion.div>
                        <ul className="space-y-2 list-disc list-outside pl-5 text-sm text-[#969696]">
                          <motion.li variants={fadeUp}>
                            Eliminated manual grading, saving 6+ hours a week, through a Laravel scoring engine
                            evaluating 140 answer paths across 30+ assessment questions.
                          </motion.li>
                          <motion.li variants={fadeUp}>
                            Built a React/Vite frontend integrated with Laravel APIs, enabling dynamic assessment
                            workflows and progress tracking for 10+ clients.
                          </motion.li>
                          <motion.li variants={fadeUp}>
                            Streamlined client reporting by automating PDF generation and email delivery through
                            background jobs, saving 3–4 hours of manual effort weekly.
                          </motion.li>
                        </ul>
                      </motion.div>

                      <motion.div variants={staggerContainer}>
                        <motion.div variants={fadeUp} className="space-y-2 mb-4">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="text-2xl md:text-3xl font-medium text-[#fefeff]">Software Engineering Intern - Penn State</h3>
                          </div>
                          <p className="text-sm text-[#fefeff]">October 2025 - May 2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;State College, PA</p>
                        </motion.div>
                        <ul className="space-y-2 list-disc list-outside pl-5 text-sm text-[#969696]">
                          <motion.li variants={fadeUp}>
                            Consolidated institutional data processing by developing a Ruby on Rails API that handled
                            50,000+ educational records across multiple systems.
                          </motion.li>
                          <motion.li variants={fadeUp}>
                            Reduced manual processing by 60% by automating institutional data imports into Activity
                            Insight with Ruby and XML export logic.
                          </motion.li>
                          <motion.li variants={fadeUp}>
                            Led PR reviews for the API and XML pipeline, catching 3–4 bugs and preventing merge
                            conflicts before release.
                          </motion.li>
                        </ul>
                      </motion.div>

                      <motion.div variants={staggerContainer}>
                        <motion.div variants={fadeUp} className="space-y-2 mb-4">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="text-2xl md:text-3xl font-medium text-[#fefeff]">Undergraduate Researcher - Penn State</h3>
                          </div>
                          <p className="text-sm text-[#fefeff]">May 2024 - December 2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Middletown, PA</p>
                        </motion.div>
                        <ul className="space-y-2 list-disc list-outside pl-5 text-sm text-[#969696]">
                          <motion.li variants={fadeUp}>
                            Engineered a motorized 3D-printed throat model that improved biomechanical movement
                            accuracy by 25%.
                            
                          </motion.li>
                          <motion.li variants={fadeUp}>
                            Programmed Python-controlled servo systems to simulate anatomically accurate muscle
                            contractions.
                          </motion.li>
                          <motion.li variants={fadeUp}>
                            Designed CAD-based anatomical models and optimized motor placement to satisfy simulation
                            requirements.
                          </motion.li>
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="px-4 md:px-24 py-8 md:py-16 pt-20">
                  <motion.div
                    className="max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">Skills</motion.h2>
                    <div className="grid gap-10 max-w-2xl mx-auto">
                      {skillGroups.map((group) => (
                        <motion.div key={group.label} variants={fadeUp}>
                          <p className="font-mono text-sm text-[#969696] mb-4">{group.label.toUpperCase()}</p>
                          <div className="flex flex-wrap gap-3">
                            {group.items.map((item) => (
                              <motion.span
                                key={item}
                                className="text-sm text-[#fefeff] border border-[#969696] rounded-full px-4 py-1.5 cursor-default"
                                whileHover={{ y: -3, borderColor: "#fefeff" }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <motion.div
                    className="max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">Projects</motion.h2>
                    <div className="grid gap-8 md:gap-16 max-w-2xl mx-auto">
                      {workProjects.map((project, index) => {
                        const cardInner = (
                          <>
                            <h3 className="text-xl md:text-2xl font-medium mb-4">{project.title}</h3>
                            <p className="text-sm text-[#fefeff] mb-6">{project.description}</p>
                            <div className="flex flex-wrap gap-4">
                              {project.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="text-sm text-[#969696]">{tag}</span>
                              ))}
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                              {project.platforms.map((Platform, i) => (
                                <Platform.icon
                                  key={i}
                                  className="text-xl"
                                  style={Platform.color ? { color: Platform.color } : {}}
                                />
                              ))}
                            </div>
                          </>
                        );

                        return (
                          <motion.div
                            key={index}
                            variants={fadeUp}
                            className="group"
                            whileHover={{ y: -10 }}
                          >
                            {project.modal ? (
                              <button
                                type="button"
                                onClick={() => setActiveModal(project.modal ?? null)}
                                className="block w-full text-left p-4 md:p-8 border border-[#969696] rounded-lg hover:border-[#969696] transition-colors relative"
                              >
                                {cardInner}
                              </button>
                            ) : (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 md:p-8 border border-[#969696] rounded-lg hover:border-[#969696] transition-colors relative"
                              >
                                {cardInner}
                              </a>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="px-4 md:px-24 py-8 md:py-16 pt-20">
                  <motion.div
                    className="max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-7xl font-medium mb-8 max-w-2xl">Contact</motion.h2>
                    <motion.form
                      variants={fadeUp}
                      onSubmit={handleContactSubmit}
                      className="font-mono max-w-2xl mx-auto mb-16 space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="contact-name" className="block text-sm mb-2 text-[#fefeff]">Name</label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Your name"
                            className="w-full bg-transparent border border-[#969696] rounded-lg px-4 py-3 text-sm text-[#fefeff] placeholder:text-[#6b6b6b] focus:outline-none focus:border-[#fefeff] transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-sm mb-2 text-[#fefeff]">Email Address</label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full bg-transparent border border-[#969696] rounded-lg px-4 py-3 text-sm text-[#fefeff] placeholder:text-[#6b6b6b] focus:outline-none focus:border-[#fefeff] transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="block text-sm mb-2 text-[#fefeff]">Content</label>
                        <textarea
                          id="contact-message"
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Your message goes here. Ask me anything"
                          rows={6}
                          required
                          className="w-full bg-transparent border border-[#969696] rounded-lg px-4 py-3 text-sm text-[#fefeff] placeholder:text-[#6b6b6b] focus:outline-none focus:border-[#fefeff] transition-colors resize-none"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={contactStatus === "sending"}
                        className="w-full border border-[#969696] rounded-lg py-4 text-sm font-medium text-[#fefeff] hover:border-[#fefeff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {contactStatus === "sending" ? "Sending…" : <>Send Email &nbsp;&rarr;</>}
                      </motion.button>
                      {contactStatus === "success" && (
                        <p className="text-sm text-center text-green-400">Thanks! Your message has been sent.</p>
                      )}
                      {contactStatus === "error" && (
                        <p className="text-sm text-center text-red-400">Something went wrong. Please try again or email me directly.</p>
                      )}
                    </motion.form>
                  </motion.div>
                </section>
              </main>
              

              {/* Footer */}
              <footer className="px-4 md:px-24 py-8 text-[#969696]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
                  <span className="text-sm text-center md:text-left">© 2026 Madhura Khandkar</span>
                  <div className="flex gap-4 md:gap-8">
                    <motion.a
                      href="https://github.com/madhurakhandkar"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-[#969696] hover:text-[#fefeff] transition-colors"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <FaGithub className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/madhurakhandkar"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-[#969696] hover:text-[#fefeff] transition-colors"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <FaLinkedin className="text-xl" />
                    </motion.a>
                  </div>
                </div>
              </footer>

              <AnimatePresence>
                {activeModal === "creditwise" && (
                  <motion.div
                    key="creditwise-modal"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveModal(null)}
                  >
                    <motion.div
                      className="bg-black rounded-xl overflow-hidden w-full max-w-3xl shadow-2xl relative"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="absolute top-3 right-3 z-10 text-white/80 hover:text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
                        aria-label="Close"
                      >
                        &#10005;
                      </button>
                      <div className="aspect-video w-full">
                        <iframe
                          src="https://www.tella.tv/video/cm9xlj5iv00060aibacxm6vkp/embed"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
        </div>
      </div>
    );
  }

  interface LightModeProps {
    onToggleTheme: () => void;
    activeSection: string;
    activeModal: "creditwise" | null;
    setActiveModal: (v: "creditwise" | null) => void;
    contactName: string;
    setContactName: (v: string) => void;
    contactEmail: string;
    setContactEmail: (v: string) => void;
    contactMessage: string;
    setContactMessage: (v: string) => void;
    contactStatus: "idle" | "sending" | "success" | "error";
    handleContactSubmit: (e: FormEvent<HTMLFormElement>) => void;
    scrollToSection: (id: string) => void;
    fontClassName: string;
  }

  function LightMode({
    onToggleTheme,
    activeSection,
    activeModal,
    setActiveModal,
    contactName,
    setContactName,
    contactEmail,
    setContactEmail,
    contactMessage,
    setContactMessage,
    contactStatus,
    handleContactSubmit,
    scrollToSection,
    fontClassName,
  }: LightModeProps) {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleNavClick = (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      scrollToSection(id);
    };

    const handleToggleClick = (e: React.MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "0px";
      ripple.style.height = "0px";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "#221b0e";
      ripple.style.zIndex = "9998";
      ripple.style.pointerEvents = "none";
      ripple.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.style.width = "300vmax";
        ripple.style.height = "300vmax";
        ripple.style.left = `calc(${e.clientX}px - 150vmax)`;
        ripple.style.top = `calc(${e.clientY}px - 150vmax)`;
      }, 10);

      setTimeout(() => {
        ripple.remove();
      }, 800);

      onToggleTheme();
    };

    return (
      <div className={`${fontClassName} light bg-background text-on-surface font-body-md selection:bg-wild-strawberry selection:text-white overflow-x-hidden min-h-screen`}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl">
          <nav className="flex items-center gap-4 md:gap-8 justify-start md:justify-center text-sm overflow-x-auto scrollbar-hide px-4 md:px-8 py-6"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {sections.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={handleNavClick(id)}
                className={`transition-colors whitespace-nowrap flex-shrink-0 font-semibold ${
                  activeSection === id
                    ? 'text-on-surface'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {title}
              </a>
            ))}
            <button
              type="button"
              onClick={handleToggleClick}
              aria-label="Switch to dark mode"
              className="flex-shrink-0 w-9 h-9 rounded-full border border-on-surface-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] leading-none">dark_mode</span>
            </button>
          </nav>
        </header>

        <main>
          <section className="pt-40 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-visible" id="about">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-8 relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-wild-strawberry/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <h1 className="font-display text-headline-lg-mobile md:text-display text-on-surface leading-tight">
                  Building <span className="text-wild-strawberry italic">intelligent</span> tools
                </h1>
                <div className="space-y-2">
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Graduating December 2026, majoring in Computer Science at Penn State. Looking to grow into full-stack and AI roles.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Currently a SWE Intern  at Mile6 and previous SWE Intern for Penn State.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Apart from that, I&apos;m the Outreach Director for Penn State&apos;s AWS Student Builder Group.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a className="squish-btn px-8 py-4 bg-wild-strawberry text-white rounded-full font-button text-button shadow-lg shadow-wild-strawberry/20 flex items-center gap-2" href="/Madhura_K_Resume.pdf" download>
                    Download Resume
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </a>
                  <a className="squish-btn px-8 py-4 border-2 border-primary text-primary rounded-full font-button text-button hover:bg-primary hover:text-white transition-all" href="#contact" onClick={handleNavClick("contact")}>
                    Let&apos;s Connect
                  </a>
                </div>
                <div className="flex gap-6 pt-2">
                  <a
                    href="https://github.com/madhurakhandkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-on-surface-variant hover:text-wild-strawberry transition-colors"
                  >
                    <FaGithub className="text-4xl" />
                  </a>
                  <a
                    href="https://linkedin.com/in/madhurakhandkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-on-surface-variant hover:text-wild-strawberry transition-colors"
                  >
                    <FaLinkedin className="text-4xl" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-5 relative group">
                <div className="absolute inset-0 bg-wild-strawberry blob-mask transform rotate-6 scale-105 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                <div className="relative blob-mask overflow-hidden shadow-2xl">
                  <img className="w-full h-auto object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700" src="/profile.png" alt="Madhura Khandkar" />
                </div>
              </div>
            </div>

            {/* Scroll Down Arrow */}
            <div className="mt-12 md:mt-16 flex justify-center">
              <motion.div
                className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-wild-strawberry"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.6, 0.3, 0.6]
                }}
                whileHover={{ scale: 1.4 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                onClick={() => scrollToSection("experience")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </section>

          <section className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto" id="experience">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-16 max-w-2xl">Experience</motion.h2>
              <div className="max-w-2xl mx-auto space-y-16">
                <motion.div variants={staggerContainer}>
                  <motion.div variants={fadeUp} className="space-y-2 mb-4">
                    <h3 className="text-2xl md:text-3xl font-medium text-on-surface">Software Engineering Intern - Mile6</h3>
                    <p className="text-sm text-on-surface">May 2026 - Present &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Philadelphia, PA</p>
                  </motion.div>
                  <ul className="space-y-2 list-disc list-outside pl-5 text-sm text-on-surface-variant marker:text-wild-strawberry">
                    <motion.li variants={fadeUp}>
                      Eliminated manual grading, saving 6+ hours a week, through a Laravel scoring engine
                      evaluating 140 answer paths across 30+ assessment questions.
                    </motion.li>
                    <motion.li variants={fadeUp}>
                      Built a React/Vite frontend integrated with Laravel APIs, enabling dynamic assessment
                      workflows and progress tracking for 10+ clients.
                    </motion.li>
                    <motion.li variants={fadeUp}>
                      Streamlined client reporting by automating PDF generation and email delivery through
                      background jobs, saving 3–4 hours of manual effort weekly.
                    </motion.li>
                  </ul>
                </motion.div>

                <motion.div variants={staggerContainer}>
                  <motion.div variants={fadeUp} className="space-y-2 mb-4">
                    <h3 className="text-2xl md:text-3xl font-medium text-on-surface">Software Engineering Intern - Penn State</h3>
                    <p className="text-sm text-on-surface">October 2025 - May 2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;State College, PA</p>
                  </motion.div>
                  <ul className="space-y-2 list-disc list-outside pl-5 text-sm text-on-surface-variant marker:text-wild-strawberry">
                    <motion.li variants={fadeUp}>
                      Consolidated institutional data processing by developing a Ruby on Rails API that handled
                      50,000+ educational records across multiple systems.
                    </motion.li>
                    <motion.li variants={fadeUp}>
                      Reduced manual processing by 60% by automating institutional data imports into Activity
                      Insight with Ruby and XML export logic.
                    </motion.li>
                    <motion.li variants={fadeUp}>
                      Led PR reviews for the API and XML pipeline, catching 3–4 bugs and preventing merge
                      conflicts before release.
                    </motion.li>
                  </ul>
                </motion.div>

                <motion.div variants={staggerContainer}>
                  <motion.div variants={fadeUp} className="space-y-2 mb-4">
                    <h3 className="text-2xl md:text-3xl font-medium text-on-surface">Undergraduate Researcher - Penn State</h3>
                    <p className="text-sm text-on-surface">May 2024 - December 2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Middletown, PA</p>
                  </motion.div>
                  <ul className="space-y-2 list-disc list-outside pl-5 text-sm text-on-surface-variant marker:text-wild-strawberry">
                    <motion.li variants={fadeUp}>
                      Engineered a motorized 3D-printed throat model that improved biomechanical movement
                      accuracy by 25%.
                    </motion.li>
                    <motion.li variants={fadeUp}>
                      Programmed Python-controlled servo systems to simulate anatomically accurate muscle
                      contractions.
                    </motion.li>
                    <motion.li variants={fadeUp}>
                      Designed CAD-based anatomical models and optimized motor placement to satisfy simulation
                      requirements.
                    </motion.li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto" id="skills">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-16 max-w-2xl">Skills</motion.h2>
              <div className="grid gap-10 max-w-2xl mx-auto">
                {skillGroups.map((group) => (
                  <motion.div key={group.label} variants={fadeUp}>
                    <p className="font-label-caps text-sm text-on-surface-variant mb-4">{group.label.toUpperCase()}</p>
                    <div className="flex flex-wrap gap-3">
                      {group.items.map((item) => (
                        <motion.span
                          key={item}
                          className="text-sm text-on-surface bg-wild-strawberry/5 border border-wild-strawberry/30 rounded-full px-4 py-1.5 cursor-default"
                          whileHover={{ y: -3, borderColor: "#e34989" }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-visible" id="projects">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeUp} className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-16 max-w-2xl">Projects</motion.h2>
              <div className="grid gap-8 md:gap-16 max-w-2xl mx-auto">
                {workProjects.map((project, index) => {
                  const cardInner = (
                    <>
                      <h3 className="text-xl md:text-2xl font-medium text-on-surface mb-4">{project.title}</h3>
                      <p className="text-sm text-on-surface mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-sm text-on-surface-variant">{tag}</span>
                        ))}
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        {project.platforms.map((Platform, i) => (
                          <Platform.icon
                            key={i}
                            className="text-xl"
                            style={Platform.color ? { color: Platform.color } : {}}
                          />
                        ))}
                      </div>
                    </>
                  );

                  return (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      className="group"
                      whileHover={{ y: -10 }}
                    >
                      {project.modal ? (
                        <button
                          type="button"
                          onClick={() => setActiveModal(project.modal ?? null)}
                          className="block w-full text-left p-4 md:p-8 border border-outline-variant rounded-lg hover:border-on-surface transition-colors relative"
                        >
                          {cardInner}
                        </button>
                      ) : (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 md:p-8 border border-outline-variant rounded-lg hover:border-on-surface transition-colors relative"
                        >
                          {cardInner}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto relative" id="contact">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 variants={fadeUp} className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8 max-w-2xl">Contact</motion.h2>
              <motion.form variants={fadeUp} className="font-label-caps max-w-2xl mx-auto space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="light-contact-name" className="block text-sm mb-2 text-on-surface">Name</label>
                    <input
                      id="light-contact-name"
                      className="w-full bg-transparent border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-on-surface transition-colors"
                      placeholder="Your name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="light-contact-email" className="block text-sm mb-2 text-on-surface">Email Address</label>
                    <input
                      id="light-contact-email"
                      className="w-full bg-transparent border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-on-surface transition-colors"
                      placeholder="Email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="light-contact-message" className="block text-sm mb-2 text-on-surface">Content</label>
                  <textarea
                    id="light-contact-message"
                    className="w-full bg-transparent border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-on-surface transition-colors resize-none"
                    placeholder="Your message goes here. Ask me anything"
                    rows={6}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>
                <motion.button
                  className="w-full border border-outline-variant rounded-lg py-4 text-sm font-medium text-on-surface hover:border-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={contactStatus === "sending"}
                >
                  {contactStatus === "sending" ? "Sending…" : <>Send Email &nbsp;&rarr;</>}
                </motion.button>
                {contactStatus === "success" && (
                  <p className="text-sm text-center text-green-600">Thanks! Your message has been sent.</p>
                )}
                {contactStatus === "error" && (
                  <p className="text-sm text-center text-red-600">Something went wrong. Please try again or email me directly.</p>
                )}
              </motion.form>
            </motion.div>
          </section>
        </main>

        <footer className="bg-surface-container py-12 border-t border-outline-variant">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto gap-8">
            <span className="text-sm text-center md:text-left text-on-surface-variant">© 2026 Madhura Khandkar</span>

            <div className="flex gap-6">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://github.com/madhurakhandkar" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-xl" />
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://linkedin.com/in/madhurakhandkar" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </footer>

        <div className="custom-cursor hidden md:block" ref={cursorRef}></div>

        <AnimatePresence>
          {activeModal === "creditwise" && (
            <motion.div
              key="creditwise-modal-light"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                className="bg-black rounded-xl overflow-hidden w-full max-w-3xl shadow-2xl relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="absolute top-3 right-3 z-10 text-white/80 hover:text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
                  aria-label="Close"
                >
                  &#10005;
                </button>
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.tella.tv/video/cm9xlj5iv00060aibacxm6vkp/embed"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

