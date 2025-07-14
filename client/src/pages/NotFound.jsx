export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Page not found.</p>
      <a href="/" className="text-blue-400 underline">Go Home</a>
    </div>
  );
}
