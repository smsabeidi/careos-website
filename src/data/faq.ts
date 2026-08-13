export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Selmou?",
    answer:
      "Selmou is home care operations software being built to connect client records, scheduling, EVV, field documentation, credentials, compliance work, approvals, and operational reporting in one system.",
  },
  {
    question: "Who is Selmou for?",
    answer:
      "Selmou is being designed for home care agencies and the owners, administrators, coordinators, clinical leaders, reviewers, and caregivers responsible for each visit.",
  },
  {
    question: "How do I get started?",
    answer:
      "The process starts with one real agency workflow. Selmou maps how that workflow operates today and demonstrates how it can move from a scheduled visit to a complete, reviewable record.",
  },
  {
    question: "Can caregivers work without a connection?",
    answer:
      "The Selmou field app is being designed for unreliable service. The intended workflow keeps today’s work available on the device, confirms actions locally, and reconciles changes carefully when service returns.",
  },
  {
    question: "What does the AI decide?",
    answer:
      "AI is intended to draft, organize, and explain. Authorized people retain responsibility for clinical, final compliance, and workforce decisions, with a review trail for AI-assisted work.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Onboarding is scoped around the agency, its records, and the workflow selected for the first implementation cohort. Timing is confirmed after discovery rather than promised as a fixed number of days.",
  },
  {
    question: "What does Selmou cost?",
    answer:
      "Pricing is not currently published. It is scoped to the size and shape of the operation, including active caregivers, client volume, workflows, and implementation needs.",
  },
  {
    question: "How does Selmou approach protected health information?",
    answer:
      "Protected health information should not be submitted through this public website. Before product use involving PHI, the customer and Selmou must confirm the applicable safeguards, access controls, and contractual requirements, including a Business Associate Agreement when required.",
  },
];
