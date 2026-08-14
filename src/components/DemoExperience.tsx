"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import BrandMark from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "founders@selmou.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AnswerKey =
  | "role"
  | "clientVolume"
  | "careProgram"
  | "agencySoftware"
  | "operationalPressure"
  | "exceptionProcess"
  | "timeline";

type Answers = Partial<Record<AnswerKey, string>>;

type DemoStep = {
  key: AnswerKey;
  title: string;
  helper?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  options: readonly string[];
};

type ContactDetails = {
  email: string;
  firstName: string;
  lastName: string;
  agencyName: string;
  website: string;
  phone: string;
  state: string;
  referral: string;
};

type Phase = "intro" | "questions" | "contact" | "success";

export type DemoAttribution = {
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

export function DemoExperienceRoute() {
  const searchParams = useSearchParams();
  const attribution: DemoAttribution = {
    source: searchParams.get("source") ?? undefined,
    utmSource: searchParams.get("utm_source") ?? undefined,
    utmMedium: searchParams.get("utm_medium") ?? undefined,
    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    utmContent: searchParams.get("utm_content") ?? undefined,
    utmTerm: searchParams.get("utm_term") ?? undefined,
  };

  return (
    <DemoExperience
      initialEmail={searchParams.get("email") ?? ""}
      attribution={attribution}
    />
  );
}

const demoSteps: readonly DemoStep[] = [
  {
    key: "role",
    title: "What is your role at the agency?",
    options: [
      "Owner or executive",
      "Administrator or operations leader",
      "Clinical or compliance leader",
      "Scheduler or field coordinator",
      "Other",
    ],
  },
  {
    key: "clientVolume",
    title: "How many clients does your agency serve?",
    options: [
      "Fewer than 50",
      "50 to 149",
      "150 to 499",
      "500 or more",
    ],
  },
  {
    key: "careProgram",
    title: "Which care program best describes your agency?",
    options: [
      "Medicaid personal care",
      "Private pay home care",
      "Home health or private duty nursing",
      "Disability support services",
      "A mix of programs",
    ],
  },
  {
    key: "agencySoftware",
    title: "Which agency management system do you use?",
    helper: "Choose the system your office relies on most.",
    searchable: true,
    searchPlaceholder: "Search for your agency software",
    options: [
      "AxisCare",
      "HHAeXchange",
      "WellSky Personal Care",
      "AlayaCare",
      "CareSmartz360",
      "Axxess",
      "MatrixCare",
      "Sandata",
      "Another system",
      "We do not use one yet",
    ],
  },
  {
    key: "operationalPressure",
    title: "Where does your team lose the most time?",
    options: [
      "Filling open visits",
      "Fixing EVV exceptions",
      "Chasing incomplete notes",
      "Managing credentials and audits",
      "Seeing what needs attention",
    ],
  },
  {
    key: "exceptionProcess",
    title: "How does your team manage exceptions today?",
    options: [
      "Inside one system",
      "Spreadsheets and reports",
      "Email, calls, and messages",
      "A mix of all three",
    ],
  },
  {
    key: "timeline",
    title: "When would you like to improve this workflow?",
    options: [
      "As soon as possible",
      "In the next 3 months",
      "In the next 6 months",
      "I am exploring for now",
    ],
  },
] as const;

const benefits = [
  "See open visits and exceptions in one place",
  "Keep EVV, notes, signatures, and reviews connected",
  "Support field work when the signal drops",
  "Preserve a traceable record of every decision",
] as const;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-[2rem]", direction === "left" && "rotate-180")}
    >
      <path
        d="M5 12h14M13 6l6 6l-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="mt-[0.1rem] size-[1.8rem] shrink-0"
    >
      <path
        d="M3.5 10.4l3.8 3.7L16.5 5.8"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DemoHeader({ progress }: { progress: number }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-[8.4rem] border-b border-stroke-stone/75 bg-background-primary/95 backdrop-blur-md tablet:h-[10rem]">
      <Link
        href="/"
        aria-label="Selmou home"
        className="absolute left-[2rem] top-1/2 flex -translate-y-1/2 items-center gap-[0.8rem] text-text-primary tablet:left-[3.2rem]"
      >
        <BrandMark className="size-[3.2rem] tablet:size-[3.6rem]" />
        <span className="font-heading text-[2.6rem] leading-none tracking-[-0.02em] tablet:text-[3rem]">
          Selmou
        </span>
      </Link>
      <div
        className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-stroke-stone/70"
        aria-hidden="true"
      >
        <div
          className="h-full bg-blue-600 transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${Math.max(0, Math.min(progress, 1)) * 100}%` }}
        />
      </div>
    </header>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className="fixed left-[1.6rem] top-[10rem] z-20 flex size-[4.8rem] items-center justify-center rounded-[1.4rem] bg-white text-text-primary shadow-[0_1px_0_rgba(18,12,8,0.06)] transition-colors hover:bg-surface-quaternary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 tablet:left-[2.4rem] tablet:top-[12.4rem]"
    >
      <ArrowIcon direction="left" />
    </button>
  );
}

