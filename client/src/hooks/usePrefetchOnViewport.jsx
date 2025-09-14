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
export default function usePrefetchOnViewport(targetRefOrElement, prefetchFn, rootMargin = '200px', manifestKey) {
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
      // If a manifestKey is provided, try to fetch the Vite manifest and preload the mapped files
      if (manifestKey && typeof window !== 'undefined') {
        // low priority: try to fetch manifest after a short idle
        const tryManifest = () => {
          fetch('/manifest.json').then((r) => r.json()).then((m) => {
            const entry = m[manifestKey];
            if (!entry) return;
            const files = [entry.file].concat(entry.css || [], entry.assets || []);
            files.forEach((f) => {
              try {
                const href = '/' + f.replace(/^\//, '');
                if (!document.querySelector(`link[rel="modulepreload"][href="${href}"]`)) {
                  const l = document.createElement('link');
                  l.rel = 'modulepreload';
                  l.href = href;
                  l.crossOrigin = '';
                  document.head.appendChild(l);
                }
              } catch (e) {
                // ignore
              }
            });
          }).catch(()=>{});
        };
        if ('requestIdleCallback' in window) window.requestIdleCallback(tryManifest, { timeout: 3000 }); else setTimeout(tryManifest, 2500);
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
