import {
  Globe,
  Smartphone,
  Layout,
  Server,
  Bot,
  Radio,
  Box,
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Target,
  Users,
} from "lucide-react";

// Art-directed imagery
import commitmentArch from "../assets/about/commitment-arch.jpg";
import geometricPlaza from "../../assets/Geometric Plaza Shadows and Suited Figures.png";
import sorayaMarble from "../../assets/soraya-silvestri-LmC65WoT3Rk-unsplash.jpg";
import sphereCenterpiece from "../assets/hero/sphere-centerpiece.jpg";
import glossyBlueHand from "../../assets/Glossy Blue Resin on Black Hand.png";

/**
 * TAVQO Presentation Cards Data
 * Factual, professional information about TAVQO's studio, capabilities, process, principles and contact.
 * Zero placeholder slogans, fake metrics, or AI-generated filler text.
 */
export const WHEEL_SLIDES = [
  // -------------------------------------------------------------
  // SLIDE 01: WHO IS TAVQO?
  // -------------------------------------------------------------
  {
    id: "slide-1",
    theme: "matte-black",
    number: "01",
    badge: "01 / ABOUT TAVQO",
    headerTopic: "STUDIO OVERVIEW",
    title: "WE ARE TAVQO.",
    eyebrow: "CREATIVE TECHNOLOGY STUDIO",
    description:
      "TAVQO is a creative technology studio that designs and builds digital products, web applications, intelligent systems and interactive experiences. We partner with founders and businesses to turn complex ideas into dependable, production-ready software.",
    image: commitmentArch,
    imageCaption: "Studio visual — Architecture & Form",
    coreAreas: [
      { label: "WEB & MOBILE", desc: "Applications & platforms" },
      { label: "UI/UX DESIGN", desc: "Interfaces & design systems" },
      { label: "AI & AUTOMATION", desc: "Intelligent workflows" },
      { label: "3D & CONNECTED", desc: "Interactive & smart systems" },
    ],
    ctaText: "Explore Studio",
  },

  // -------------------------------------------------------------
  // SLIDE 02: WHAT DO WE BELIEVE? (Warm Ivory)
  // -------------------------------------------------------------
  {
    id: "slide-2",
    theme: "warm-ivory",
    number: "02",
    badge: "02 / WHAT WE BELIEVE",
    headerTopic: "DESIGN & TECHNOLOGY",
    title: "IDEAS INTO REALITY.",
    eyebrow: "OUR BELIEF",
    description:
      "We believe that successful digital products require design and technology to work together from the very beginning. Design provides clarity and human direction; technology provides the reliability and capability to deliver it.",
    image: geometricPlaza,
    imageCaption: "Form meets structure",
    disciplines: [
      {
        id: "design",
        num: "01",
        name: "Design",
        tagline: "Clarity, usability and visual structure",
        icon: Layout,
        desc: "We design websites, mobile apps and digital tools centered on real user needs. Every layout, typographic choice and interaction is created to make complex workflows feel direct and easy to navigate.",
        deliverables: [
          "User Interface (UI) Design",
          "User Experience (UX) Research",
          "Component Design Systems",
          "Interactive Prototypes",
        ],
      },
      {
        id: "technology",
        num: "02",
        name: "Technology",
        tagline: "Appropriate, reliable modern stacks",
        icon: Cpu,
        desc: "We choose technology based on what the project truly requires. Whether building a fast web application, an automated workflow, or a real-time data connection, we prioritize stability, speed and maintainability.",
        deliverables: [
          "Modern Web Stacks",
          "Mobile Frameworks",
          "AI & Automated Workflows",
          "Cloud Infrastructure",
        ],
      },
      {
        id: "engineering",
        num: "03",
        name: "Engineering",
        tagline: "Clean, maintainable and tested code",
        icon: Layers,
        desc: "Dependable engineering is the foundation of every product we ship. We write clear, well-documented code with systematic testing and modular architecture so your software remains easy to update as your business grows.",
        deliverables: [
          "Modular Code Architecture",
          "API & Database Engineering",
          "Automated Testing",
          "Continuous Deployment",
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // SLIDE 03: HOW DO WE APPROACH PROBLEMS?
  // -------------------------------------------------------------
  {
    id: "slide-3",
    theme: "matte-black",
    number: "03",
    badge: "03 / OUR APPROACH",
    headerTopic: "PROBLEM TO SOLUTION",
    title: "UNDERSTAND. CREATE. EVOLVE.",
    eyebrow: "PRACTICAL METHODOLOGY",
    description:
      "We focus on understanding the real problem before choosing tools or writing code. Every project begins with clear requirements and is built around practical business and user needs.",
    image: sorayaMarble,
    imageCaption: "Sculptural visual — clarity & focus",
    stages: [
      {
        num: "01",
        id: "understand",
        title: "Understand",
        stepLabel: "REQUIREMENTS & SCOPE",
        icon: Compass,
        summary:
          "We listen to your goals, examine how your users work, and clarify requirements before starting design or development.",
        details: [
          "Discuss project goals and success criteria",
          "Map user workflows and identify constraints",
          "Define the technical scope and priorities",
        ],
      },
      {
        num: "02",
        id: "create",
        title: "Create",
        stepLabel: "DESIGN & DEVELOPMENT",
        icon: Sparkles,
        summary:
          "We create interface designs and engineer the solution with clean, tested code, sharing progress at regular checkpoints.",
        details: [
          "Design wireframes, UI layouts and prototypes",
          "Develop frontend and backend architecture",
          "Integrate required APIs, databases and services",
        ],
      },
      {
        num: "03",
        id: "evolve",
        title: "Evolve",
        stepLabel: "LAUNCH & SUPPORT",
        icon: Zap,
        summary:
          "We test thoroughly across devices, deploy cleanly, and provide ongoing support and updates as your product grows.",
        details: [
          "Perform quality assurance and performance testing",
          "Deploy to production hosting environments",
          "Provide ongoing maintenance and feature updates",
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // SLIDE 04: WHAT DO WE BUILD? (Capabilities)
  // -------------------------------------------------------------
  {
    id: "slide-4",
    theme: "electric-accent",
    number: "04",
    badge: "04 / WHAT WE BUILD",
    headerTopic: "CAPABILITIES",
    title: "WHAT WE BUILD.",
    eyebrow: "OUR CAPABILITIES",
    description:
      "TAVQO provides full-stack design and development across eight core areas of modern software and digital technology.",
    image: glossyBlueHand,
    imageCaption: "3D material & interaction experiment",
    services: [
      {
        num: "01",
        id: "web",
        icon: Globe,
        title: "Website & Web Application Development",
        desc: "Fast, responsive web applications and custom websites.",
        fullDetail:
          "We develop high-performance web applications and marketing sites using React, Next.js and modern web standards. Built for speed, accessibility, and clear presentation on all screen sizes.",
        tools: ["React", "Next.js", "Node.js", "Tailwind CSS"],
      },
      {
        num: "02",
        id: "mobile",
        icon: Smartphone,
        title: "Mobile Application Development",
        desc: "iOS and Android apps tailored for touch devices.",
        fullDetail:
          "We build mobile applications using React Native and native tools. Engineered for smooth gesture navigation, offline data handling, and an intuitive user experience on both iOS and Android.",
        tools: ["React Native", "iOS", "Android", "Cross-Platform"],
      },
      {
        num: "03",
        id: "design",
        icon: Layout,
        title: "UI/UX & Product Design",
        desc: "User journeys, interface design and cohesive design systems.",
        fullDetail:
          "We create user-friendly interfaces from initial wireframes to polished Figma design systems. Our focus is on clear information hierarchy, readable typography, and effortless usability.",
        tools: ["Figma", "UI Design", "UX Research", "Design Systems"],
      },
      {
        num: "04",
        id: "backend",
        icon: Server,
        title: "Backend Development & API Integration",
        desc: "Reliable server backends, databases and API connections.",
        fullDetail:
          "We develop secure backend services and APIs using Node.js, relational databases and cloud infrastructure. We connect third-party platforms, payments, authentication and external services.",
        tools: ["Node.js", "PostgreSQL", "REST & GraphQL", "Authentication"],
      },
      {
        num: "05",
        id: "ai",
        icon: Bot,
        title: "AI & Workflow Automation",
        desc: "Practical AI integration, language models and process automation.",
        fullDetail:
          "We integrate artificial intelligence models and automated workflows into existing business processes. This helps automate repetitive tasks, summarize information, and streamline internal operations.",
        tools: ["LLM Integration", "Workflow Automation", "API Pipelines", "Custom Agents"],
      },
      {
        num: "06",
        id: "iot",
        icon: Radio,
        title: "IoT & Smart Systems",
        desc: "Connected hardware devices, sensor feeds and live dashboards.",
        fullDetail:
          "We engineer software that connects to physical devices and IoT sensors using MQTT and WebSockets. We build live monitoring dashboards for real-time equipment and telemetry data.",
        tools: ["MQTT Protocols", "WebSockets", "Live Telemetry", "Device Dashboards"],
      },
      {
        num: "07",
        id: "immersive",
        icon: Box,
        title: "Immersive 3D Experiences",
        desc: "Interactive 3D visuals, WebGL graphics and spatial presentations.",
        fullDetail:
          "We create interactive 3D presentations and product showcases for the web using Three.js and WebGL. Allows visitors to interact with dimensional models directly in the browser without plugins.",
        tools: ["Three.js", "WebGL", "Interactive 3D", "Canvas Animation"],
      },
      {
        num: "08",
        id: "deployment",
        icon: ShieldCheck,
        title: "Deployment & Maintenance",
        desc: "Cloud hosting setup, deployment pipelines and ongoing support.",
        fullDetail:
          "We set up secure cloud hosting, automated deployment pipelines (CI/CD), and scheduled backups. We provide ongoing software maintenance, security updates and technical assistance post-launch.",
        tools: ["Cloud Hosting", "CI/CD Pipelines", "Automated Backups", "Technical Support"],
      },
    ],
  },

  // -------------------------------------------------------------
  // SLIDE 05: HOW DO WE WORK? (Five-Stage Process)
  // -------------------------------------------------------------
  {
    id: "slide-5",
    theme: "warm-ivory",
    number: "05",
    badge: "05 / OUR PROCESS",
    headerTopic: "HOW WE WORK",
    title: "HOW WE WORK.",
    eyebrow: "FIVE-STAGE PROCESS",
    description:
      "Every project follows a straightforward five-stage process from the first conversation to launch and ongoing maintenance.",
    stages: [
      {
        num: "01",
        name: "Discover",
        tagline: "Understand goals & requirements",
        desc: "We discuss your business objectives, target audience, and functional requirements to define a realistic scope and timeline.",
        deliverables: [
          "Requirement Gathering",
          "Scope & Timeline Definition",
          "Technical Review",
        ],
      },
      {
        num: "02",
        name: "Define",
        tagline: "Establish scope & direction",
        desc: "We plan the project milestones, outline the system architecture, and agree on technical tools and delivery schedules.",
        deliverables: [
          "Project Milestone Roadmap",
          "Technical Architecture Outline",
          "Platform & Tool Selection",
        ],
      },
      {
        num: "03",
        name: "Design",
        tagline: "Create user-focused experiences",
        desc: "We design wireframes, user flows and visual mockups in Figma, refining them through feedback before starting development.",
        deliverables: [
          "Wireframes & User Flows",
          "Visual Interface Design",
          "Interactive Prototypes",
        ],
      },
      {
        num: "04",
        name: "Develop",
        tagline: "Build & integrate the solution",
        desc: "We build the application using clean, maintainable code. We connect APIs, configure databases, and test functionality regularly.",
        deliverables: [
          "Frontend & Backend Code",
          "API & Service Integrations",
          "Cross-Browser & Device Testing",
        ],
      },
      {
        num: "05",
        name: "Deliver",
        tagline: "Test, launch & support",
        desc: "We perform final quality assurance, deploy to your hosting environment, hand over documentation, and provide ongoing technical support.",
        deliverables: [
          "Final Quality Checks",
          "Production Deployment",
          "Ongoing Technical Support",
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // SLIDE 06: WHAT PRINCIPLES GUIDE US?
  // -------------------------------------------------------------
  {
    id: "slide-6",
    theme: "matte-black",
    number: "06",
    badge: "06 / OUR PRINCIPLES",
    headerTopic: "GUIDING PRINCIPLES",
    title: "GUIDING PRINCIPLES.",
    eyebrow: "HOW WE MAKE DECISIONS",
    description:
      "Four straightforward principles guide how we write code, design interfaces, and work with clients on every project.",
    principles: [
      {
        num: "01",
        title: "Clarity",
        icon: Compass,
        summary: "Understand the problem before building.",
        detail:
          "We avoid unnecessary complexity. Good software is clear in its purpose, clear in its code, and clear in its user interface. We make sure what we are building genuinely addresses your requirements.",
      },
      {
        num: "02",
        title: "Purpose",
        icon: Target,
        summary: "Every feature should serve a meaningful goal.",
        detail:
          "We do not add features or decorative animations simply for trendiness. Every screen, button, and integration is designed to serve a real user need or business objective.",
      },
      {
        num: "03",
        title: "Scalability",
        icon: Zap,
        summary: "Build solutions that can evolve.",
        detail:
          "We write modular, well-structured code and choose dependable hosting infrastructure so your application can comfortably support more users and new features over time.",
      },
      {
        num: "04",
        title: "Collaboration",
        icon: Users,
        summary: "Work closely with clients throughout the process.",
        detail:
          "We communicate openly, share progress regularly, and work as a direct partner with your team rather than an isolated external contractor.",
      },
    ],
  },

  // -------------------------------------------------------------
  // SLIDE 07: HOW CAN SOMEONE WORK WITH US?
  // -------------------------------------------------------------
  {
    id: "slide-7",
    theme: "midnight-luxury",
    number: "07",
    badge: "07 / CONTACT",
    headerTopic: "START A CONVERSATION",
    title: "LET'S BUILD WHAT'S NEXT.",
    eyebrow: "GET IN TOUCH",
    description:
      "Have a project in mind, need technical expertise, or looking to build a new digital product? Contact us and let's discuss how we can work together.",
    image: sphereCenterpiece,
    imageCaption: "Studio visual — 3D luminous form",
    statusBadge: "OPEN FOR NEW PROJECTS",
    ctaPrimary: "Start a Conversation",
    ctaPrimaryHref: "/#contact",
    email: "hello@tavqo.com",
    emailHref: "mailto:hello@tavqo.com",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "Selected Work", href: "/#projects" },
    ],
  },
];
