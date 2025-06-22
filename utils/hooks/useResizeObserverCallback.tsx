import { useRef, useEffect } from 'react';

interface Props {
  onHeight?: (v: number) => void;
}

export default function useResizeObserverCallback(props: Props) {
  const { onHeight } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;

    const observer = new ResizeObserver((entries) => {
      onHeight?.(entries[0].target.clientHeight);
    });
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return { ref };
}
