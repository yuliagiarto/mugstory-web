import { useEffect, useState } from "react";

export const useContainerSize = (selector: string) => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  function handleResize() {
    // Set window width/height to state
    let container = document.querySelector(selector);
    setContainerSize({
      width: container!.clientWidth ?? 0,
      height: container!.clientHeight ?? 0,
    });
  }

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Handler to call on window resize

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return containerSize;
};