function Field({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex min-h-[6.4rem] flex-col justify-center rounded-[1.4rem] border border-stroke-stone bg-white px-[1.6rem] py-[1rem] transition-[border-color,box-shadow] focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_rgba(66,181,220,0.18)]",
        className,
      )}
    >
      <span className="mb-[0.3rem] font-mono text-[1rem] uppercase tracking-[0.08em] text-text-secondary">
        {label}
      </span>
      {children}
    </label>
  );
}

function createMailto(
  details: ContactDetails,
  answers: Answers,
  attribution: DemoAttribution,
) {
  const lines = [
    "Hello Selmou team,",
    "",
    "I would like to request a tailored walkthrough.",
    "",
    `Name: ${details.firstName} ${details.lastName}`,
    `Email: ${details.email}`,
    `Agency: ${details.agencyName}`,
    `Website: ${details.website || "Not provided"}`,
    `Phone: ${details.phone}`,
    `State: ${details.state || "Not provided"}`,
    `Role: ${answers.role || "Not provided"}`,
    `Clients served: ${answers.clientVolume || "Not provided"}`,
    `Care program: ${answers.careProgram || "Not provided"}`,
    `Agency software: ${answers.agencySoftware || "Not provided"}`,
    `Biggest operational pressure: ${answers.operationalPressure || "Not provided"}`,
    `Current exception process: ${answers.exceptionProcess || "Not provided"}`,
    `Timeline: ${answers.timeline || "Not provided"}`,
    `How they heard about Selmou: ${details.referral || "Not provided"}`,
    `Source: ${attribution.source || attribution.utmSource || "Direct"}`,
  ];

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Selmou walkthrough request from ${details.agencyName}`,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export default function DemoExperience({
  initialEmail = "",
  attribution = {},
}: {
  initialEmail?: string;
  attribution?: DemoAttribution;
}) {
  const safeInitialEmail = EMAIL_PATTERN.test(initialEmail) ? initialEmail : "";
  const [phase, setPhase] = useState<Phase>(
    safeInitialEmail ? "questions" : "intro",
  );
  const [email, setEmail] = useState(safeInitialEmail);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [search, setSearch] = useState("");
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [details, setDetails] = useState<ContactDetails>({
    email: safeInitialEmail,
    firstName: "",
    lastName: "",
    agencyName: "",
    website: "",
    phone: "",
    state: "",
    referral: "",
  });
  const introEmailId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const advanceTimerRef = useRef<number | null>(null);

  const currentStep = demoSteps[stepIndex];
  const totalProgressSteps = demoSteps.length + 1;
  const progress =
    phase === "questions"
      ? (stepIndex + 1) / totalProgressSteps
      : phase === "contact"
        ? 1
        : phase === "success"
          ? 1
          : 0;

  const filteredOptions = useMemo(() => {
    if (!currentStep.searchable || !search.trim()) return currentStep.options;
    const query = search.trim().toLocaleLowerCase();
    return currentStep.options.filter((option) =>
      option.toLocaleLowerCase().includes(query),
    );
  }, [currentStep, search]);

  useEffect(() => {
    if (phase === "questions" || phase === "contact") {
      headingRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [phase, stepIndex]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    };
  }, []);

  function beginQuestions(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!EMAIL_PATTERN.test(cleanEmail)) return;
    setEmail(cleanEmail);
    setDetails((current) => ({ ...current, email: cleanEmail }));
    window.history.replaceState({}, "", "/book-a-demo");
    setPhase("questions");
  }

  function selectAnswer(value: string) {
    if (isAdvancing) return;
    setAnswers((current) => ({ ...current, [currentStep.key]: value }));
    setIsAdvancing(true);
    advanceTimerRef.current = window.setTimeout(() => {
      setSearch("");
      if (stepIndex === demoSteps.length - 1) {
        setPhase("contact");
      } else {
        setStepIndex((current) => current + 1);
      }
      setIsAdvancing(false);
    }, 180);
  }

  function goBack() {
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    setIsAdvancing(false);
    setSearch("");
    if (phase === "contact") {
      setStepIndex(demoSteps.length - 1);
      setPhase("questions");
      return;
    }
    if (stepIndex > 0) {
      setStepIndex((current) => current - 1);
      return;
    }
    setPhase("intro");
  }

  function updateDetail(field: keyof ContactDetails, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details, answers, attribution }),
      });

      if (!response.ok) {
        throw new Error("We could not send your request.");
      }
      setPhase("success");
    } catch {
      setFormError(
        "We could not send your request. Please try again or email the founders directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (phase === "intro") {
    return (
      <div className="min-h-svh bg-background-primary">
        <DemoHeader progress={0} />
        <main
          id="main-content"
          className="mx-auto grid min-h-svh w-full max-w-[180rem] items-center gap-[4rem] px-[2rem] pb-[4rem] pt-[12.4rem] tablet:grid-cols-2 tablet:px-[3.2rem] tablet:pb-[3.2rem] tablet:pt-[13.2rem]"
        >
          <section className="mx-auto flex w-full max-w-[64rem] flex-col items-center text-center tablet:px-[3rem]">
            <p className="font-mono text-[1.1rem] uppercase tracking-[0.12em] text-text-secondary">
              A walkthrough shaped around your agency
            </p>
            <h1 className="mt-[2.4rem] text-heading-lg">
              See your agency
              <br />
              before the scramble
              <br />
              begins
            </h1>
            <p className="mt-[2.4rem] max-w-[48rem] text-body-lg leading-[1.45] text-text-secondary">
              Answer a few quick questions and we will shape the walkthrough
              around the work your team handles every day.
            </p>
            <form
              onSubmit={beginQuestions}
              className="mt-[3.2rem] flex w-full max-w-[46rem] flex-col gap-[1rem] sm:flex-row sm:rounded-[1.6rem] sm:border sm:border-stroke-stone sm:bg-white sm:p-[0.6rem]"
            >
              <label htmlFor={introEmailId} className="sr-only">
                Work email
              </label>
              <input
                id={introEmailId}
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your work email"
                className="h-[5.2rem] min-w-0 flex-1 rounded-[1.4rem] border border-stroke-stone bg-white px-[1.6rem] text-[1.6rem] outline-none placeholder:text-text-secondary focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(66,181,220,0.18)] sm:border-0 sm:bg-transparent sm:focus:shadow-none"
              />
              <button
                type="submit"
                disabled={!EMAIL_PATTERN.test(email.trim())}
                className="flex h-[5.2rem] shrink-0 items-center justify-center gap-[0.8rem] rounded-[1.2rem] bg-surface-tertiary px-[2rem] text-body-sm text-white transition-[background-color,transform] enabled:hover:bg-surface-pressed enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-grey-100 disabled:text-text-secondary"
              >
                Book a demo
                <ArrowIcon />
              </button>
            </form>
            <p className="mt-[1.6rem] text-body-sm text-text-secondary">
              Prefer to write?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline decoration-stroke-stone underline-offset-4 hover:text-text-primary"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-[2.4rem] tablet:h-full tablet:max-h-[calc(100svh-16.4rem)] tablet:min-h-[58rem] tablet:rounded-[4rem] desktop:rounded-[6.4rem]">
            <Image
              src="/images/demo/kwon.png"
              alt="Care professional standing beside a redwood tree"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-[1.6rem] bottom-[1.6rem] flex flex-col items-end gap-[0.8rem] tablet:inset-x-[3rem] tablet:bottom-[3rem]">
              {["Today’s risks, surfaced", "Every visit, traceable", "People stay in charge"].map(
                (label, index) => (
                  <span
                    key={label}
                    className={cn(
                      "demo-transparent-pill rounded-[1rem] px-[1.6rem] py-[1.2rem] text-body-sm text-white backdrop-blur-md",
                      index === 1 && "mr-[7%]",
                    )}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "questions") {
    const selectedValue = answers[currentStep.key];
    const columns = currentStep.searchable;

    return (
      <div className="min-h-svh bg-background-primary">
        <DemoHeader progress={progress} />
        <BackButton onClick={goBack} />
        <main
          id="main-content"
          className="flex min-h-svh items-start justify-center px-[2rem] pb-[7rem] pt-[16rem] tablet:items-center tablet:px-[3.2rem] tablet:pb-[9rem] tablet:pt-[15rem]"
        >
          <section className="w-full max-w-[68rem]">
            <p className="mb-[1.8rem] text-center font-mono text-[1rem] uppercase tracking-[0.12em] text-text-secondary">
              Question {stepIndex + 1} of {demoSteps.length}
            </p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="mx-auto max-w-[76rem] text-center text-heading-md outline-none"
            >
              {currentStep.title}
            </h1>
            {currentStep.helper ? (
              <p className="mt-[1.4rem] text-center text-body-md text-text-secondary">
                {currentStep.helper}
              </p>
            ) : null}

            {currentStep.searchable ? (
              <div className="relative mt-[3.2rem]">
                <label htmlFor="software-search" className="sr-only">
                  Search agency software
                </label>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[1.8rem] top-1/2 size-[2rem] -translate-y-1/2 text-text-secondary"
                >
                  <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input
                  id="software-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={currentStep.searchPlaceholder}
                  autoFocus
                  className="h-[6.2rem] w-full rounded-[1.4rem] border border-stroke-stone bg-white pl-[5.2rem] pr-[1.8rem] text-[1.6rem] outline-none placeholder:text-text-secondary focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(66,181,220,0.18)]"
                />
              </div>
            ) : null}

            <div
              className={cn(
                "mt-[3.2rem] grid gap-[1rem]",
                columns && "tablet:grid-cols-2",
              )}
            >
              {filteredOptions.map((option) => {
                const isSelected = selectedValue === option;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isAdvancing}
                    aria-pressed={isSelected}
                    onClick={() => selectAnswer(option)}
                    className={cn(
                      "group flex min-h-[6.8rem] w-full items-center justify-between rounded-[1.4rem] border bg-white px-[1.8rem] py-[1.4rem] text-left text-[1.6rem] transition-[border-color,background-color,box-shadow,transform] hover:border-text-primary hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-[0.995] disabled:cursor-default tablet:min-h-[7.4rem] tablet:px-[2.2rem]",
                      isSelected
                        ? "border-blue-500 bg-blue-100 shadow-[0_0_0_2px_rgba(66,181,220,0.12)]"
                        : "border-stroke-stone",
                    )}
                  >
                    <span>{option}</span>
                    <span
                      className={cn(
                        "flex size-[2.4rem] shrink-0 items-center justify-center rounded-full border transition-colors",
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-stroke-stone text-transparent group-hover:border-text-primary",
                      )}
                      aria-hidden="true"
                    >
                      <CheckIcon />
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredOptions.length === 0 ? (
              <button
                type="button"
                onClick={() => selectAnswer(search.trim())}
                className="mt-[1rem] flex min-h-[6.8rem] w-full items-center justify-between rounded-[1.4rem] border border-stroke-stone bg-white px-[1.8rem] py-[1.4rem] text-left text-[1.6rem] hover:border-text-primary tablet:px-[2.2rem]"
              >
                <span>Use “{search.trim()}”</span>
                <ArrowIcon />
              </button>
            ) : null}
          </section>
        </main>
      </div>
    );
  }

  if (phase === "contact") {
    const selectedPressure = answers.operationalPressure;
    const pressure = selectedPressure
      ? `${selectedPressure.charAt(0).toLocaleLowerCase()}${selectedPressure.slice(1)}`
      : "";

    return (
      <div className="min-h-svh bg-background-primary">
        <DemoHeader progress={1} />
        <BackButton onClick={goBack} />
        <main
          id="main-content"
          className="mx-auto grid min-h-svh w-full max-w-[120rem] gap-[6rem] px-[2rem] pb-[7rem] pt-[16rem] tablet:grid-cols-[1.08fr_0.92fr] tablet:items-center tablet:px-[4rem] tablet:pb-[8rem] tablet:pt-[14rem] desktop:gap-[7rem] desktop:px-0"
        >
          <section>
            <p className="font-mono text-[1rem] uppercase tracking-[0.12em] text-text-secondary">
              Your tailored walkthrough
            </p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="mt-[1.8rem] max-w-[60rem] text-heading-lg outline-none"
            >
              You might be a strong fit for Selmou.
            </h1>
            <p className="mt-[2rem] max-w-[57rem] text-body-md text-text-secondary">
              {pressure
                ? `Tell us where to reach you and we will focus the conversation on ${pressure}.`
                : "Tell us where to reach you and we will shape the conversation around your agency."}
            </p>

            <form onSubmit={submitRequest} className="mt-[3.2rem] grid gap-[1rem] sm:grid-cols-2">
              <Field id="demo-email" label="Work email" className="sm:col-span-2">
                <input
                  id="demo-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={details.email}
                  onChange={(event) => updateDetail("email", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>
              <Field id="first-name" label="First name">
                <input
                  id="first-name"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  value={details.firstName}
                  onChange={(event) => updateDetail("firstName", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>
              <Field id="last-name" label="Last name">
                <input
                  id="last-name"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  value={details.lastName}
                  onChange={(event) => updateDetail("lastName", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>
              <Field id="agency-name" label="Agency name" className="sm:col-span-2">
                <input
                  id="agency-name"
                  name="agencyName"
                  required
                  autoComplete="organization"
                  value={details.agencyName}
                  onChange={(event) => updateDetail("agencyName", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>
              <Field id="website" label="Website">
                <input
                  id="website"
                  name="website"
                  inputMode="url"
                  autoComplete="url"
                  value={details.website}
                  onChange={(event) => updateDetail("website", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>
              <Field id="phone" label="Phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(event) => updateDetail("phone", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>
              <Field id="state" label="Primary state">
                <input
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  value={details.state}
                  onChange={(event) => updateDetail("state", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>
              <Field id="referral" label="How did you hear about us?">
                <input
                  id="referral"
                  name="referral"
                  value={details.referral}
                  onChange={(event) => updateDetail("referral", event.target.value)}
                  className="w-full bg-transparent text-[1.6rem] outline-none"
                />
              </Field>

              {formError ? (
                <p
                  className="sm:col-span-2 text-center text-body-sm leading-[1.6] text-red-700"
                  role="alert"
                >
                  {formError}{" "}
                  <a
                    href={createMailto(details, answers, attribution)}
                    className="underline underline-offset-4"
                  >
                    Email {CONTACT_EMAIL}
                  </a>
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-[0.8rem] flex h-[5.6rem] items-center justify-center gap-[0.8rem] rounded-[1.4rem] bg-surface-tertiary px-[2rem] text-body-md text-white transition-[background-color,transform] hover:bg-surface-pressed active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
              >
                {isSubmitting ? "Sending your request" : "Request my walkthrough"}
                {!isSubmitting ? <ArrowIcon /> : null}
              </button>
              <p className="sm:col-span-2 text-center text-[1.2rem] leading-[1.5] text-text-secondary">
                Please do not include client information. By submitting, you agree
                that Selmou may contact you about your request.
              </p>
            </form>
          </section>

          <aside className="self-center">
            <div className="flex items-center gap-[1.2rem] text-body-sm text-text-secondary">
              <BrandMark className="size-[3.2rem]" />
              Built for the people behind every visit
            </div>
            <div className="mt-[2.4rem] rounded-[2.4rem] bg-white p-[2.8rem] tablet:p-[3.6rem]">
              <p className="font-mono text-[1rem] uppercase tracking-[0.12em] text-text-secondary">
                Product principle
              </p>
              <blockquote className="mt-[2rem] font-heading text-[3rem] leading-[1.08] tracking-[-0.01em] tablet:text-[3.6rem]">
                “One scheduled visit. One complete record. Every exception has an owner.”
              </blockquote>
              <p className="mt-[2.4rem] text-body-sm text-text-secondary">
                The Selmou operating model
              </p>
            </div>
            <div className="mt-[3.2rem]">
              <p className="text-body-sm text-text-secondary">
                What the walkthrough can cover
              </p>
              <ul className="mt-[1.6rem] grid gap-[1.2rem]">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-[1rem] text-body-sm text-text-secondary"
                  >
                    <CheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-[3.2rem] text-body-sm text-text-secondary">
              Have a question first?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline decoration-stroke-stone underline-offset-4 hover:text-text-primary"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </aside>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background-primary">
      <main
        id="main-content"
        className="mx-auto flex min-h-svh max-w-[64rem] flex-col items-center px-[2.4rem] pb-[8rem] pt-[14rem] text-center tablet:pt-[15rem]"
      >
        <Link
          href="/"
          aria-label="Selmou home"
          className="flex items-center gap-[1.2rem] text-text-primary"
        >
          <BrandMark className="size-[5.6rem] tablet:size-[6.4rem]" />
          <span className="font-heading text-[4.8rem] leading-none tracking-[-0.02em] tablet:text-[5.6rem]">
            Selmou
          </span>
        </Link>

        <h1 className="mt-[2.4rem] font-heading text-[3.6rem] font-semibold leading-[1.05] tracking-[-0.01em] text-[#243248] tablet:text-[4rem]">
          You&rsquo;re on the list!
        </h1>

        <div className="mt-[3.4rem] max-w-[54rem] space-y-[3rem] text-[1.8rem] leading-[1.55] text-[#31425c] tablet:text-[2rem]">
          <p>
            We&rsquo;re excited to learn more about {details.agencyName || "your agency"}
            and show you what a calmer operating day can look like.
          </p>
          <p>
            We work closely with a select number of agencies at a time. We&rsquo;ll
            review your request and reach out from {CONTACT_EMAIL} as soon as
            we&rsquo;re ready to make the walkthrough useful for your team.
          </p>
        </div>

        <p className="mt-[3.2rem] text-body-sm text-text-secondary">
          We&rsquo;ll follow up at {details.email}.
        </p>
      </main>
    </div>
  );
}
