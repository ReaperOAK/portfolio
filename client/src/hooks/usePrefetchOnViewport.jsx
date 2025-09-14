import { useEffect } from 'react';

/**
 * usePrefetchOnViewport
 * - Observes a ref/element and calls the provided prefetch function once the
 *   element is within the specified rootMargin.
 * - Designed to warm up lazy-loaded chunks when they are near the viewport.
 *
 * @param {React.RefObject|HTMLElement} targetRefOrElement - ref to observe or element
 * @param {() => Promise<any>} prefetchFn - function that triggers the dynamic import
 * @param {string} rootMargin - IntersectionObserver rootMargin (default: '200px')
 */
export default function usePrefetchOnViewport(targetRefOrElement, prefetchFn, rootMargin = '200px') {
  useEffect(() => {
    if (!prefetchFn) return;

    let observed = null;
    let cancelled = false;

    const element = targetRefOrElement && 'current' in targetRefOrElement ? targetRefOrElement.current : targetRefOrElement;
    if (!element) return; // nothing to observe

    // If IntersectionObserver is not available, prefetch immediately as a best-effort
    if (typeof IntersectionObserver === 'undefined') {
      prefetchFn();
      return;
    }

    const schedulePrefetch = () => {
      // Use requestIdleCallback when available so prefetch happens at low priority
      const doImport = () => prefetchFn().catch(() => {});
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => doImport(), { timeout: 2000 });
      } else {
        // fallback to setTimeout so it doesn't block immediate rendering
        setTimeout(() => doImport(), 1500);
      }
    };

    const onIntersect = (entries, obs) => {
      entries.forEach((entry) => {
        if ((entry.isIntersecting || entry.intersectionRatio > 0) && !cancelled) {
          // Schedule a low-priority prefetch
          schedulePrefetch();
          // Stop observing after scheduling prefetch
          if (observed) obs.unobserve(observed);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, { root: null, rootMargin });
    observed = element;
    observer.observe(element);

    return () => {
      cancelled = true;
      try {
        if (observed) observer.unobserve(observed);
        observer.disconnect();
      } catch (e) {
        // ignore
      }
    };
  }, [targetRefOrElement, prefetchFn, rootMargin]);
}
