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
      <VisitorSelector open={showSelector} onClose={() => setShowSelector(false)} />
      <Router>
        {/* Hide main content when selector is open */}
        {!showSelector && (
          <>
            <Navbar />
            <div className="min-h-screen flex flex-col">
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
          </>
        )}
      </Router>
    </>
  );
}

export default App;
