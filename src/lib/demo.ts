const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function createDemoRequestHref({
  email,
  source,
  search = "",
}: {
  email: string;
  source: string;
  search?: string;
}) {
  const params = new URLSearchParams({ email: email.trim(), source });
  const campaignParams = new URLSearchParams(search);

  CAMPAIGN_KEYS.forEach((key) => {
    const value = campaignParams.get(key);
    if (value) params.set(key, value);
  });

  return `/book-a-demo?${params.toString()}`;
}
