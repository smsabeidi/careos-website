type DemoRequestBody = {
  details?: Record<string, unknown>;
  answers?: Record<string, unknown>;
  attribution?: Record<string, unknown>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "founders@selmou.com";
const REQUIRED_ANSWERS = [
  "role",
  "clientVolume",
  "careProgram",
  "agencySoftware",
  "operationalPressure",
  "exceptionProcess",
  "timeline",
] as const;

const DETAIL_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Work email",
  agencyName: "Agency name",
  website: "Website",
  phone: "Phone",
  state: "Primary state",
  referral: "How they heard about Selmou",
};

const ANSWER_LABELS: Record<string, string> = {
  role: "Role",
  clientVolume: "Clients served",
  careProgram: "Care program",
  agencySoftware: "Agency software",
  operationalPressure: "Biggest operational pressure",
  exceptionProcess: "Current exception process",
  timeline: "Timeline",
};

const ATTRIBUTION_LABELS: Record<string, string> = {
  source: "Source",
  utmSource: "UTM source",
  utmMedium: "UTM medium",
  utmCampaign: "UTM campaign",
  utmContent: "UTM content",
  utmTerm: "UTM term",
};

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function rows(
  values: Record<string, unknown>,
  labels: Record<string, string>,
) {
  return Object.entries(labels).map(([key, label]) => ({
    label,
    value: stringValue(values[key]) || "Not provided",
  }));
}

export async function POST(request: Request) {
  let body: DemoRequestBody;

  try {
    body = (await request.json()) as DemoRequestBody;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const details = body.details ?? {};
  const answers = body.answers ?? {};
  const attribution = body.attribution ?? {};
  const email = stringValue(details.email);
  const firstName = stringValue(details.firstName);
  const lastName = stringValue(details.lastName);
  const agencyName = stringValue(details.agencyName);
  const phone = stringValue(details.phone);
  const requiredAnswersPresent = REQUIRED_ANSWERS.every((key) =>
    Boolean(stringValue(answers[key])),
  );

  if (
    !EMAIL_PATTERN.test(email) ||
    !firstName ||
    !lastName ||
    !agencyName ||
    !phone ||
    !requiredAnswersPresent
  ) {
    return Response.json(
      { error: "Required contact details are missing" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.DEMO_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return Response.json(
      { error: "Email delivery is not configured" },
      { status: 503 },
    );
  }

  const contactRows = rows(details, DETAIL_LABELS);
  const answerRows = rows(answers, ANSWER_LABELS);
  const attributionRows = rows(attribution, ATTRIBUTION_LABELS);
  const allRows = [...contactRows, ...answerRows, ...attributionRows];
  const text = [
    "New Selmou demo request",
    "",
    ...allRows.map(({ label, value }) => `${label}: ${value}`),
  ].join("\n");
  const tableRows = allRows
    .map(
      ({ label, value }) =>
        `<tr><th align="left" style="padding:10px 16px;border-bottom:1px solid #e3ddcf;color:#666;font-weight:500;vertical-align:top">${escapeHtml(label)}</th><td style="padding:10px 16px;border-bottom:1px solid #e3ddcf;color:#1a1613">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const html = `<!doctype html><html><body style="margin:0;background:#f9f8f5;font-family:Arial,sans-serif;color:#1a1613"><div style="max-width:720px;margin:0 auto;padding:40px 20px"><div style="background:#fff;border-radius:20px;overflow:hidden"><div style="padding:28px 32px;background:#120c08;color:#fff"><p style="margin:0 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.7">Selmou</p><h1 style="margin:0;font-size:28px;font-weight:500">New demo request</h1></div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px">${tableRows}</table></div><p style="margin:20px 0 0;color:#666;font-size:12px">Reply to this email to contact ${escapeHtml(firstName)} at ${escapeHtml(email)}.</p></div></body></html>`;
  const idempotencySource = JSON.stringify({ details, answers, attribution });
  const idempotencyDigest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(idempotencySource),
  );
  const idempotencyKey = `demo-${Array.from(new Uint8Array(idempotencyDigest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Demo request: ${agencyName}`,
        text,
        html,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Demo request email delivery failed", response.status);
      return Response.json({ error: "Email delivery failed" }, { status: 502 });
    }
  } catch {
    return Response.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
