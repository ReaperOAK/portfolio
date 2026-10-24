import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * ScrollFadeWrapper
 * Wraps a vertically scrollable area and shows subtle top/bottom fades
 * to indicate more content. Provides an optional stickyHeader slot.
 */
export default function ScrollFadeWrapper({ children, className = '', ariaLabel, stickyHeader = null }) {
  const scrollerRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    // small epsilon to avoid jitter
    const atTop = scrollTop <= 4;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 4;
    setShowTop(!atTop);
    setShowBottom(!atBottom && scrollHeight > clientHeight + 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Initial check
    checkScroll();

    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        checkScroll();
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    // Re-check on resize (e.g., viewport change)
    window.addEventListener('resize', checkScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  return (
  <div className={`relative ${className}`}>
      {/* top fade */}
      <div aria-hidden className={`fade-top ${showTop ? 'visible' : ''}`} />

      {/* scrollable area */}
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel || 'Scrollable content'}
        className={`scroll-area overflow-y-auto focus:outline-none h-full flex-1 min-h-0`}
        tabIndex={0}
      >
        {stickyHeader ? <div className="sticky-subheader">{stickyHeader}</div> : null}
        {children}
      </div>

      {/* bottom fade */}
      <div aria-hidden className={`fade-bottom ${showBottom ? 'visible' : ''}`} />
    </div>
  );
}

ScrollFadeWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  stickyHeader: PropTypes.node,
};
