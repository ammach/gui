import { useState, useEffect } from "react";

export function useMobileSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidthChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidthChange);
  }, []);

  return width <= 767;
}

export function useTabletSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidthChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidthChange);
  }, []);

  return width >= 768 && width <= 1024;
}

export function useTabletOrMobileSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidthChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidthChange);
  }, []);

  return width <= 1024;
}

export function scrollToTopOfThePage() {
  window.scrollTo(0, 0);
}
