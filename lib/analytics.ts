type GaEventParams = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    params?: GaEventParams
  ) => void;
};

export function trackGaEvent(eventName: string, params: GaEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as GtagWindow).gtag;

  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", eventName, params);
}
