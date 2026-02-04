"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  threshold = 0.1,
  rootMargin = "100px",
}: UseInfiniteScrollOptions) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isIntersecting) {
        setIsIntersecting(true);
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, isIntersecting]
  );

  useEffect(() => {
    const target = triggerRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(target);

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(target);
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold, rootMargin]);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => setIsIntersecting(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting]);

  return {
    triggerRef,
    isIntersecting,
  };
}
