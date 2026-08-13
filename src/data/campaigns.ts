export type Campaign = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  metric: string;
  metricLabel: string;
  quote: string;
  person: string;
  scenario: string;
  image: string;
  benefits: { title: string; description: string }[];
};

export const CAMPAIGNS: Campaign[] = [
  {
    slug: "documentation-backlog",
    seoTitle: "Home Care Documentation Workflow",
    seoDescription:
      "See how Selmou is being built to surface incomplete home care visits, route documentation for review, and preserve every correction, approval, and signature.",
    eyebrow: "Documentation without the evening chase",
    title: "Notes piling up?",
    italic: "Bring them home.",
    description:
      "Selmou is being built to turn each visit into a structured draft, keep every requirement visible, and route incomplete work to the right reviewer while it is still fresh.",
    metric: "Today",
    metricLabel: "incomplete work surfaced while it can still be fixed",
    quote:
      "I should not need three reports and a round of phone calls to know which visits are incomplete.",
    person: "The coordinator view",
    scenario: "Illustrative agency scenario",
    image: "/images/testimonials/kwon-desktop.jpg",
    benefits: [
      {
        title: "See every incomplete visit",
        description:
          "One current queue replaces texts, sticky notes, and end of day guesswork.",
      },
      {
        title: "Finish while it is fresh",
        description:
          "Missing fields and signatures surface before the details disappear.",
      },
      {
        title: "Keep the whole trail",
        description:
          "Drafts, corrections, approvals, and signatures remain connected to the record.",
      },
    ],
  },
  {
    slug: "every-visit-ready",
    seoTitle: "Home Care EVV and Visit Records",
    seoDescription:
      "Connect the schedule, caregiver, EVV event, documentation, signature, and review history in one traceable home care visit record with Selmou.",
    eyebrow: "From scheduled shift to defensible record",
    title: "The visit happened.",
    italic: "Now prove it.",
    description:
      "Selmou is being built to connect the schedule, caregiver, EVV event, documentation, signature, and review history in one traceable visit record.",
    metric: "1 view",
    metricLabel: "from scheduled visit to signed record",
    quote:
      "When someone asks what happened, I want one record. Not six systems and a reconstruction.",
    person: "The administrator view",
    scenario: "Illustrative agency scenario",
    image: "/images/testimonials/haag-desktop.jpg",
    benefits: [
      {
        title: "Start with the schedule",
        description: "The visit begins with the assigned caregiver, client, time, and requirements.",
      },
      {
        title: "Verify what happened",
        description: "EVV, tasks, notes, and signatures stay attached to the same visit.",
      },
      {
        title: "Resolve the exception",
        description: "Late, incomplete, or unusual events arrive with context and an owner.",
      },
    ],
  },
  {
    slug: "survey-ready",
    seoTitle: "Home Care Survey Readiness Software",
    seoDescription:
      "Build survey readiness into daily home care operations by keeping obligations, versions, signatures, corrections, approvals, and evidence connected.",
    eyebrow: "No binders. No reconstruction. No survey week panic.",
    title: "Survey day?",
    italic: "Show the record.",
    description:
      "Selmou keeps obligations, versions, signatures, corrections, and approvals connected so evidence is part of the work. Not a separate project.",
    metric: "Every",
    metricLabel: "version, signature, correction, and approval stays traceable",
    quote:
      "A survey should demonstrate the operation. It should not become an emergency inside it.",
    person: "The compliance view",
    scenario: "Illustrative agency scenario",
    image: "/images/testimonials/webb-desktop.jpg",
    benefits: [
      {
        title: "Deadlines stay visible",
        description: "Deterministic rules surface what is due, at risk, and overdue.",
      },
      {
        title: "History stays intact",
        description: "Corrections add context without erasing the record that came before.",
      },
      {
        title: "Evidence stays connected",
        description: "The record, signature, and audit trail are ready to be reviewed together.",
      },
    ],
  },
  {
    slug: "short-staffed",
    seoTitle: "Home Care Workforce Workflow",
    seoDescription:
      "Give home care coordinators, reviewers, and caregivers clear next actions, reliable field workflows, and one queue for work that needs attention.",
    eyebrow: "Protect the people already carrying the day",
    title: "Short staffed?",
    italic: "Protect the team.",
    description:
      "Selmou is being designed to make the work smaller through clear field actions, natural documentation, visible exceptions, and one review queue for the people who need to decide.",
    metric: "Built",
    metricLabel: "for the real conditions surrounding care",
    quote:
      "The system should adapt to the conditions of care. The caregiver should not have to adapt to the system.",
    person: "The caregiver view",
    scenario: "Illustrative agency scenario",
    image: "/images/testimonials/haag-desktop.jpg",
    benefits: [
      {
        title: "Make the next action obvious",
        description: "Each role opens to the work that needs attention now.",
      },
      {
        title: "Keep documentation natural",
        description: "Natural documentation is being built to support review, edits, and a clear final signature.",
      },
      {
        title: "Work through the dead zone",
        description: "The field app is being built to preserve today’s work locally and sync carefully when service returns.",
      },
    ],
  },
  {
    slug: "morning-huddle",
    seoTitle: "Home Care Operations Dashboard",
    seoDescription:
      "Bring coverage gaps, late visits, expiring credentials, unsigned notes, and approaching deadlines into one role-aware home care operations brief.",
    eyebrow: "A calmer command center for the day ahead",
    title: "Your morning brief.",
    italic: "One clear view.",
    description:
      "Selmou is being built to bring overnight changes, coverage gaps, late visits, expiring credentials, unsigned notes, and approaching deadlines into one calm operating brief.",
    metric: "7:55",
    metricLabel: "today’s risks, owners, and next steps in one view",
    quote:
      "I want to open the day and know what changed, what is at risk, and who owns the next step.",
    person: "The owner view",
    scenario: "Illustrative agency scenario",
    image: "/images/testimonials/webb-desktop.jpg",
    benefits: [
      {
        title: "Starts with facts",
        description: "Every item comes from the live schedule, record, credential, or obligation.",
      },
      {
        title: "Explains why it matters",
        description: "Plain language turns a list of exceptions into an operating plan.",
      },
      {
        title: "Takes you to the action",
        description: "Every risk opens directly to the person, record, or decision behind it.",
      },
    ],
  },
];

export function getCampaign(slug: string) {
  return CAMPAIGNS.find((campaign) => campaign.slug === slug);
}
