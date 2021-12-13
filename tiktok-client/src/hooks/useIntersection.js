import { useState, useEffect } from "react";

const useIntersection = (element, rootMargin = "0px") => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(entry.isIntersecting);
          observer.unobserve(element.current);
        }
      },
      {
        rootMargin,
      }
    );
    if (element.current) {
      observer.observe(element.current);
    }
    return () => {
      observer.unobserve(element.current);
    };
  }, []);

  return isVisible;
};

export default useIntersection;