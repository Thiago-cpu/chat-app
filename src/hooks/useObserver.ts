import { useEffect, useRef, useState } from "react";

interface Props {
  onObserved: () => void;
}

function useObserver({ onObserved }: Props) {
  const ref = useRef(null);
  const [isNearScreen, setIsNearScreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsNearScreen(true);
        if (node) {
          onObserved();
        }
        observer.disconnect();
      }
    });

    if (node) {
      observer.observe(node);
    }

    return () => observer && observer.disconnect();
  }, [isNearScreen, onObserved]);

  return { ref, isNearScreen };
}

export default useObserver;
