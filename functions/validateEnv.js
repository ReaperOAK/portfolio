// Simple runtime check for required server env vars
const required = [
  'NODE_ENV',
  'EMAIL_USER',
  'EMAIL_PASS',
  'MONGODB_URI',
];

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  // eslint-disable-next-line no-console
  console.warn('Missing required environment variables:', missing.join(', '));
}
