export declare function useMeasuremysite(): {
  /** Sends a custom event, e.g. track("signup") or track("purchase", { plan: "pro" }). */
  track(name: string, props?: Record<string, string | number | boolean>): void;
};
