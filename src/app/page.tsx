"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Download, Menu, X } from "lucide-react";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import ExpertiseCard from "@/components/ExpertiseCard";
import SystemCard from "@/components/SystemCard";
import ExperienceCard from "@/components/ExperienceCard";
import TechnicalNoteCard from "@/components/TechnicalNoteCard";

// ─── DATA ────────────────────────────────────────────────────────────────────

const expertise = [
  {
    title: "Backend Engineering",
    items: ["Node.js", "TypeScript", "Express.js", "REST APIs", "Authentication", "Middleware Design", "Validation", "API Lifecycle"],
  },
  {
    title: "Cloud & Infrastructure",
    items: ["AWS Lambda", "API Gateway", "CloudFormation", "DynamoDB", "PostgreSQL", "S3", "CloudWatch", "SNS / SQS"],
  },
  {
    title: "Operations & Reliability",
    items: ["Production Support", "Incident Debugging", "UAT Deployments", "Monitoring", "Log Analysis", "Infra Coordination", "VAPT Coordination"],
  },
  {
    title: "Tooling",
    items: ["Git", "Postman", "Linux Basics", "VSCode", "Swagger", "REST Clients"],
  },
];

const systems = [
  {
    title: "AI-Assisted Productivity Platform",
    status: "ACTIVE DEVELOPMENT",
    statusColor: "blue" as const,
    overview: "A productivity-focused backend platform designed around structured task workflows, scalable APIs, and AI-assisted interactions. Built with a strong emphasis on backend architecture and long-term scalability.",
    architecture: ["Client", "↓", "Express API Layer", "↓", "Service Layer", "↓", "PostgreSQL", "↓", "AWS Services"],
    responsibilities: ["Backend API architecture", "Authentication and session handling", "Database schema design", "AI workflow integrations", "Backend validation pipelines", "Infrastructure structuring"],
    tech: ["Node.js", "TypeScript", "Express", "PostgreSQL", "AWS"],
    challenges: "Designing scalable backend workflows while maintaining clean service boundaries and extensible data structures for future AI integrations.",
  },
  {
    title: "API Management & Testing Platform",
    status: "INTERNAL TOOLING",
    statusColor: "yellow" as const,
    overview: "An internal backend-focused platform designed to simplify API management, request testing, environment handling, and operational workflows for development teams.",
    architecture: ["Client", "↓", "Request Handler", "↓", "Environment Manager", "↓", "Auth Layer", "↓", "Logger"],
    responsibilities: ["Request lifecycle handling", "Environment management", "Authentication workflows", "API request validation", "Logging architecture", "Backend service organization"],
    tech: ["Node.js", "TypeScript", "Express", "REST", "Swagger"],
    challenges: "Structuring reusable backend services while maintaining clean request flows and scalable environment configurations.",
  },
  {
    title: "Workflow-Oriented CRM Platform",
    status: "MVP / ACTIVE DEVELOPMENT",
    statusColor: "green" as const,
    overview: "A backend-heavy CRM platform focused on structured workflows, role-based access, operational management, and scalable business process handling.",
    architecture: ["Client", "↓", "API Gateway", "↓", "Auth + RBAC Layer", "↓", "Workflow Engine", "↓", "PostgreSQL"],
    responsibilities: ["Role-based access control", "Workflow management", "Notification handling", "Entity relationships", "API architecture"],
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Express", "AWS"],
    challenges: "Designing a flexible workflow engine that accommodates diverse business process configurations without coupling core models to specific use cases.",
  },
  {
    title: "Browser Automation & Testing Control System",
    status: "EXPERIMENTAL TOOLING",
    statusColor: "purple" as const,
    overview: "A lightweight automation system created to support testing workflows when required dependency tooling was unavailable during development. Demonstrates initiative and practical engineering problem-solving.",
    architecture: ["Control Script", "↓", "Browser Driver Layer", "↓", "Test Scenario Engine", "↓", "Result Logger"],
    responsibilities: ["Automation script architecture", "Browser state management", "Test scenario orchestration", "Result collection and reporting", "Error recovery handling"],
    tech: ["Python", "Automation", "Scripting", "CLI"],
    challenges: "Building reliable automation without standard tooling — designing around environmental constraints to deliver consistent, repeatable test execution.",
  },
];

