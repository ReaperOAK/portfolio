import socials from '../data/socials';

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
      </a>

      <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.452 20.452h-3.555v-5.569c0-1.328-.025-3.038-1.852-3.038-1.853 0-2.136 1.445-2.136 2.939v5.668H9.347V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.269 2.37 4.269 5.451v6.292zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.073 0-1.145.926-2.073 2.07-2.073 1.145 0 2.073.928 2.073 2.073 0 1.145-.928 2.073-2.073 2.073zM7.114 20.452H3.56V9h3.554v11.452z"/></svg>
      </a>

      <a
        href={socials.resume}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open resume in new tab"
        className="ml-2 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-colors"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--foreground, white)',
        }}
        onMouseOver={(e) => {
          // subtle hover darken using inline style to ensure consistency across themes
          e.currentTarget.style.filter = 'brightness(0.95)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.filter = '';
        }}
        onFocus={(e) => {
          // ensure visible focus ring that uses the theme primary color
          e.currentTarget.style.boxShadow = `0 0 0 4px var(--primary)`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0">
          <path d="M12 16V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 20H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Resume</span>
      </a>
    </div>
  );
}
