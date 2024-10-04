"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Server,
  Database,
  Cpu,
  Globe,
  Menu,
  X,
  Download,
  ExternalLink,
  Briefcase,
} from "lucide-react";

const skills = [
  {
    name: "Frontend",
    icon: <Globe className="w-6 h-6" />,
    items: ["React", "JavaScript", "HTML/CSS"],
  },
  {
    name: "Backend",
    icon: <Server className="w-6 h-6" />,
    items: ["Node.js", "DSA in JAVA", "Python", "Express.js"],
  },
  {
    name: "Database",
    icon: <Database className="w-6 h-6" />,
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    name: "DevOps",
    icon: <Cpu className="w-6 h-6" />,
    items: ["AWS", "Git & GitHub"],
  },
];

const projects = [
  {
    title: "Youtube Frontend Clone",
    description:
      "A responsive YouTube clone built with React and styled-components, featuring video playback and comments.",
    image: "/assets/project-utube.jpg",
    github:
      "https://github.com/zishaxn/Major-Projects/tree/master/Youtube-Frontend",
    demo: "https://utube-frontend.netlify.app/",
    tech: ["React", "Styled Components", "YouTube API"],
  },
  {
    title: "Pokemon Explorer",
    description:
      "An interactive Pokédex app using the PokeAPI and React, with search and filtering capabilities.",
    image: "/assets/poke-explore.jpg",
    github: "https://github.com/zishaxn/Pokemon-Explorer",
    demo: "https://poke-explore-zishaxn.netlify.app/",
    tech: ["React", "PokeAPI", "CSS Grid"],
  },
  {
    title: "Budget Dashboard",
    description:
      "A full-stack budget tracking application with data visualization and expense categorization.",
    image: "/assets/dashborad1.jpg",
    github: "https://github.com/zishaxn/react-dashboard",
    demo: "https://budget-dashboard-zishaxn.netlify.app/",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeSkill, setActiveSkill] = useState(skills[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute bg-blue-300 rounded-full filter blur-3xl opacity-10 w-64 h-64 md:w-96 md:h-96"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            transition: "left 0.5s ease-out, top 0.5s ease-out",
          }}
        />
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              ZC
            </motion.div>
            <div className="hidden md:flex space-x-6">
              {["Home", "About", "Skills", "Experience", "Projects"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative overflow-hidden ${
                      activeSection === item.toLowerCase()
                        ? "text-blue-500"
                        : "text-gray-600"
                    } hover:text-blue-500 transition-colors duration-300 focus:outline-none`}
                  >
                    {item}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                      initial={false}
                      animate={{
                        scaleX: activeSection === item.toLowerCase() ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                )
              )}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-500 transition-colors duration-300 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg pt-16"
          >
            <div className="container mx-auto px-4 py-8">
              {["Home", "About", "Skills", "Experience", "Projects"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left py-3 ${
                      activeSection === item.toLowerCase()
                        ? "text-blue-500"
                        : "text-gray-600"
                    } hover:text-blue-500 transition-colors duration-300 focus:outline-none`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-20">
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center relative py-12"
        >
          <motion.div style={{ opacity, scale }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 mx-auto mb-8 relative"
            >
              <Image
                src="/assets/zishan_profile.jpg"
                alt="Zishan Chaudhary"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Zishan Chaudhary
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-600"
            >
              Backend Developer | Problem Solver | Cloud Computing
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex space-x-6 justify-center"
            >
              <a
                href="https://www.linkedin.com/in/zishaxnn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                <Linkedin size={24} aria-label="LinkedIn Profile" />
              </a>
              <a
                href="https://github.com/zishaxn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              >
                <Github size={24} aria-label="GitHub Profile" />
              </a>
              <a
                href="https://twitter.com/zishaxn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
              >
                <Twitter size={24} aria-label="Twitter Profile" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <section id="about" className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            About Me
          </h2>
          <div className="max-w-3xl mx-auto bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 md:p-8 rounded-lg shadow-lg">
            <p className="mb-4 text-gray-700 leading-relaxed">
              👋 I&apos;m a confident IT professional with infectious enthusiasm
              for technology. I am proficient in backend development with
              extensive knowledge of AWS cloud services. I specialize in
              selecting the best technologies tailored to your budget and
              requirements, providing end-to-end solutions that ensure your
              backend is efficiently designed, developed, and tested.
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              I have a solid grasp of object-oriented programming (OOP) and
              functional programming, which enhances my ability to design and
              implement robust and scalable systems.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <p className="text-gray-700 leading-relaxed">
                Let&apos;s connect and chat about Backend development,
                microservice architecture, serverless and the latest tech
                trends, or exchange some great book recommendations! 🚀
              </p>
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="/assets/Zishan_Resume.pdf"
                download
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center"
              >
                <Download className="mr-2" size={20} /> Download CV
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                  activeSkill.name === skill.name ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => setActiveSkill(skill)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center mb-4 text-blue-500">
                  {skill.icon}
                  <h3 className="text-lg font-medium ml-2 text-gray-800">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 text-center"
            >
              <h4 className="text-xl font-semibold mb-4 text-gray-800">
                {activeSkill.name} Technologies
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                {activeSkill.items.map((item) => (
                  <motion.span
                    key={item}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section id="experience" className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-purple-400"></div>
              <div className="flex items-center mb-4">
                <Briefcase className="text-blue-500 mr-2" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">
                  Backend Developer
                </h3>
              </div>
              <p className="text-lg text-blue-600 mb-2">CloudBerry Solutions</p>
              <p className="text-gray-600 mb-4">May 2024 - Present</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Led the backend development and management of serverless
                  microservices using AWS technologies (Lambda, API Gateway, S3,
                  SNS, SQS, CloudFormation, DynamoDB, RDS, CloudWatch,
                  CloudFront).
                </li>
                <li>
                  Wrote CloudFormation templates for all components of the
                  project, handling everything from start to finish.
                </li>
                <li>
                  Implemented authentication using Cognito and developed a
                  feedback mechanism that converted audio data to text with AWS
                  Transcribe.
                </li>
                <li>
                  Developed various APIs and generated unique QR codes for each
                  client.
                </li>
                <li>
                  Built a customer-facing system for logging in and submitting
                  feedback, which businesses could view on their dashboards.
                </li>
                <li>
                  Scraped menu data from Zomato to create menus for businesses.
                </li>
                <li>
                  Ensured all development aligned with UI design and project
                  requirements.
                </li>
                <li>
                  Handled backend coding, API testing using Postman, monitoring
                  with CloudWatch, and version control using Git and GitHub.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  AWS
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Python
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Postman
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  Postgresql
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  REST API
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-lg group"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {project.title}
                  </h3>
                  <div className="mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center"
                    >
                      <Github size={16} className="mr-1" /> GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:text-purple-600 transition-colors duration-300 flex items-center"
                    >
                      <ExternalLink size={16} className="mr-1" /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg py-8 mt-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-center md:text-left">
              &copy; 2023 Zishan Chaudhary. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.linkedin.com/in/zishaxnn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" aria-label="LinkedIn Profile" />
              </a>
              <a
                href="https://github.com/zishaxn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              >
                <Github className="w-6 h-6" aria-label="GitHub Profile" />
              </a>
              <a
                href="https://twitter.com/zishaxn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
              >
                <Twitter className="w-6 h-6" aria-label="Twitter Profile" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
