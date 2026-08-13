export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  datePublished: string;
  author: string;
  category: string;
  image: string;
  accent: string;
  keyTakeaways: [string, string, string];
  sources?: { title: string; url: string }[];
  sections: BlogSection[];
};

const fieldGuideSections = (
  subject: string,
  outcome: string,
  standard: string,
): BlogSection[] => [
  {
    heading: `Why ${subject} becomes harder than it should`,
    paragraphs: [
      `Home care moves across schedules, phones, homes, and office review. When ${subject} lives in a separate queue, the team loses the thread between what was planned, what happened, and what still needs attention.`,
      "The most expensive failures are usually quiet: an incomplete note, an approaching deadline, a credential that expires between schedule runs, or a correction that cannot be reconstructed later.",
    ],
  },
  {
    heading: "What a dependable operating system changes",
    paragraphs: [
      `A connected workflow carries the context forward so the agency can ${outcome}. Predictable work moves automatically; consequential decisions stay with the authorized person who can review the full record.`,
    ],
    bullets: [
      "Keeps the source, current version, reviewer, and disposition connected",
      "Surfaces incomplete work while the details are still fresh",
      "Explains exceptions in plain language and assigns the next action",
      "Preserves a clear manual path whenever automation is unavailable",
    ],
  },
  {
    heading: "The practical standard",
    paragraphs: [
      standard,
      "The goal is not another dashboard for the team to manage. It is a calmer operation, a complete record, and more attention left for the people receiving care.",
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "evaluate-home-care-software",
    title: "How to Evaluate Home Care Software Without Buying Another Silo",
    description:
      "A practical framework for judging workflow depth, field reliability, compliance evidence, migration, and AI governance.",
    date: "August 8, 2026",
    datePublished: "2026-08-08",
    author: "Selmou Editorial Team",
    category: "Buying guide",
    image: "/images/lassie-pg-1.jpg",
    accent: "#dcebd7",
    keyTakeaways: [
      "Ask vendors to demonstrate one visit from schedule through signed record, including the difficult path.",
      "Test field reliability by interrupting connectivity and confirming how every action reconciles afterward.",
      "Require a migration plan that preserves source files, provenance, uncertain matches, and a rollback path.",
    ],
    sections: fieldGuideSections(
      "evaluating home care software",
      "judge whether each visit can move from schedule to signed, defensible record without rebuilding context",
      "Ask every vendor to demonstrate one complete visit, one offline interruption, one correction, and one evidence request. A platform should prove the difficult path, not only the polished dashboard.",
    ),
  },
  {
    slug: "ai-governance-home-care",
    title: "AI in Home Care: What Should Stay Human",
    description:
      "A clear boundary between useful automation and the clinical, compliance, and workforce decisions people must own.",
    date: "August 8, 2026",
    datePublished: "2026-08-08",
    author: "Selmou Editorial Team",
    category: "AI governance",
    image: "/images/lassie-pg-2.jpg",
    accent: "#d9edf3",
    keyTakeaways: [
      "Name the clinical, compliance, and workforce decisions that AI may never make alone.",
      "Keep the source, AI contribution, human edits, disposition, and authorized approver together.",
      "Maintain a clear manual workflow when an AI service is unavailable or its output cannot be verified.",
    ],
    sources: [
      {
        title: "NIST AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
    sections: fieldGuideSections(
      "AI governance",
      "use AI for drafting, organizing, and explaining while preserving human authority over consequential decisions",
      "Start by naming the decisions AI may never make alone. Then require a review trail that shows the source, model contribution, edits, disposition, and authorized approver for every governed workflow.",
    ),
  },
  {
    slug: "offline-evv-field-guide",
    title: "Offline EVV: What Reliable Field Software Actually Requires",
    description:
      "Why honest offline states, local confirmation, and careful reconciliation matter wherever care is delivered.",
    date: "August 7, 2026",
    datePublished: "2026-08-07",
    author: "Selmou Editorial Team",
    category: "Field operations",
    image: "/images/lassie-pg-3.jpg",
    accent: "#efe7da",
    keyTakeaways: [
      "The caregiver must be able to see which offline actions are safely stored on the device.",
      "Reconnection should preserve original event times, order, authorship, and context.",
      "Reconciliation must prevent duplicate events and surface conflicts for human review.",
    ],
    sources: [
      {
        title: "Medicaid.gov Electronic Visit Verification guidance",
        url: "https://www.medicaid.gov/medicaid/home-community-based-services/home-community-based-services-guidance-additional-resources/electronic-visit-verification",
      },
    ],
    sections: fieldGuideSections(
      "offline EVV",
      "let caregivers complete the visit with confidence even when the connection disappears",
      "Test the entire visit in airplane mode: open the day, clock in, complete tasks, document, sign, and clock out. Then reconnect and verify that every event appears once, in order, with its original time and context.",
    ),
  },
  {
    slug: "home-care-documentation-backlog",
    title: "The Documentation Backlog Is an Operations Problem",
    description:
      "A better way to surface incomplete visits, support caregivers, and protect the review queue before details go stale.",
    date: "August 7, 2026",
    datePublished: "2026-08-07",
    author: "Selmou Editorial Team",
    category: "Documentation",
    image: "/images/lassie-pg-1.jpg",
    accent: "#e4eadb",
    keyTakeaways: [
      "Measure the time from the end of a visit to a complete record, not only the number of overdue notes.",
      "Surface missing fields and signatures against the visit while the details are still fresh.",
      "Route review with the schedule, documentation, versions, and ownership already attached.",
    ],
    sections: fieldGuideSections(
      "the documentation backlog",
      "find missing notes, signatures, and required fields while the visit is still recent",
      "Measure how many scheduled visits become complete records within one day, how many office touches each one requires, and where work waits longest. Improve the handoff before blaming the person at the end of it.",
    ),
  },
  {
    slug: "survey-readiness-every-day",
    title: "Survey Readiness Should Be a Daily System",
    description:
      "Move from urgent binders to obligations, signatures, versions, and evidence that stay connected as work happens.",
    date: "August 6, 2026",
    datePublished: "2026-08-06",
    author: "Selmou Editorial Team",
    category: "Compliance",
    image: "/images/lassie-pg-2.jpg",
    accent: "#dce9df",
    keyTakeaways: [
      "Treat evidence as an output of normal work instead of a binder assembled before review.",
      "Preserve signatures, versions, corrections, approvals, and the obligation each item satisfies.",
      "Give reviewers a plain-language index without weakening access controls or provenance.",
    ],
    sections: fieldGuideSections(
      "survey readiness",
      "treat evidence as a product of daily operations instead of a separate project before review",
      "Choose one common evidence request and reconstruct it from the current system. Count the systems, messages, files, and judgment calls required. The future workflow should remove those reconstruction steps without hiding the source record.",
    ),
  },
  {
    slug: "caregiver-credential-management",
    title: "Credential Expirations Should Never Surprise the Schedule",
    description:
      "Connect verified credentials, renewal work, and assignment rules before a staffing problem reaches the client.",
    date: "August 6, 2026",
    datePublished: "2026-08-06",
    author: "Selmou Editorial Team",
    category: "Workforce",
    image: "/images/testimonials/webb-desktop.jpg",
    accent: "#e9e2ce",
    keyTakeaways: [
      "Verify the credential source instead of relying on a manually entered expiration date.",
      "Show which future assignments are affected before an eligibility change reaches the schedule.",
      "Compute deadlines with explicit rules and send ambiguous cases to an authorized reviewer.",
    ],
    sections: fieldGuideSections(
      "credential management",
      "see which caregivers are approaching an eligibility change and which visits that change could affect",
      "Look beyond an expiry list. A useful system verifies the source document, computes the deadline deterministically, shows the operational impact, and prevents an invalid assignment before the schedule is published.",
    ),
  },
  {
    slug: "append-only-care-records",
    title: "Why Care Records Should Never Be Silently Overwritten",
    description:
      "The operational case for preserved versions, linked corrections, bound signatures, and a history people can explain.",
    date: "August 5, 2026",
    datePublished: "2026-08-05",
    author: "Selmou Editorial Team",
    category: "Record integrity",
    image: "/images/infographic/bottom-right.jpg",
    accent: "#dbe7ed",
    keyTakeaways: [
      "A correction should add a new version and reason instead of replacing the prior record.",
      "Bind each signature to the exact content the signer reviewed and approved.",
      "Make concurrent edits and administrative corrections visible without relying on a hidden activity log.",
    ],
    sections: fieldGuideSections(
      "record integrity",
      "correct mistakes without destroying the record that existed before the correction",
      "Ask what happens when two people edit the same record, when a signed field changes, and when an administrator makes a correction. The answer should preserve both history and human intent. It should not depend on a hidden activity log.",
    ),
  },
  {
    slug: "home-care-record-migration",
    title: "Moving Years of Home Care Records Without Losing the Story",
    description:
      "A migration playbook for fragmented drives, paper files, uncertain matches, and a safer cohort by cohort cutover.",
    date: "August 5, 2026",
    datePublished: "2026-08-05",
    author: "Selmou Editorial Team",
    category: "Migration",
    image: "/images/infographic/top-right.jpg",
    accent: "#e8e4dc",
    keyTakeaways: [
      "Preserve every original file, path, timestamp, and source-system identifier during migration.",
      "Send uncertain identity matches to people rather than merging records automatically.",
      "Cut over by cohort with completeness checks, agency sign-off, and a tested rollback path.",
    ],
    sections: fieldGuideSections(
      "record migration",
      "move from fragmented storage to a structured record without automatically merging identities or discarding provenance",
      "Begin with a small client cohort and preserve every original file, path, and timestamp. Let people adjudicate uncertain matches, produce a completeness scorecard, and keep a rollback path until the agency signs off on cutover.",
    ),
  },
  {
    slug: "daily-huddle-home-care",
    title: "The Daily Huddle Your Agency Should Not Have to Build",
    description:
      "Turn overnight changes, coverage gaps, overdue work, and approaching risks into one role aware morning brief.",
    date: "August 4, 2026",
    datePublished: "2026-08-04",
    author: "Selmou Editorial Team",
    category: "Agency operations",
    image: "/images/infographic/top-left.jpg",
    accent: "#e7e4d5",
    keyTakeaways: [
      "Start the brief with deterministic facts from the live schedule, records, credentials, and obligations.",
      "Every exception needs a reason, urgency, owner, next action, and closure condition.",
      "AI may organize and explain the brief, but it must not invent the underlying facts.",
    ],
    sections: fieldGuideSections(
      "the daily huddle",
      "open the day with a shared view of what changed, why it matters, and who owns the next step",
      "Build the first brief from deterministic facts: uncovered visits, late arrivals, incomplete notes, expiring credentials, unsigned records, and due obligations. Use AI to narrate and prioritize. Never use it to invent the underlying facts.",
    ),
  },
  {
    slug: "voice-to-note-human-review",
    title: "Voice to Note Without Giving Up Clinical Control",
    description:
      "Use natural documentation to reduce typing while keeping review, edits, signatures, and provenance explicit.",
    date: "August 4, 2026",
    datePublished: "2026-08-04",
    author: "Selmou Editorial Team",
    category: "Clinical workflow",
    image: "/images/infographic/bottom-right.jpg",
    accent: "#e0eae5",
    keyTakeaways: [
      "Treat voice-generated documentation as a draft until the authorized author reviews it.",
      "Make captured content and AI changes easy to inspect and correct section by section.",
      "Attach the final signature only to the reviewed version, with provenance preserved.",
    ],
    sections: fieldGuideSections(
      "voice to note documentation",
      "turn a natural spoken account into a structured draft without treating the draft as a clinical decision",
      "Evaluate the workflow section by section. The caregiver or nurse should be able to see what was captured, correct it quickly, understand what AI changed, and sign only the final reviewed version.",
    ),
  },
  {
    slug: "home-care-exception-management",
    title: "Run the Agency by Exception, Not by Inbox",
    description:
      "Bring late visits, missing signatures, coverage gaps, and obligations at risk to the people who can act.",
    date: "August 3, 2026",
    datePublished: "2026-08-03",
    author: "Selmou Editorial Team",
    category: "Operations",
    image: "/images/infographic/top-right.jpg",
    accent: "#dbe9dd",
    keyTakeaways: [
      "Define each exception with an owner, urgency, reason, next action, and closure condition.",
      "Route the record and operational context with the alert so the recipient can act immediately.",
      "Review exception rules regularly so the queue stays meaningful instead of becoming another inbox.",
    ],
    sections: fieldGuideSections(
      "exception management",
      "keep routine work moving quietly and concentrate attention where judgment is actually required",
      "Define each exception with an owner, urgency, reason, next action, and closure condition. If the team must interpret the dashboard before it can act, the software has only moved the coordination burden.",
    ),
  },
  {
    slug: "survey-evidence-packet",
    title: "From Survey Request to Evidence Packet",
    description:
      "What it takes to produce a record that is complete, traceable, understandable, and ready to stand behind.",
    date: "August 3, 2026",
    datePublished: "2026-08-03",
    author: "Selmou Editorial Team",
    category: "Compliance",
    image: "/images/infographic/top-left.jpg",
    accent: "#ede4cf",
    keyTakeaways: [
      "Begin the packet with a plain-language index that says what is included and where it came from.",
      "Keep signatures, versions, corrections, approvals, and audit history connected to the requested record.",
      "Make the export understandable without separating it from provenance or weakening access controls.",
    ],
    sections: fieldGuideSections(
      "evidence assembly",
      "produce the requested record with its signatures, versions, corrections, and audit history already connected",
      "Start with an index in plain language that tells the reviewer what is included and where it came from. Evidence should be easy to navigate without weakening access controls or separating the export from its provenance.",
    ),
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

const RELATED_STOP_WORDS = new Set([
  "about",
  "agency",
  "another",
  "care",
  "home",
  "should",
  "software",
  "what",
  "without",
  "your",
]);

function topicWords(post: BlogPost) {
  return new Set(
    `${post.title} ${post.description} ${post.category}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3 && !RELATED_STOP_WORDS.has(word)),
  );
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const sourceWords = topicWords(post);

  return BLOG_POSTS.filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateWords = topicWords(candidate);
      const sharedWords = [...sourceWords].filter((word) =>
        candidateWords.has(word),
      ).length;
      const categoryMatch = candidate.category === post.category ? 3 : 0;
      return { candidate, score: sharedWords + categoryMatch };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
