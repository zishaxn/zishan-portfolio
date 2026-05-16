"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Download, Menu, X, Server, Database } from "lucide-react";
import Image from "next/image";
import SystemCard from "@/components/SystemCard";
import ExperienceCard from "@/components/ExperienceCard";
import TechnicalNoteCard from "@/components/TechnicalNoteCard";

const navItems = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "Notes", id: "notes" },
  { label: "Contact", id: "contact" },
];


const systems = [
  {
    title: "AI-Assisted Productivity Platform",
    status: "ACTIVE DEVELOPMENT",
    statusColor: "blue" as const,
    overview:
      "A productivity-focused backend platform designed around structured task workflows, scalable APIs, and AI-assisted interactions. Built with a strong emphasis on backend architecture and long-term scalability.",
    responsibilities: [
      "Backend API architecture",
      "Authentication and session handling",
      "Database schema design",
      "AI workflow integrations",
      "Backend validation pipelines",
      "Infrastructure structuring",
    ],
    tech: ["Node.js", "TypeScript", "Express", "PostgreSQL", "AWS"],
    featured: true,
    images: [],
    videos: [],
    diagrams: [],
    github: {
      enabled: true,
      private: true,
      url: "",
    },
    liveUrl: "",
  },
  {
    title: "API Management & Testing Platform",
    status: "INTERNAL TOOLING",
    statusColor: "yellow" as const,
    overview:
      "An internal backend-focused platform designed to simplify API management, request testing, environment handling, and operational workflows for development teams.",
    responsibilities: [
      "Request lifecycle handling",
      "Environment management",
      "Authentication workflows",
      "API request validation",
      "Logging architecture",
    ],
    tech: ["Node.js", "TypeScript", "Express", "REST", "Swagger"],
  },
  {
    title: "Workflow-Oriented CRM Platform",
    status: "MVP",
    statusColor: "green" as const,
    overview:
      "A backend-heavy CRM platform focused on structured workflows, role-based access, operational management, and scalable business process handling.",
    responsibilities: [
      "Role-based access control",
      "Workflow management",
      "Notification handling",
      "Entity relationships",
      "API architecture",
    ],
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Express", "AWS"],
  },
  {
    title: "Browser Automation & Testing Control System",
    status: "EXPERIMENTAL",
    statusColor: "purple" as const,
    overview:
      "A lightweight automation system created to support testing workflows when required dependency tooling was unavailable during development.",
    responsibilities: [
      "Automation script architecture",
      "Browser state management",
      "Test scenario orchestration",
      "Result collection and reporting",
    ],
    tech: ["Python", "Automation", "Scripting", "CLI"],
  },
];

const experiences = [
  {
    title: "Software Engineer",
    company: "Clover Infotech (Client: HDFC Bank)",
    period: "2025 – Present",
    overview:
      "Supporting enterprise wealth management applications across incident management, deployment activities, API troubleshooting, and production/UAT operations.",
    highlights: [
      "Incident management and deployment activities for enterprise wealth management applications",
      "Coordinated infrastructure component upgrades and maintenance",
      "VAPT & Baselining coordination with infrastructure and security teams",
      "Deployment validation, issue analysis, and log investigation",
      "Environment stability and release management support",
    ],
    tags: ["Production Support", "Deployments", "API Troubleshooting", "VAPT", "Release Management"],
  },
  {
    title: "Backend Engineer",
    company: "CloudBerry Solutions (Startup)",
    period: "May 2024 – 2025",
    overview:
      "Worked as a core backend engineer in a small startup environment, building serverless systems and backend workflows using AWS infrastructure and Python-based services.",
    highlights: [
      "Developed REST APIs for loyalty systems and customer feedback workflows for Restuarant & Cafe Owners",
      "Implemented QR-based review flows and business operations platforms",
      "Built separate authentication systems for customers and business owners",
      "Designed PostgreSQL schemas and database architecture",
      "Deployed serverless infrastructure using CloudFormation",
    ],
    tags: ["AWS Lambda", "API Gateway", "DynamoDB", "PostgreSQL", "Cognito", "CloudFormation"],
  },
];

