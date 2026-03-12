export const site = {
  name: "AlphaPrimeTech",
  domain: "alphaprimetech.com",

  // ✅ Added to fix Vercel build error
  locationLine: "IT Consulting • Staffing • NY",

  contactEmail: "contact@alphaprimetech.com",

  tagline:
    "Strategic IT consulting and staffing solutions focused on clarity, execution, and measurable outcomes.",

  companyBlurb:
    "AlphaPrimeTech is a New York–based IT consulting and staffing firm delivering structured, outcome-driven technology solutions across cloud, ERP, digital transformation, and enterprise mobility.",

  industries: [
    "Healthcare",
    "Financial Services",
    "Retail",
    "Public Sector",
    "Education",
    "Logistics",
    "Insurance",
    "Manufacturing",
  ],

  services: [
    {
      title: "Cloud Consulting",
      desc: "Architecture, migration planning, governance, and modernization strategies aligned to business goals.",
    },
    {
      title: "ERP Implementation & Advisory",
      desc: "End-to-end ERP guidance including assessment, selection support, configuration oversight, and stabilization.",
    },
    {
      title: "Digital Transformation",
      desc: "Roadmaps and delivery support to modernize systems, processes, and customer experiences.",
    },
    {
      title: "Enterprise Mobility",
      desc: "Secure mobile strategy, app modernization, device management alignment, and workforce enablement.",
    },
  ],

  staffing: [
    {
      title: "Staff augmentation",
      desc: "Add specialized talent quickly across engineering, QA, cloud, ERP, data, and program delivery.",
    },
    {
      title: "Outcome-based delivery teams",
      desc: "Bring in a delivery pod with defined milestones, reporting cadence, and accountable execution.",
    },
  ],

  // ✅ This is what the detail pages use
  serviceDetails: [
    {
      slug: "cloud-consulting",
      name: "Cloud Consulting",
      summary:
        "Practical cloud strategy and execution support—from architecture decisions to migrations and governance.",
      outcomes: [
        "Reduced infrastructure risk through clear architecture and security alignment",
        "Faster delivery through standardized patterns and landing-zone readiness",
        "Improved reliability with monitoring, backup, and operational guardrails",
      ],
      deliverables: [
        "Cloud assessment (current state → target state)",
        "Reference architecture + security baseline",
        "Migration plan and sequencing (apps, data, dependencies)",
        "Cost and performance recommendations",
        "Operational runbook + documentation handoff",
      ],
      timeline: [
        { phase: "Discovery & assessment", duration: "1–2 weeks" },
        { phase: "Architecture & planning", duration: "1–3 weeks" },
        { phase: "Implementation / migration", duration: "2–8+ weeks" },
        { phase: "Stabilization & handoff", duration: "1–2 weeks" },
      ],
    },
    {
      slug: "erp-implementation-advisory",
      name: "ERP Implementation & Advisory",
      summary:
        "End-to-end ERP planning and delivery guidance—selection support, implementation oversight, and stabilization.",
      outcomes: [
        "Improved delivery governance (scope, milestones, stakeholder visibility)",
        "Reduced risk through phased implementation planning and controls",
        "Cleaner handoff with documentation, training, and post-go-live support",
      ],
      deliverables: [
        "ERP readiness assessment and roadmap",
        "Vendor/platform selection support (if needed)",
        "Implementation governance + milestone plan",
        "Data migration approach and validation checks",
        "Go-live checklist + stabilization plan",
      ],
      timeline: [
        { phase: "Assessment & readiness", duration: "2–4 weeks" },
        { phase: "Planning & design", duration: "3–6 weeks" },
        { phase: "Build / config / integration", duration: "6–16+ weeks" },
        { phase: "Go-live & stabilization", duration: "2–6 weeks" },
      ],
    },
    {
      slug: "digital-transformation",
      name: "Digital Transformation",
      summary:
        "Structured modernization programs that improve agility, customer experience, and operational efficiency.",
      outcomes: [
        "A transformation roadmap with measurable milestones and business alignment",
        "Reduced delivery friction through clarified requirements and governance",
        "Modernized architecture patterns that scale and remain maintainable",
      ],
      deliverables: [
        "Transformation roadmap + prioritization framework",
        "Requirements and stakeholder alignment workshops",
        "Target architecture patterns (apps, data, integrations)",
        "Delivery plan (milestones, reporting, risk controls)",
        "Documentation + handoff package",
      ],
      timeline: [
        { phase: "Vision & roadmap", duration: "2–4 weeks" },
        { phase: "Planning & mobilization", duration: "2–3 weeks" },
        { phase: "Delivery (incremental)", duration: "6–24+ weeks" },
        { phase: "Stabilization & adoption", duration: "2–6 weeks" },
      ],
    },
    {
      slug: "enterprise-mobility",
      name: "Enterprise Mobility",
      summary:
        "Secure mobile enablement—strategy, modernization, governance, and device/app management alignment.",
      outcomes: [
        "Improved workforce productivity with secure, reliable mobile access",
        "Reduced operational risk through MDM alignment and security controls",
        "Higher adoption through UX improvements and support readiness",
      ],
      deliverables: [
        "Mobility strategy + governance model",
        "App assessment and modernization recommendations",
        "Security baseline (auth, encryption, device controls)",
        "Implementation plan (MDM, policies, rollout)",
        "Support playbooks + documentation handoff",
      ],
      timeline: [
        { phase: "Assessment & strategy", duration: "1–3 weeks" },
        { phase: "Design & planning", duration: "2–4 weeks" },
        { phase: "Implementation / rollout", duration: "3–10+ weeks" },
        { phase: "Stabilization & support handoff", duration: "1–2 weeks" },
      ],
    },
  ],
} as const;