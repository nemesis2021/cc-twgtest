import { useRef, useEffect, useState } from 'react';

export default function useResizeObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const updateSize = () => {
    if (ref.current) {
      setClientHeight(ref.current.clientHeight);
      setClientWidth(ref.current.clientWidth);
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
  }, []);

  return { ref, clientHeight, clientWidth, rect };
}
