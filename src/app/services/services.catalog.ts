export type EngagementModel = {
  title: string;
  bestFor: string[];
  notes: string[];
};

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  typicalTimeline: { label: string; detail: string }[];
  engagementModels: EngagementModel[];
  seo: {
    title: string;
    description: string;
  };
};

export const services: Service[] = [
  {
    slug: "cloud-consulting",
    name: "Cloud Consulting",
    tagline: "Architecture, migration planning, governance, and modernization.",
    summary:
      "We help teams move to cloud with fewer surprises—clear architecture, landing-zone standards, security guardrails, and a delivery plan stakeholders can trust.",
    outcomes: [
      "Clear target architecture and governance model",
      "Reduced migration risk and delivery surprises",
      "Security-aligned implementation and operational readiness",
      "Better cost visibility and performance baseline",
    ],
    deliverables: [
      "Target architecture and reference patterns",
      "Landing-zone / governance blueprint (IAM, network, logging, policies)",
      "Migration plan with sequencing, dependencies, and risk controls",
      "Runbooks + documentation standards for handoff",
      "Milestones + stakeholder cadence",
    ],
    typicalTimeline: [
      { label: "Week 1", detail: "Discovery, environment review, constraints, success criteria" },
      { label: "Weeks 2–3", detail: "Architecture + governance blueprint, delivery plan" },
      { label: "Weeks 4–8+", detail: "Implementation support, reviews, and operational readiness/handoff" },
    ],
    engagementModels: [
      {
        title: "Fixed scope",
        bestFor: [
          "Defined deliverables (e.g., landing-zone blueprint + migration plan)",
          "Quick advisory engagements",
          "Stakeholder alignment packages",
        ],
        notes: [
          "Clear deliverables and timeline up-front",
          "Best when requirements are stable",
        ],
      },
      {
        title: "Time & Materials",
        bestFor: [
          "Ongoing delivery support and iterative modernization",
          "Uncertain scope or evolving requirements",
          "Multi-phase cloud programs",
        ],
        notes: [
          "Flexible scope with prioritized backlog",
          "Best when requirements evolve during execution",
        ],
      },
    ],
    seo: {
      title: "Cloud Consulting | AlphaPrimeTech",
      description: "Cloud architecture, governance, migration planning, and modernization support with disciplined delivery.",
    },
  },

  {
    slug: "erp-implementation-advisory",
    name: "ERP Implementation & Advisory",
    tagline: "Assessment, selection support, delivery oversight, and stabilization.",
    summary:
      "We add structure to ERP delivery: milestone governance, stakeholder cadence, risk controls, and documentation standards to keep execution predictable.",
    outcomes: [
      "Clear delivery plan with controlled risk and dependencies",
      "Improved stakeholder visibility and reporting cadence",
      "Better documentation, handoff readiness, and stabilization",
      "More predictable milestones and go-live execution",
    ],
    deliverables: [
      "ERP delivery plan + governance cadence",
      "Risk, dependency, and decision tracking (RAID/logs)",
      "Milestone and cutover readiness checklists",
      "Documentation standards + handoff checklist",
      "Stabilization plan and post-go-live reporting",
    ],
    typicalTimeline: [
      { label: "Week 1", detail: "Discovery, current state, program goals, constraints" },
      { label: "Weeks 2–4", detail: "Delivery plan, governance, reporting standards, risk controls" },
      { label: "Ongoing", detail: "Execution oversight, cutover readiness, stabilization support" },
    ],
    engagementModels: [
      {
        title: "Fixed scope",
        bestFor: [
          "Program reset (governance + milestone plan)",
          "Readiness and cutover checklist package",
          "Executive reporting setup",
        ],
        notes: [
          "Defined deliverables and timeline",
          "Best when program scope is known",
        ],
      },
      {
        title: "Time & Materials",
        bestFor: [
          "Ongoing PMO/delivery oversight",
          "Multi-quarter ERP execution",
          "Iterative risk/issue resolution and reporting",
        ],
        notes: [
          "Flexible resourcing aligned to delivery needs",
          "Best when execution evolves over time",
        ],
      },
    ],
    seo: {
      title: "ERP Implementation & Advisory | AlphaPrimeTech",
      description: "ERP delivery governance, milestones, stakeholder cadence, cutover readiness, and stabilization support.",
    },
  },

  {
    slug: "enterprise-mobility",
    name: "Enterprise Mobility",
    tagline: "Mobile delivery planning, governance, and execution support.",
    summary:
      "We help enterprise mobility programs succeed with clear scope, practical architecture, testing discipline, and stakeholder-friendly communication.",
    outcomes: [
      "Clear mobile delivery scope and execution approach",
      "Improved QA discipline and predictable releases",
      "Stakeholder transparency with better reporting cadence",
      "Stronger handoff readiness and documentation",
    ],
    deliverables: [
      "Mobile delivery plan + milestone governance",
      "Architecture review + technical recommendations",
      "QA approach (test strategy, automation roadmap where applicable)",
      "Release cadence + readiness checklists",
      "Documentation and handoff artifacts",
    ],
    typicalTimeline: [
      { label: "Week 1", detail: "Discovery, scope clarity, success criteria" },
      { label: "Weeks 2–3", detail: "Plan, governance, QA strategy, architecture review" },
      { label: "Weeks 4–8+", detail: "Execution support, release readiness, reporting, handoff" },
    ],
    engagementModels: [
      {
        title: "Fixed scope",
        bestFor: [
          "Delivery plan + QA strategy package",
          "Architecture review and recommendations",
        ],
        notes: [
          "Defined deliverables and timeline",
          "Best when objectives are clear",
        ],
      },
      {
        title: "Time & Materials",
        bestFor: [
          "Ongoing delivery leadership support",
          "Iterative releases and roadmap evolution",
        ],
        notes: [
          "Flexible scope aligned to releases",
          "Best when product backlog evolves",
        ],
      },
    ],
    seo: {
      title: "Enterprise Mobility | AlphaPrimeTech",
      description: "Enterprise mobility planning, governance, QA strategy, release readiness, and delivery support.",
    },
  },
];
