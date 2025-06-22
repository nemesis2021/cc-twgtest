import { useRef, useEffect, useState } from 'react';

interface OptionProps {
  forceUpdate?: boolean;
}

export default function useBoundingClientRect(options?: OptionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const updateSize = () => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  };

  useEffect(() => {
    const { current } = ref;

    // Run once to set initial size
    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    if (current) observer.observe(current);

    // Also listen for window resize events
    window.addEventListener('resize', updateSize);

    return () => {
      if (current) observer.unobserve(current);
      window.removeEventListener('resize', updateSize);
    };
  }, [options?.forceUpdate]);

  return { ref, rect };
}