const experiences = [
  {
    title: "Application Support & Backend Operations Engineer",
    company: "Enterprise Wealth Management — Production Support",
    period: "2025 – Present",
    overview: "Working in enterprise production-support environments involving deployments, API troubleshooting, operational debugging, incident resolution, and infrastructure coordination for wealth management systems.",
    highlights: ["UAT and production deployments", "API issue investigation and resolution", "Monitoring and debugging production incidents", "Infrastructure coordination with engineering teams", "Release support and validation", "VAPT coordination and compliance support"],
    tags: ["Production Support", "Deployments", "API Debugging", "Monitoring", "VAPT"],
  },
  {
    title: "Backend Engineer — Startup Environment",
    company: "CloudBerry Solutions",
    period: "May 2024 – 2025",
    overview: "Worked as a core backend engineer in a small startup environment, building serverless systems and backend workflows using AWS infrastructure and Python-based services.",
    highlights: ["AWS Lambda-based microservice development", "API Gateway integrations and endpoint design", "DynamoDB and PostgreSQL schema design", "CloudFormation templates for all infrastructure", "CloudWatch monitoring and alerting setup", "Cognito authentication and AWS Transcribe integration"],
    tags: ["AWS Lambda", "API Gateway", "DynamoDB", "PostgreSQL", "CloudFormation", "Python"],
  },
];

