
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBJECTS } from '../constants';
import type { Subject } from '../types';

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);


const NavItem: React.FC<{ subject: Subject, onClick: () => void }> = ({ subject, onClick }) => {
  const location = useLocation();
  const hasSubSubjects = subject.subSubjects && subject.subSubjects.length > 0;
  const isParentOrChildActive = location.pathname.startsWith(subject.path);
  const Icon = subject.icon;

  const [isOpen, setIsOpen] = useState(isParentOrChildActive);

  useEffect(() => {
    setIsOpen(isParentOrChildActive);
  }, [isParentOrChildActive]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/10'
    }`;

  if (!hasSubSubjects) {
    return (
      <NavLink to={subject.path} className={navLinkClass} onClick={onClick}>
        {Icon && <Icon className="w-5 h-5 shrink-0" />}
        <span>{subject.name}</span>
      </NavLink>
    );
  }

  return (
    <div>
      <div className={`flex items-center rounded-lg transition-colors duration-200 ${isParentOrChildActive ? 'bg-white/10' : 'hover:bg-white/10'}`}>
        <NavLink
          to={subject.path}
          onClick={onClick}
          className="flex-grow flex items-center gap-3 px-4 py-3 text-sm font-medium text-left"
        >
          {Icon && <Icon className="w-5 h-5 shrink-0" />}
          <span className={isParentOrChildActive ? 'text-white' : 'text-gray-200'}>
            {subject.name}
          </span>
        </NavLink>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 ${isParentOrChildActive ? 'text-white' : 'text-gray-200'}`}
          aria-expanded={isOpen}
          aria-label={`Toggle ${subject.name} sub-menu`}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDownIcon />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-8"
          >
            {subject.subSubjects!.map(sub => {
              const SubIcon = sub.icon;
              return (
              <NavLink key={sub.name} to={sub.path} onClick={onClick} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-300'} hover:text-white hover:bg-white/5`}>
                <span className="text-gray-600">&bull;</span>
                {SubIcon && <SubIcon className="w-4 h-4 shrink-0" />}
                <span>{sub.name}</span>
              </NavLink>
            )})}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const closeMobileMenu = () => setMobileMenuOpen(false);
    
    // Close mobile menu when location changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const navContent = (
      <div className="flex flex-col h-full p-4">
        <div className="text-center mb-8 shrink-0">
          <NavLink to="/" onClick={closeMobileMenu}>
            <h1 className="text-2xl font-bold text-white tracking-wider">Navdeesh</h1>
            <p className="text-sm text-gray-400">Class 9 Portfolio</p>
          </NavLink>
        </div>
        <nav className="flex-grow space-y-2">
          <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors duration-200 ${isActive ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/10'}`} onClick={closeMobileMenu}>
            <HomeIcon />
            <span>Home</span>
          </NavLink>
          <hr className="border-gray-700" />
          {SUBJECTS.map((subject) => (
            <NavItem key={subject.path} subject={subject} onClick={closeMobileMenu} />
          ))}
        </nav>
      </div>
    );
    
    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block fixed top-0 left-0 w-64 h-screen bg-black/50 backdrop-blur-lg border-r border-white/10 z-30">
                {navContent}
            </aside>

            {/* Mobile Top Bar */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-lg border-b border-white/10 z-40 flex items-center justify-between px-4">
                 <NavLink to="/" className="text-lg sm:text-xl font-bold text-white hover:text-gray-300 transition-colors" onClick={closeMobileMenu}>Navdeesh</NavLink>
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                    className="p-2 rounded-md text-gray-200 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                    aria-expanded={mobileMenuOpen}
                    aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden fixed top-0 left-0 w-full h-full bg-black/90 backdrop-blur-xl z-30 pt-16"
                    >
                        {navContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
