// Sends a custom event. Calls made before the tracker has loaded, or during server rendering, are dropped.
export function useMeasuremysite() {
  return {
    track(name, props) {
      if (typeof window !== "undefined" && window.measuremysite) window.measuremysite.track(name, props);
    },
  };
}
