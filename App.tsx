
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import SubjectPage from './pages/SubjectPage';
import { SUBJECTS } from './constants';
import type { Subject } from './types';

const App: React.FC = () => {
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    // Smooth scroll to top with a slight delay to allow page transition
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    // Small delay to ensure the page transition animation doesn't conflict
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 font-sans antialiased relative overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Scroll Management */}
      <ScrollToTop />
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))]"></div>
      
      <Navbar />

      <main className="pt-20 px-4 pb-8 md:pt-8 md:pl-72 md:pr-8 md:pb-8 relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            {SUBJECTS.map((subject: Subject) => (
              <Route
                key={subject.path}
                path={subject.path}
                element={<SubjectPage title={subject.name} subSections={subject.subSubjects} isHubPage={!!subject.subSubjects} marks={subject.marks} icon={subject.icon} />}
              />
            ))}
            {/* Add routes for sub-subjects */}
            {SUBJECTS.filter(s => s.subSubjects).flatMap(s => s.subSubjects!.map(sub => (
              <Route
                key={sub.path}
                path={sub.path}
                element={<SubjectPage title={sub.name} marks={sub.marks} icon={sub.icon} />}
              />
            )))}
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
