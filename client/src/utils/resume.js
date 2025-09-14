// Helpers to resolve resume URLs and detect if we can force a download
// - resolveResumeUrl(url): returns a URL safe to open which may point directly to a PDF
// - canForceDownload(url): returns true if it's safe to add the `download` attribute

export function resolveResumeUrl(url) {
  if (!url || typeof url !== 'string') return url;

  const trimmed = url.trim();

  // Google Docs (edit/view) -> export as PDF
  // Examples:
  // https://docs.google.com/document/d/FILE_ID/edit
  // https://docs.google.com/document/d/FILE_ID/view
  const gdocMatch = trimmed.match(/https?:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (gdocMatch) {
    const id = gdocMatch[1];
    return `https://docs.google.com/document/d/${id}/export?format=pdf`;
  }

  // Google Drive share link -> direct download
  // Examples:
  // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // https://drive.google.com/open?id=FILE_ID
  const driveMatch = trimmed.match(/https?:\/\/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+))/);
  if (driveMatch) {
    const id = driveMatch[1] || driveMatch[2];
    return `https://drive.google.com/uc?export=download&id=${id}`;
  }

  // If it's already a direct link to a PDF, return as-is
  if (/\.pdf(\?.*)?$/i.test(trimmed)) return trimmed;

  // Otherwise return original
  return trimmed;
}

// We can safely set download attribute when URL is same-origin (relative path)
// or already points directly to a .pdf file.
export function canForceDownload(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  // Relative paths or same-origin absolute paths (starts with "/") are downloadable
  if (trimmed.startsWith('/')) return true;
  // Direct PDF links
  if (/\.pdf(\?.*)?$/i.test(trimmed)) return true;
  return false;
}
