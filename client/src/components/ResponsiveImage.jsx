import React from 'react';

export default function ResponsiveImage({ src, alt = '', className = '', width, height, ariaHidden = false }) {
  // src is expected to be a root-relative path to a .png (e.g. /logo/reactjs.png or /profile.png)
  if (!src) return null;
  const base = src.replace(/\.png$/i, '');
  const avif = base + '.avif';
  const webp = base + '.webp';

  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} className={className} width={width} height={height} loading="lazy" decoding="async" aria-hidden={ariaHidden} />
    </picture>
  );
}
