import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VisitorSelector from './components/VisitorSelector';
import { useVisitor } from './contexts/VisitorContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

function App() {
  const { visitorType } = useVisitor();
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    if (!visitorType) setShowSelector(true);
  }, [visitorType]);

  return (
    <>
      {/* Render the selector as an overlay so the main content remains in the DOM for crawlers/SEO */}
      <VisitorSelector open={showSelector} onClose={() => setShowSelector(false)} />
      <Router>
        {/* Keep main content mounted so crawlers can index it. When selector is open, mark the main area as aria-hidden and use inert attribute for assistive tech and focus management (inert polyfill recommended for broad support). */}
        <div
          className="min-h-screen flex flex-col"
          aria-hidden={showSelector ? 'true' : 'false'}
          // inert is widely supported in modern browsers but may need a polyfill: https://github.com/WICG/inert
          inert={showSelector ? '' : undefined}
        >
          {!showSelector && <Navbar />}
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project/:slug" element={<ProjectDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
