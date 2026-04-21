// Lightweight consent manager — gates analytics & ads until the visitor opts in.
// GDPR / ePrivacy friendly: no non-essential scripts load before consent.

export type ConsentValue = "granted" | "denied";

export interface ConsentState {
  analytics: ConsentValue;
  ads: ConsentValue;
  timestamp: string;
  version: number;
}

const STORAGE_KEY = "ga-consent-v1";
const CONSENT_VERSION = 1;
const ADSENSE_CLIENT = "ca-pub-1433261757916600";

type Listener = (state: ConsentState | null) => void;
const listeners = new Set<Listener>();

export const getConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const setConsent = (analytics: ConsentValue, ads: ConsentValue) => {
  const state: ConsentState = {
    analytics,
    ads,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage may be blocked */
  }
  listeners.forEach((l) => l(state));
  applyConsent(state);
};

export const clearConsent = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l(null));
};

export const onConsentChange = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// --- Script loaders (no-op until consent is granted) -----------------------

const loadedScripts = new Set<string>();

const injectScript = (src: string, attrs: Record<string, string> = {}) => {
  if (loadedScripts.has(src)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
  loadedScripts.add(src);
};

const loadAdsense = () => {
  injectScript(
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
    { crossorigin: "anonymous" },
  );
};

// Hook for analytics provider once a Measurement ID is configured.
const loadAnalytics = () => {
  // Intentionally a no-op until a real GA4 / Plausible ID is provisioned.
  // Example for the future:
  // injectScript(`https://www.googletagmanager.com/gtag/js?id=G-XXXX`);
};

export const applyConsent = (state: ConsentState | null) => {
  if (!state) return;
  if (state.analytics === "granted") loadAnalytics();
  if (state.ads === "granted") loadAdsense();
};