const notes = [
  {
    title: "Designing Event-Driven Backend Workflows",
    tag: "Architecture",
    readTime: "4 min read",
    excerpt: "Event-driven architecture decouples services through asynchronous message flows. This note covers SNS/SQS patterns, idempotency, dead letter queues, and when the complexity trade-off is worth it.",
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
  {
    title: "Why Operational Visibility Matters in Backend Systems",
    tag: "Operations",
    readTime: "4 min read",
    excerpt: "A backend system that runs without being observed is a liability. Structured logging, metrics, and distributed tracing are infrastructure — not afterthoughts. This note covers practical patterns from production support.",
    body: `A backend system that runs without being observed is a liability, not an asset. Operational visibility — the ability to understand what your system is doing in production — is what separates systems that degrade gracefully from ones that fail silently.

Visibility comes in several layers: logs, metrics, and traces.

Logs are the most immediate. Structured logging (JSON output with consistent fields like request_id, user_id, status, latency) makes logs searchable and filterable in CloudWatch. Unstructured logs — raw strings — become noise in production at any meaningful scale.

Metrics provide aggregated signals. Lambda invocation counts, error rates, duration percentiles (p50, p95, p99), and throttle counts tell you whether your system is performing within expected boundaries. Setting CloudWatch alarms on p99 latency and error rates ensures you know before users do.

Traces connect the dots across service boundaries. When a request flows through API Gateway → Lambda → DynamoDB, a correlation ID injected at the entry point and propagated through every log statement lets you reconstruct the full journey of any request.

Practical lessons from production support:

The absence of logs is itself a signal. If a Lambda produces no logs during a period when requests were expected, that points to a cold-start problem, timeout, or silent invocation failure.

Alert on trends, not just thresholds. A gradual increase in p99 latency that stays below the alert threshold is still a warning sign worth investigating.

Dashboards should tell a story. A CloudWatch dashboard showing invocations, errors, and duration in one view gives on-call engineers immediate situational awareness.

Operational visibility is infrastructure. Build it in from the start, and debugging production incidents becomes investigation rather than guesswork.`,
  },
  {
    title: "Structuring APIs for Long-Term Maintainability",
    tag: "API Design",
    readTime: "5 min read",
    excerpt: "An API is a contract. How you version, structure errors, and layer middleware determines how easily the system evolves without breaking clients. Practical patterns for building APIs that age well.",
    body: `An API is a contract. Every endpoint you publish becomes a commitment — to clients, to integrations, and to future engineers who will maintain the codebase. How you structure that contract determines how easily the system can evolve without breaking things.

Versioning strategy should be decided before launch, not after the first breaking change. URL-based versioning (/api/v1/resource) is predictable and cacheable. Header-based versioning is cleaner but harder to debug. Either works — inconsistency doesn't.

Consistent response shapes reduce friction for consumers. A standard response envelope with data, error, and meta fields means every success and every error looks the same. Consumers can handle errors generically without special-casing each endpoint.

Error handling is where most APIs fall short. HTTP status codes alone aren't enough — a 400 could mean dozens of different things. Structured error responses with machine-readable codes (VALIDATION_FAILED, RESOURCE_NOT_FOUND, RATE_LIMITED) let client applications respond appropriately rather than displaying generic error messages.

Middleware design matters for layered validation. Authentication, authorization, request validation, and rate limiting should each be discrete middleware layers — not entangled inside controller logic. This keeps controllers focused on business logic and makes each layer independently testable.

Documentation should be auto-generated where possible. OpenAPI specs generated from code rather than manually maintained stay accurate as the codebase evolves.

The most important principle: design for the consumer, not the server. An API that's easy to implement internally but awkward to consume is still a bad API. Think about what the client needs, and work backwards.`,
  },
  {
    title: "Handling Async Processing in Serverless Systems",
    tag: "Serverless",
    readTime: "5 min read",
    excerpt: "Lambda functions are ephemeral. Any work that needs to outlast a single invocation must be handled externally. This note covers SQS offloading, Step Functions, chunking strategies, and retry design.",
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
];

const navItems = ["Profile", "Expertise", "Systems", "Experience", "Notes"];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#262626] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-sm text-[#3b82f6]">ZC</span>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm text-[#737373] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none"
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/assets/Zishan_Resume.pdf"
              download
              className="flex items-center gap-1.5 text-xs font-mono text-[#737373] border border-[#262626] px-3 py-1.5 rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors duration-200"
            >
              <Download size={12} /> Resume
            </a>
          </div>
          <button
            className="md:hidden text-[#737373] hover:text-[#e5e5e5] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] pt-14 px-6">
          <div className="py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left text-lg text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none"
              >
                {item}
              </button>
            ))}
            <a
              href="/assets/Zishan_Resume.pdf"
              download
              className="text-sm text-[#3b82f6] mt-2"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}

      <main className="max-w-[1200px] mx-auto px-6 pt-14">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex items-center py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <div>
              <p className="font-mono text-xs text-[#525252] tracking-widest uppercase mb-6">
                BACKEND ENGINEER · SERVERLESS SYSTEMS · AWS
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#e5e5e5] leading-tight mb-6">
                Building backend systems focused on APIs, cloud infrastructure, and operational reliability.
              </h1>
              <p className="text-[#a3a3a3] leading-relaxed mb-10 max-w-lg">
                Backend-focused engineer working with Node.js, TypeScript, and AWS serverless infrastructure. Experience includes API development, Infrastructure-as-Code, production debugging, deployments, and event-driven backend workflows.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("systems")}
                  className="bg-[#3b82f6] text-white text-sm px-5 py-2.5 rounded hover:bg-[#2563eb] transition-colors duration-200"
                >
                  View Systems
                </button>
                <a
                  href="/assets/Zishan_Resume.pdf"
                  download
                  className="flex items-center gap-2 text-sm text-[#a3a3a3] border border-[#262626] px-5 py-2.5 rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors duration-200"
                >
                  <Download size={14} /> Download Resume
                </a>
                <a
                  href="https://github.com/zishaxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#737373] hover:text-[#e5e5e5] transition-colors duration-200"
                >
                  <Github size={14} /> GitHub
                </a>
              </div>
            </div>
            <div className="lg:pl-8">
              <ArchitectureDiagram />
            </div>
          </div>
        </section>

        {/* ── Engineering Profile ─────────────────────────────────────────── */}
        <section id="profile" className="py-20 border-t border-[#1a1a1a]">
          <p className="font-mono text-xs text-[#525252] tracking-widest uppercase mb-3">01</p>
          <h2 className="text-2xl font-semibold text-[#e5e5e5] mb-12">Engineering Profile</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <p className="text-[#a3a3a3] leading-relaxed">
                Worked across backend development and production support environments involving APIs, deployments, cloud infrastructure, debugging, and operational workflows. Experience includes both startup engineering and enterprise support environments.
              </p>
              <p className="text-[#a3a3a3] leading-relaxed">
                Primary focus areas include serverless backend systems, Infrastructure-as-Code, API integrations, database design, event-driven workflows, monitoring, and backend reliability. Currently building backend-heavy systems using Node.js, TypeScript, and AWS.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.linkedin.com/in/zishaxnn" target="_blank" rel="noopener noreferrer" className="text-[#525252] hover:text-[#3b82f6] transition-colors duration-200"><Linkedin size={18} /></a>
                <a href="https://github.com/zishaxn" target="_blank" rel="noopener noreferrer" className="text-[#525252] hover:text-[#e5e5e5] transition-colors duration-200"><Github size={18} /></a>
                <a href="mailto:zishaxn@gmail.com" className="text-[#525252] hover:text-[#e5e5e5] transition-colors duration-200"><Mail size={18} /></a>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { metric: "1+ Year", label: "Backend Engineering Experience" },
                { metric: "AWS Serverless", label: "Lambda · API Gateway · DynamoDB" },
                { metric: "Production Operations", label: "Deployments · Debugging · Monitoring" },
              ].map((card) => (
                <div key={card.metric} className="border border-[#262626] rounded-lg bg-[#111111] px-5 py-4">
                  <p className="text-[#e5e5e5] font-semibold text-sm">{card.metric}</p>
                  <p className="text-[#525252] text-xs font-mono mt-1">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Expertise ──────────────────────────────────────────────── */}
        <section id="expertise" className="py-20 border-t border-[#1a1a1a]">
          <p className="font-mono text-xs text-[#525252] tracking-widest uppercase mb-3">02</p>
          <h2 className="text-2xl font-semibold text-[#e5e5e5] mb-12">Core Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {expertise.map((card) => (
              <ExpertiseCard key={card.title} title={card.title} items={card.items} />
            ))}
          </div>
        </section>

        {/* ── Featured Systems ────────────────────────────────────────────── */}
        <section id="systems" className="py-20 border-t border-[#1a1a1a]">
          <p className="font-mono text-xs text-[#525252] tracking-widest uppercase mb-3">03</p>
          <h2 className="text-2xl font-semibold text-[#e5e5e5] mb-3">Featured Systems</h2>
          <p className="text-[#737373] text-sm mb-12 max-w-xl">
            A collection of backend systems, infrastructure-focused products, operational tooling, and engineering experiments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {systems.map((sys) => (
              <SystemCard key={sys.title} {...sys} />
            ))}
          </div>
        </section>

        {/* ── Experience ──────────────────────────────────────────────────── */}
        <section id="experience" className="py-20 border-t border-[#1a1a1a]">
          <p className="font-mono text-xs text-[#525252] tracking-widest uppercase mb-3">04</p>
          <h2 className="text-2xl font-semibold text-[#e5e5e5] mb-12">Experience</h2>
          <div className="max-w-2xl">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.title}
                {...exp}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </section>

        {/* ── Technical Notes ─────────────────────────────────────────────── */}
        <section id="notes" className="py-20 border-t border-[#1a1a1a]">
          <p className="font-mono text-xs text-[#525252] tracking-widest uppercase mb-3">05</p>
          <h2 className="text-2xl font-semibold text-[#e5e5e5] mb-3">Technical Notes</h2>
          <p className="text-[#737373] text-sm mb-12 max-w-xl">
            Notes on backend engineering patterns, operational practices, and system design thinking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {notes.map((note) => (
              <TechnicalNoteCard key={note.title} {...note} />
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1a1a1a] mt-8">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-mono text-[#525252]">
            © {new Date().getFullYear()} Zishan Chaudhary · Backend Engineer
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/zishaxn" target="_blank" rel="noopener noreferrer" className="text-xs text-[#525252] hover:text-[#e5e5e5] transition-colors duration-200 flex items-center gap-1.5"><Github size={14} /> GitHub</a>
            <a href="https://www.linkedin.com/in/zishaxnn" target="_blank" rel="noopener noreferrer" className="text-xs text-[#525252] hover:text-[#3b82f6] transition-colors duration-200 flex items-center gap-1.5"><Linkedin size={14} /> LinkedIn</a>
            <a href="mailto:zishaxn@gmail.com" className="text-xs text-[#525252] hover:text-[#e5e5e5] transition-colors duration-200 flex items-center gap-1.5"><Mail size={14} /> Email</a>
            <a href="/assets/Zishan_Resume.pdf" download className="text-xs text-[#525252] hover:text-[#3b82f6] transition-colors duration-200 flex items-center gap-1.5"><Download size={14} /> Resume</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
