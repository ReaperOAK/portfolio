import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Simple typing animation for an array of roles
export default function TypingRoles({ roles, typingSpeed = 80, pause = 1200, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentRole = roles[roleIdx];

    if (!deleting && charIdx < currentRole.length) {
      timeout = setTimeout(() => setCharIdx(charIdx + 1), typingSpeed);
    } else if (!deleting && charIdx === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(charIdx - 1), typingSpeed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    setDisplayed(currentRole.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles, typingSpeed, pause]);

  return (
    <span className={`inline-block font-mono text-primary ${className}`} aria-live="polite">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

TypingRoles.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingSpeed: PropTypes.number,
  pause: PropTypes.number,
  className: PropTypes.string,
};
