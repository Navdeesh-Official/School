import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedPage, { AnimatedContainer, AnimatedItem, ScrollAnimatedSection, AnimatedGrid } from '../components/AnimatedPage';
import GlassCard from '../components/GlassCard';
import Carousel from '../components/Carousel';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  fadeUpVariants, 
  fadeLeftVariants, 
  fadeRightVariants,
  scaleUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  heroVariants,
  textVariants
} from '../utils/animationVariants';
import type { SubSubject, Marks } from '../types';

interface SubjectPageProps {
  title: string;
  subSections?: SubSubject[];
  isHubPage?: boolean;
  marks?: Marks;
  icon?: React.FC<{ className?: string }>;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// Reusable AnswerSheetSection component with proper toggle functionality
interface AnswerSheetSectionProps {
  testNumber: number;
  marks: string | number;
  totalMarks: number;
  imageSrc: string;
  iconColor: string;
  hoverColor: string;
}

const AnswerSheetSection: React.FC<AnswerSheetSectionProps> = ({
  testNumber,
  marks,
  totalMarks,
  imageSrc,
  iconColor,
  hoverColor
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="py-6">
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-200">
          Weekly Test {testNumber}: 
          <span className="font-mono font-bold text-white ml-2 bg-white/10 px-2 py-1 rounded-md">
            {marks} / {totalMarks}
          </span>
        </p>
      </div>
      
      {/* Large clickable area for better UX */}
      <div 
        className="bg-black/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:bg-black/20 hover:border-white/15 hover:shadow-lg hover:shadow-black/20 cursor-pointer"
        onClick={toggleOpen}
      >
        {/* Header section - fully clickable */}
        <div className="p-4 hover:bg-white/5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110`}>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-90' : 'rotate-0'
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <span className="text-base font-medium text-gray-300 select-none">
                  View Answer Sheet
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {isOpen ? 'Click here to close' : 'Click here to open'}
                </p>
              </div>
            </div>
            
            {/* Visual status indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isOpen ? 'bg-green-400 shadow-green-400/50 shadow-md' : 'bg-gray-500'
              }`} />
              <span className="text-sm text-gray-400 hidden sm:block">
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Expandable content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ 
                height: 0, 
                opacity: 0
              }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                transition: {
                  height: { 
                    duration: 0.4, 
                    ease: [0.4, 0.0, 0.2, 1]
                  },
                  opacity: { 
                    duration: 0.3, 
                    delay: 0.1 
                  }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { 
                    duration: 0.3, 
                    ease: [0.4, 0.0, 0.2, 1]
                  },
                  opacity: { 
                    duration: 0.2 
                  }
                }
              }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="p-6">
                <div className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-xl">
                  <div className="relative group">
                    {/* Click anywhere on image area to close */}
                    <div 
                      className="relative cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOpen();
                      }}
                      title="Click to close answer sheet"
                    >
                      <img 
                        src={imageSrc} 
                        alt={`Weekly Test ${testNumber} Answer Sheet`} 
                        className="w-full h-auto rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/School/placeholder-answer-sheet.jpg';
                        }}
                      />
                      
                      {/* Hover overlay with close instruction */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                          <div className="flex items-center gap-2 text-white">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-sm font-medium">Click to close</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info footer */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-400">
                        <span className="font-medium">Weekly Test {testNumber}</span>
                        <span className="mx-2">•</span>
                        <span>{marks}/{totalMarks} marks</span>
                      </div>
                      <div className="text-gray-500">
                        Answer Sheet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SubjectPage: React.FC<SubjectPageProps> = ({ title, subSections, isHubPage, marks, icon: Icon }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  let backPath = '/';
  if (pathSegments.length > 1) {
    backPath = `/${pathSegments.slice(0, -1).join('/')}`;
  }

  // Scroll to top when navigating to any page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
  
  const handleIndexLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Add offset for fixed navbar on mobile
      const offsetTop = targetElement.offsetTop - 80; // 80px for mobile navbar height
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const getTotalMarks = () => {
    switch (title) {
      case 'Physics':
      case 'Chemistry':
        return 11;
      case 'Biology':
        return 13;
      default:
        return 35;
    }
  };
  const totalMarks = getTotalMarks();

  const getSubjectPrefix = () => {
    switch (title) {
      case 'Mathematics':
        return 'maths';
      case 'English':
        return 'english';
      case 'German':
        return 'german';
      case 'Social Science':
        return 'social-science';
      case 'Science':
        return 'science';
      case 'Physics':
        return 'physics';
      case 'Chemistry':
        return 'chemistry';
      case 'Biology':
        return 'biology';
      case 'IT':
        return 'it';
      default:
        return title.toLowerCase().replace(/\s+/g, '-');
    }
  };
  
  const subjectPrefix = getSubjectPrefix();
  const labActivityImages = [
    '/School/math-lab-file-1.png',
    '/School/math-lab-file-2.png',
    '/School/math-lab-file-3.png',
    '/School/math-lab-file-4.png',
    '/School/math-lab-file-5.png',
    '/School/math-lab-file-6.png',
    '/School/math-lab-file-7.png'
  ];
  const artIntegrationImages = ['/School/What if we join 2 paths.png'];
  const achievementImages = Array.from({ length: 3 }, (_, i) => `/School/${subjectPrefix}-achievement-${i + 1}.jpg`);


  const renderSubSectionGrid = () => (
    subSections && (
      <AnimatedGrid className="gap-6" cols={3}>
        {subSections.map((section, index) => (
          <Link key={section.path} to={section.path} className="block h-full">
            <GlassCard 
              className="p-8 text-center h-full flex flex-col justify-center"
              hover="tilt"
              animationVariant="card"
              delay={index * 0.1}
            >
              <ScrollAnimatedSection variant="fadeUp" delay={0.1}>
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                  {section.name}
                </h2>
              </ScrollAnimatedSection>
              <ScrollAnimatedSection variant="fadeUp" delay={0.2}>
                <p className="text-gray-400">
                  Explore notes, projects, and achievements in {section.name}.
                </p>
              </ScrollAnimatedSection>
            </GlassCard>
          </Link>
        ))}
      </AnimatedGrid>
    )
  );

  const renderScienceHubPage = () => (
    <>
      <ScrollAnimatedSection id="cover-page" variant="card">
        <GlassCard className="p-8 md:p-12 text-center" animationVariant="scaleUp">
          <ScrollAnimatedSection variant="fadeUp">
            <h2 className="text-3xl font-bold text-white tracking-wider">Science Portfolio</h2>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection variant="fadeUp" delay={0.1}>
            <p className="text-gray-400 mt-2">Class 9 (2025-2026)</p>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection variant="fadeUp" delay={0.2}>
            <div className="my-8 border-t border-gray-700 w-1/4 mx-auto"></div>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection variant="fadeUp" delay={0.3}>
            <p className="text-xl font-medium text-gray-200">Submitted by:</p>
            <p className="text-2xl font-semibold text-white mt-1">Navdeesh</p>
          </ScrollAnimatedSection>
        </GlassCard>
      </ScrollAnimatedSection>

      <ScrollAnimatedSection id="acknowledgement" variant="card" delay={0.2}>
        <GlassCard className="p-8 md:p-12" animationVariant="fadeUp">
          <ScrollAnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-semibold text-white mb-4">Acknowledgement</h2>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection variant="fadeUp" delay={0.1}>
            <p className="text-gray-300 leading-relaxed">
              I would like to express my sincere gratitude to my science teachers for their invaluable guidance and support. My heartfelt thanks to:
            </p>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection variant="fadeUp" delay={0.2}>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
                <li><span className="font-semibold text-white">Sadhna Yadav Ma'am</span> for making Physics engaging and understandable.</li>
                <li><span className="font-semibold text-white">Maansi Nagpal Ma'am</span> for her insightful teaching in Chemistry.</li>
                <li><span className="font-semibold text-white">Shilpi Bhattacharya Ma'am</span> for inspiring my curiosity in Biology.</li>
            </ul>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection variant="fadeUp" delay={0.3}>
            <p className="text-gray-300 leading-relaxed mt-4">
              Their collective encouragement has been instrumental in my learning journey.
            </p>
          </ScrollAnimatedSection>
        </GlassCard>
      </ScrollAnimatedSection>
      
      <ScrollAnimatedSection variant="card" delay={0.4}>
        <GlassCard className="p-8 md:p-12" animationVariant="scaleUp">
          <ScrollAnimatedSection variant="fadeUp">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Explore the Branches of Science</h2>
          </ScrollAnimatedSection>
          {subSections && (
            <AnimatedGrid className="gap-6" cols={3}>
              {subSections.map((section) => {
                const SectionIcon = section.icon;
                return (
                  <Link to={section.path} key={section.path} className="block group">
                    <GlassCard 
                      className="p-8 text-center h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:border-white/20"
                      whileHover={{ y: -10, scale: 1.03 }}
                      animationVariant="card"
                      scrollAnimation={false}
                    >
                      {SectionIcon && <SectionIcon className="w-12 h-12 text-gray-300 mb-4 transition-colors duration-300 group-hover:text-white" />}
                      <h3 className="text-xl font-semibold text-gray-100">{section.name}</h3>
                    </GlassCard>
                  </Link>
                );
              })}
            </AnimatedGrid>
          )}
        </GlassCard>
      </ScrollAnimatedSection>

      {marks && (
        <ScrollAnimatedSection id="weekly-tests" variant="card" delay={0.6}>
          <GlassCard className="p-8" animationVariant="card">
            <ScrollAnimatedSection variant="fadeUp">
              <h2 className="text-2xl font-bold text-white mb-4">Weekly Test Marks</h2>
            </ScrollAnimatedSection>
              <div className="divide-y divide-gray-700/50">
                <AnswerSheetSection 
                  testNumber={1}
                  marks={marks['Weekly Test 1'] ?? '/'}
                  totalMarks={totalMarks}
                  imageSrc="/School/science-test-1.jpg"
                  iconColor="from-blue-500/20 to-purple-500/20 border-blue-500/30"
                  hoverColor="rgba(59, 130, 246, 0.6)"
                />
                <AnswerSheetSection 
                  testNumber={2}
                  marks={marks['Weekly Test 2'] ?? '/'}
                  totalMarks={totalMarks}
                  imageSrc="/School/science-test-2.jpg"
                  iconColor="from-green-500/20 to-emerald-500/20 border-green-500/30"
                  hoverColor="rgba(34, 197, 94, 0.6)"
                />
              </div>
          </GlassCard>
        </ScrollAnimatedSection>
      )}
    </>
  );

  const renderContent = () => {
    if (title === 'Mathematics') {
      return (
        <>
          <div id="cover-page">
            <GlassCard className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white tracking-wider">Mathematics Portfolio</h2>
              <p className="text-gray-400 mt-2">Class 9 (2025-2026)</p>
              <div className="my-8 border-t border-gray-700 w-1/4 mx-auto"></div>
              <p className="text-xl font-medium text-gray-200">Submitted by:</p>
              <p className="text-2xl font-semibold text-white mt-1">Navdeesh</p>
            </GlassCard>
          </div>

          <div id="acknowledgement">
            <GlassCard className="p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-white mb-4">Acknowledgement</h2>
              <p className="text-gray-300 leading-relaxed">
                I would like to express my sincere gratitude to my mathematics teacher, Astha Gakhar Ma'am, for her invaluable guidance and support throughout my projects. I am also thankful to my parents for their constant encouragement and for providing me with the resources needed to complete this work. Their support has been instrumental in my learning journey.
              </p>
            </GlassCard>
          </div>

          <AnimatedItem delay={0.2}>
            <GlassCard className="p-8 md:p-12" hover="glow">
              <motion.h2 
                className="text-2xl font-semibold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Index
              </motion.h2>
              <motion.ul 
                className="space-y-4 list-inside text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.a 
                      href="#cover-page" 
                      onClick={(e) => handleIndexLinkClick(e, 'cover-page')} 
                      className="flex items-start gap-3 hover:text-white transition-colors duration-200 cursor-pointer"
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <span className="text-gray-500 mt-1 shrink-0">1.</span>
                      <span>Cover Page</span>
                    </motion.a>
                  </motion.li>
                  {[
                    { id: 'acknowledgement', label: 'Acknowledgement', index: 2 },
                    { id: 'weekly-tests', label: 'Weekly Test Results', index: 3 },
                    { id: 'holiday-homework', label: 'Holiday Homework', index: 4 },
                    { id: 'lab-activities', label: 'Lab Activities', index: 5 },
                    { id: 'art-integration', label: 'Art Integration', index: 6 },
                    { id: 'achievements', label: 'Notebook & Achievements', index: 7 },
                  ].map((item, idx) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                    >
                      <motion.a 
                        href={`#${item.id}`} 
                        onClick={(e) => handleIndexLinkClick(e, item.id)} 
                        className="flex items-start gap-3 hover:text-white transition-colors duration-200 cursor-pointer"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <span className="text-gray-500 mt-1 shrink-0">{item.index}.</span>
                        <span>{item.label}</span>
                      </motion.a>
                    </motion.li>
                  ))}
              </motion.ul>
            </GlassCard>
          </AnimatedItem>

          {marks && (
            <ScrollAnimatedSection id="weekly-tests" variant="card" delay={0.4}>
              <GlassCard className="p-8" animationVariant="card">
                <ScrollAnimatedSection variant="fadeUp">
                  <h2 className="text-2xl font-bold text-white mb-4">Weekly Test Marks</h2>
                </ScrollAnimatedSection>
                <div className="divide-y divide-gray-700/50">
                  <AnswerSheetSection 
                    testNumber={1}
                    marks={marks['Weekly Test 1'] ?? '/'}
                    totalMarks={totalMarks}
                    imageSrc="/School/math-test-1.jpg"
                    iconColor="from-purple-500/20 to-pink-500/20 border-purple-500/30"
                    hoverColor="rgba(147, 51, 234, 0.6)"
                  />
                  <AnswerSheetSection 
                    testNumber={2}
                    marks={marks['Weekly Test 2'] ?? '/'}
                    totalMarks={totalMarks}
                    imageSrc="/School/math-test-2.jpg"
                    iconColor="from-indigo-500/20 to-cyan-500/20 border-indigo-500/30"
                    hoverColor="rgba(99, 102, 241, 0.6)"
                  />
                </div>
              </GlassCard>
            </ScrollAnimatedSection>
          )}

          <div id="holiday-homework">
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Holiday Homework</h2>
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/20">
                  <iframe
                      src="https://mathholidayhomework.streamlit.app/?embed=true"
                      title="Mathematics Holiday Homework"
                      className="w-full h-full border-0"
                      allow="camera; microphone; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                  ></iframe>
              </div>
            </GlassCard>
          </div>

          <div id="lab-activities">
            <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Lab Activities</h2>
                <Carousel images={labActivityImages} />
            </GlassCard>
          </div>

          <div id="art-integration">
              <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Art Integration</h2>
                  <Carousel images={artIntegrationImages} />
              </GlassCard>
          </div>

          <div id="achievements">
              <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Notebook & Achievements</h2>
                  <div className="space-y-8">
                          <Carousel images={[
                              '/School/math-index-1.png',
                              '/School/math-index-2.png',
                              '/School/math-notebook-1.png',
                              '/School/math-notebook-2.png',
                              '/School/math-notebook-3.png',
                              '/School/math-notebook-4.png'
                          ]} />
                  </div>
              </GlassCard>
          </div>
        </>
      );
    } else if (['Physics', 'Chemistry', 'Biology'].includes(title)) {
      return (
        <>
          <GlassCard className="p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Index</h2>
            <ul className="space-y-4 list-inside text-gray-300">
              <li><a href="#holiday-homework" onClick={(e) => handleIndexLinkClick(e, 'holiday-homework')} className="flex items-start gap-3 hover:text-white transition-colors duration-200 cursor-pointer"><span className="text-gray-500 mt-1 shrink-0">1.</span><span>Holiday Homework</span></a></li>
              {title === 'Physics' && <li><a href="#art-integration" onClick={(e) => handleIndexLinkClick(e, 'art-integration')} className="flex items-start gap-3 hover:text-white transition-colors duration-200 cursor-pointer"><span className="text-gray-500 mt-1 shrink-0">2.</span><span>Art Integration</span></a></li>}
              {(title === 'Physics' || title === 'Chemistry' || title === 'Biology') ? (
                <li><a href="#notebook" onClick={(e) => handleIndexLinkClick(e, 'notebook')} className="flex items-start gap-3 hover:text-white transition-colors duration-200 cursor-pointer"><span className="text-gray-500 mt-1 shrink-0">{title === 'Physics' ? '3' : '2'}.</span><span>Notebook</span></a></li>
              ) : (
                <li><a href="#achievements" onClick={(e) => handleIndexLinkClick(e, 'achievements')} className="flex items-start gap-3 hover:text-white transition-colors duration-200 cursor-pointer"><span className="text-gray-500 mt-1 shrink-0">2.</span><span>Achievements</span></a></li>
              )}
            </ul>
          </GlassCard>

          <div id="holiday-homework">
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Holiday Homework</h2>
              {(() => {
                switch (title) {
                  case 'Physics':
                    return (
                      <div className="w-full h-[80vh] rounded-lg overflow-hidden border border-white/10 bg-black/20">
                        <iframe
                            src="/School/Physics Holiday Homework - Local Traffic Patterns.pdf"
                            title="Physics Holiday Homework - Local Traffic Patterns"
                            className="w-full h-full border-0"
                        ></iframe>
                      </div>
                    );
                  case 'Chemistry':
                    return (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-3">Project Report (PDF)</h3>
                          <div className="w-full h-[80vh] rounded-lg overflow-hidden border border-white/10 bg-black/20">
                            <iframe
                              src="/School/Hydrogen Horizons - Powering Tomorrow Sustainably.pdf"
                              title="Hydrogen Horizons - Powering Tomorrow Sustainably"
                              className="w-full h-full border-0"
                            ></iframe>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-3">Video Demonstration</h3>
                          <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/20">
                            <video
                              className="w-full h-full object-contain"
                              controls
                              preload="metadata"
                            >
                              <source src="/School/Simple Electrolysis Setup at Home.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      </div>
                    );
                  case 'Biology':
                    const biologyImages = ['/School/Save Your Joints Poster 1.png', '/School/Save Your Joints Poster 2.png'];
                    return (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-3">Project Report (PDF)</h3>
                          <div className="w-full h-[80vh] rounded-lg overflow-hidden border border-white/10 bg-black/20">
                            <iframe
                              src="/School/Tissue Troubles - Diagnose, Discover, Design.pdf"
                              title="Tissue Troubles - Diagnose, Discover, Design"
                              className="w-full h-full border-0"
                            ></iframe>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-3">Project Posters</h3>
                          <Carousel images={biologyImages} />
                        </div>
                      </div>
                    );
                  default:
                    return <p className="text-gray-400">Holiday homework for {title} will be uploaded soon.</p>;
                }
              })()}
            </GlassCard>
          </div>

          {title === 'Physics' && (
            <div id="art-integration">
              <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Art Integration</h2>
                  <div className="w-full max-w-2xl mx-auto aspect-square rounded-lg overflow-hidden border border-white/10 bg-black/20">
                    <video
                      className="w-full h-full object-contain"
                      controls
                      preload="metadata"
                    >
                      <source src="/School/First Law of Motion - Inertia.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
              </GlassCard>
            </div>
          )}

          {(title === 'Physics' || title === 'Chemistry' || title === 'Biology') ? (
            <div id="notebook">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Notebook</h2>
                <div className="flex justify-center">
                  <motion.div 
                    className="max-w-2xl w-full bg-gradient-to-br from-black/30 to-black/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.6, 
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 10px 40px rgba(255, 255, 255, 0.1)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.img 
                      src={
                        title === 'Physics' ? '/School/physics-index.png' : 
                        title === 'Chemistry' ? '/School/chemistry-index.png' : 
                        '/School/biology-index.png'
                      } 
                      alt={`${title} Notebook Index`} 
                      className="w-full h-auto rounded-lg shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          duration: 0.5, 
                          delay: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </motion.div>
                </div>
              </GlassCard>
            </div>
          ) : (
            <div id="achievements">
              <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Notebook & Achievements</h2>
                  <Carousel images={achievementImages} />
              </GlassCard>
            </div>
          )}
        </>
      );
    }
    // Default content for other subjects
    return <GlassCard className="p-8"><p className="text-gray-400">Content for {title} will be added soon.</p></GlassCard>;
  };

  // FIX: The component was not returning any JSX, which is required for a React functional component.
  // This adds the main page layout, including a header and conditional content rendering.
  return (
    <AnimatedPage>
      <div className="space-y-8">
        <motion.div 
          className="flex items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Link 
              to={backPath} 
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20" 
              title="Go back"
              aria-label="Go back to previous page"
            >
              <motion.div
                whileHover={{ x: -2, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            </Link>
          </motion.div>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {Icon && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 shrink-0" />
              </motion.div>
            )}
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight truncate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {title}
            </motion.h1>
          </div>
        </motion.div>
        
        <AnimatedContainer>
          {isHubPage 
              ? (title === 'Science' ? renderScienceHubPage() : renderSubSectionGrid()) 
              : renderContent()
          }
        </AnimatedContainer>
      </div>
    </AnimatedPage>
  );
};

// FIX: Added default export to make the component importable in other files like App.tsx.
export default SubjectPage;