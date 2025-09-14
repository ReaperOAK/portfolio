import React from 'react';

export default function Testimonial({ review, accent }) {
  if (!review) return null;

  return (
    <div aria-live="polite" className="min-h-[88px]">
      <p className="text-lg italic mb-4">{`"${review.quote}"`}</p>
      <div className="flex items-center justify-center space-x-3">
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold" style={{ backgroundColor: accent }} aria-hidden>
          {review.name ? review.name.charAt(0) : '•'}
        </div>
        <div className="text-left">
          <div className="font-semibold">{review.name}</div>
          <div className="text-sm opacity-70">{review.title}</div>
        </div>
      </div>
    </div>
  );
}
