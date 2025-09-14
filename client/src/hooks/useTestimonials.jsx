import { useEffect, useRef, useState } from 'react';
import reviews from '../data/review';

export default function useTestimonials({ interval = 2000, resumeAfter = 8000 } = {}) {
  const reviewsList = Array.isArray(reviews) && reviews.length > 0 ? reviews : [
    {
      quote: `Working with Owais was like having a tech wizard on our team. The combination of technical expertise and creative vision brought our project to life beyond our expectations.`,
      name: 'Sarah Chen',
      title: 'Startup Founder'
    }
  ];

  const [current, setCurrent] = useState(0);
  const rotateRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  const start = () => {
    clearInterval(rotateRef.current);
    rotateRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % reviewsList.length);
    }, interval);
  };

  const stop = () => {
    clearInterval(rotateRef.current);
    rotateRef.current = null;
  };

  useEffect(() => {
    start();
    return () => {
      stop();
      clearTimeout(pauseTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewsList.length, interval]);

  const scheduleResume = () => {
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      start();
    }, resumeAfter);
  };

  const prev = () => {
    stop();
    setCurrent((i) => (i - 1 + reviewsList.length) % reviewsList.length);
    scheduleResume();
  };

  const next = () => {
    stop();
    setCurrent((i) => (i + 1) % reviewsList.length);
    scheduleResume();
  };

  const goTo = (index) => {
    if (typeof index !== 'number') return;
    stop();
    setCurrent(() => ((index % reviewsList.length) + reviewsList.length) % reviewsList.length);
    scheduleResume();
  };

  return { reviewsList, current, setCurrent, prev, next, goTo };
}
