import { useEffect, useRef } from "react";

interface Props {
  onObserved: () => void;
}

function useObserver({ onObserved }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        onObserved();
      }
    });

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [onObserved]);

  return ref;
}

export default useObserver;