const notes = [
  {
    title: "Handling Async Workflows in Serverless Systems",
    tag: "Serverless",
    readTime: "5 min read",
    excerpt:
      "Lambda functions are ephemeral. Any work that needs to outlast a single invocation must be handled externally. Practical patterns for SQS offloading, Step Functions, and retry design.",
    body: `Serverless functions like AWS Lambda introduce a different mental model for async processing. Unlike a long-running server process that can hold state and manage background jobs, Lambda functions are ephemeral — they start, execute, and terminate. Any work that needs to outlast a single invocation must be handled externally.

Lambda has a hard execution limit (15 minutes). For workloads that might approach this limit — large file processing, complex transformations, multi-step workflows — you need an explicit strategy.

Pattern 1: Offload to SQS. Rather than processing synchronously, write the job to an SQS queue and return immediately. A separate Lambda triggered by the queue handles the actual work. The queue provides buffering, retry logic, and back-pressure for free.

Pattern 2: Step Functions for multi-step workflows. AWS Step Functions coordinate sequences of Lambda invocations, each with its own timeout and error handling. The state machine persists between steps — no single Lambda needs to hold the full workflow in memory.

Pattern 3: Chunking large datasets. If processing 10,000 records in one Lambda is risky, process 500 at a time. Store progress in DynamoDB. Fan out to multiple Lambda invocations using SNS. Convergence logic reassembles results when all chunks complete.

Retry design considerations:

Not all failures are equal. Network timeouts should be retried; validation errors should not. Distinguish retriable errors from terminal errors at the handler level.

Idempotency keys prevent double-processing when retries happen. Store a processed flag keyed on a unique request identifier, and skip reprocessing if already handled.

Dead letter queues capture messages that exhaust retry attempts. Never rely solely on logs to detect these — set CloudWatch alarms on DLQ message count.

Async serverless architecture trades operational simplicity for scalability. The patterns are well-understood — the challenge is applying them consistently before problems appear in production.`,
  },
  {
    title: "Debugging API Failures During Deployments",
    tag: "Operations",
    readTime: "4 min read",
    excerpt:
      "Production deployments expose edge cases that never appear in staging. Practical debugging patterns from real production support incidents involving API failures, timeouts, and silent errors.",
    body: `Production deployments expose edge cases that never appear in staging. The most frustrating incidents are the ones where everything looks fine — green health checks, no error logs, successful deployment — but users report failures.

The first instinct is to roll back. Sometimes that's correct. But rolling back without understanding the root cause means the same issue will reappear on the next deployment.

Pattern 1: Check the basics first. DNS propagation delays, load balancer health check misconfigurations, and security group changes are common culprits. These aren't code issues — they're infrastructure issues that manifest as API failures.

Pattern 2: Compare request logs between old and new versions. If the new version is receiving fewer requests, the problem is upstream (routing, DNS, load balancer). If it's receiving the same volume but returning errors, the problem is in the code or dependencies.

Pattern 3: Look for silent failures. Lambda timeouts don't always log errors — they just stop. Database connection pool exhaustion can cause requests to hang without throwing exceptions. These require looking at CloudWatch metrics (invocation duration, throttles) rather than application logs.

Pattern 4: Validate environment variables and secrets. A missing environment variable in the new deployment can cause initialization failures that don't surface until the first real request. Always verify configuration parity between environments.

Pattern 5: Test with real production traffic patterns. Staging environments rarely replicate production load, concurrency, or data volume. A query that works fine with 100 records might timeout with 10,000.

The goal isn't just to fix the immediate issue — it's to add observability so the next deployment surfaces problems earlier. Add structured logging, metric instrumentation, and health check endpoints that validate critical dependencies.`,
  },
  {
    title: "Structuring Express Services for Maintainability",
    tag: "API Design",
    readTime: "4 min read",
    excerpt:
      "Express gives you flexibility — which means it's easy to build unmaintainable codebases. Practical patterns for layering routes, controllers, services, and models in a way that scales with team size.",
    body: `Express gives you flexibility — which means it's easy to build unmaintainable codebases. Without structure, every developer implements their own patterns, and the codebase becomes inconsistent.

The goal is to establish conventions that make the codebase predictable. New engineers should be able to find where business logic lives, where database queries happen, and where validation occurs — without asking.

Layer 1: Routes. Routes should be thin. They define HTTP endpoints, extract request parameters, and delegate to controllers. No business logic here.

Layer 2: Controllers. Controllers orchestrate the request flow. They call services, handle errors, and format responses. Controllers should not contain database queries or complex business logic.

Layer 3: Services. Services contain business logic. They're framework-agnostic — they don't know about Express, requests, or responses. This makes them testable in isolation.

Layer 4: Models. Models handle database operations. They encapsulate queries, transactions, and data transformations. Controllers should never write raw SQL or ORM queries.

Middleware should be composable. Authentication, validation, rate limiting, and logging should each be discrete middleware functions that can be applied to routes independently.

Error handling should be centralized. A global error handler catches exceptions, logs them with context (request ID, user ID, endpoint), and returns consistent error responses.

Configuration should be environment-aware. Database credentials, API keys, and feature flags should come from environment variables, not hardcoded in the codebase.

The result is a codebase where every file has a clear purpose, and every layer has a single responsibility. This makes onboarding faster, debugging easier, and refactoring safer.`,
  },
  {
    title: "Event-Driven Architecture in Practice",
    tag: "Architecture",
    readTime: "5 min read",
    excerpt:
      "Event-driven systems decouple services through asynchronous message flows. Practical lessons from implementing SNS/SQS patterns, handling idempotency, and designing for failure in production.",
    body: `Event-driven architecture is a design paradigm where components communicate through events — discrete signals that something has happened — rather than direct function calls. In backend systems, this means replacing synchronous dependencies with asynchronous message flows.

In practice, this looks like: a user submits a form → an event is published to an SNS topic → multiple Lambda functions subscribe and react independently. Order confirmation emails, inventory updates, and audit logging all happen without blocking each other.

The core benefit is decoupling. Each service only cares about its input events and output events — not about what other services exist. This makes systems easier to extend, test, and scale independently.

SNS works well for fan-out patterns where a single event triggers multiple consumers. SQS adds durability, batching, and retry logic — essential when the consuming service might be temporarily unavailable.

Key design considerations:

Schema design matters early. Once events are flowing in production, changing their structure is costly. Define event contracts carefully and version them.

Idempotency is critical. Because retries are a core feature (not an edge case) of message queues, every consumer must handle processing the same event multiple times without side effects.

Dead letter queues are non-negotiable in production. Messages that fail processing repeatedly should land in a DLQ for inspection — not silently disappear.

Observability becomes more complex. Unlike synchronous call chains, event flows don't have a single stack trace. Distributed tracing with correlation IDs and structured logging is essential.

Event-driven architecture adds operational complexity in exchange for resilience and scalability. The trade-off is worth it — but only when the team understands the patterns and has appropriate monitoring in place.`,
  },
];

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const featuredProject = systems.find((s) => s.featured);
  const otherProjects = systems.filter((s) => !s.featured);

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f3f4f6]">
      {/* Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 px-6">
        <div className="max-w-6xl mx-auto bg-[#1a1f29]/80 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-medium">Zishan.</span>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-[#9ca3af] hover:text-[#f3f4f6] transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="/assets/Zishan_Resume.pdf"
              download
              className="flex items-center gap-2 text-sm border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-lg hover:border-[#4f7cff] hover:text-[#4f7cff] transition-all duration-200"
            >
              <Download size={14} /> Resume
            </a>
          </div>
          <button
            className="md:hidden text-[#9ca3af]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0f1115] pt-24 px-6">
          <div className="py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-lg text-[#9ca3af] hover:text-[#f3f4f6]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="min-h-screen flex items-center py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <div>
              <p className="text-[#9ca3af] mb-4">Hi, I&apos;m Zishan.</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Backend engineer focused on building reliable APIs and scalable backend systems.
              </h1>
              <p className="text-[#9ca3af] text-lg leading-relaxed mb-10">
                I primarily work with Node.js, TypeScript, and AWS, with experience across backend development, cloud infrastructure, deployments, production support, and operational debugging.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollTo("work")}
                  className="bg-[#4f7cff] text-white px-6 py-3 rounded-lg hover:bg-[#3b6ee8] transition-colors duration-200"
                >
                  View Work
                </button>
                <a
                  href="/assets/Zishan_Resume.pdf"
                  download
                  className="flex items-center gap-2 border border-[rgba(255,255,255,0.08)] px-6 py-3 rounded-lg hover:border-[#4f7cff] hover:text-[#4f7cff] transition-all duration-200"
                >
                  <Download size={16} /> Resume
                </a>
                <a
                  href="https://github.com/zishaxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-[#f3f4f6] transition-colors duration-200"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4f7cff]/20 to-[#a855f7]/20 rounded-2xl blur-3xl" />
                <div className="relative w-80 h-80 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#1a1f29]">
                  <Image
                    src="/assets/zishan_profile.png"
                    alt="Zishan Chaudhary"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* About */}
        <section id="about" className="py-20 border-t border-[rgba(255,255,255,0.08)]">
          <h2 className="text-3xl font-semibold mb-16">About</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6 text-[#9ca3af] leading-relaxed text-lg">
              <p>
                I work across backend development and production support environments, focusing on
                APIs, deployments, cloud infrastructure, debugging, and operational workflows. My
                experience spans both startup engineering and enterprise support environments.
              </p>
              <p>
                Primary focus areas include serverless backend systems, Infrastructure-as-Code, API
                integrations, database design, event-driven workflows, monitoring, and backend
                reliability. Currently building backend-heavy systems using Node.js, TypeScript, and
                AWS.
              </p>
              <p>
                Outside Coding, I spend a good time reading fiction, maintaining diary, and occasionally solve Rubik&apos;s in less than 90 seconds 😃.
              </p>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/zishaxnn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-[#4f7cff] transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/zishaxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-[#f3f4f6] transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:zishaxn@gmail.com"
                  className="text-[#9ca3af] hover:text-[#f3f4f6] transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Backend Experience", value: "1+ Year" },
                { label: "AWS & Serverless", value: "Lambda · API Gateway" },
                { label: "Production Operations", value: "Deployments · Debugging" },
                { label: "APIs & Infrastructure", value: "Node.js · TypeScript" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] rounded-xl p-5"
                >
                  <p className="text-sm text-[#9ca3af] mb-1">{stat.label}</p>
                  <p className="text-[#f3f4f6] font-medium">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="py-20 border-t border-[rgba(255,255,255,0.08)]">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-3">Selected Work</h2>
            <p className="text-[#9ca3af] max-w-2xl">
              A collection of backend systems, infrastructure-focused products, and operational
              tooling.
            </p>
          </div>

          {/* Featured Project */}
          {featuredProject && (
            <div className="mb-16 bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden hover:border-[rgba(79,124,255,0.3)] transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-[#1a1f29] to-[#12151b] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Server className="mx-auto text-[#4f7cff]" size={48} />
                    <p className="text-[#6b7280] text-sm font-mono">
                      [Dashboard Preview Placeholder]
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block text-xs font-mono text-[#4f7cff] bg-[#4f7cff]/10 border border-[#4f7cff]/20 px-3 py-1 rounded-full mb-3">
                      FEATURED
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                      {featuredProject.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#4f7cff] bg-[#4f7cff]/10 border border-[#4f7cff]/20 px-3 py-1 rounded-full">
                    {featuredProject.status}
                  </span>
                </div>
                <p className="text-[#9ca3af] leading-relaxed mb-8 text-lg">
                  {featuredProject.overview}
                </p>
                <div className="mb-8">
                  <p className="text-sm text-[#6b7280] mb-4">Key Responsibilities</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {featuredProject.responsibilities.map((r) => (
                      <li key={r} className="text-sm text-[#9ca3af] flex items-start gap-2">
                        <span className="text-[#4f7cff] mt-1">›</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-[#9ca3af] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((sys) => (
              <div
                key={sys.title}
                className="bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden hover:border-[rgba(79,124,255,0.3)] transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-[#1a1f29] to-[#12151b] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="text-[#4f7cff]" size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <SystemCard {...sys} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 border-t border-[rgba(255,255,255,0.08)]">
          <h2 className="text-3xl font-semibold mb-16">Experience</h2>
          <div className="max-w-3xl space-y-12">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.title} {...exp} isLast={i === experiences.length - 1} />
            ))}
          </div>
        </section>

        {/* Engineering Notes */}
        <section id="notes" className="py-20 border-t border-[rgba(255,255,255,0.08)]">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-3">Engineering Notes</h2>
            <p className="text-[#9ca3af] max-w-2xl">
              Notes on backend engineering patterns, operational practices, and system design
              thinking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <TechnicalNoteCard key={note.title} {...note} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-10 border-t border-[rgba(255,255,255,0.08)]">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Let&apos;s Connect</h2>
              <p className="text-[#9ca3af] text-lg">
                Open to backend and cloud engineering opportunities.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="https://github.com/zishaxn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#9ca3af] hover:text-[#f3f4f6] transition-colors bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] px-6 py-3 rounded-lg hover:border-[#4f7cff]"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/zishaxnn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#9ca3af] hover:text-[#4f7cff] transition-colors bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] px-6 py-3 rounded-lg hover:border-[#4f7cff]"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href="mailto:zishaxn@gmail.com"
                className="flex items-center gap-2 text-[#9ca3af] hover:text-[#f3f4f6] transition-colors bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] px-6 py-3 rounded-lg hover:border-[#4f7cff]"
              >
                <Mail size={18} /> Email
              </a>
              <a
                href="/assets/Zishan_Resume.pdf"
                download
                className="flex items-center gap-2 text-white bg-[#4f7cff] px-6 py-3 rounded-lg hover:bg-[#3b6ee8] transition-colors"
              >
                <Download size={18} /> Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.08)] mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-sm text-[#6b7280]">© {new Date().getFullYear()} Zishan Chaudhary</p>
        </div>
      </footer>
    </div>
  );
}
