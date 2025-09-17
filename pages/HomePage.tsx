import React from 'react';
import AnimatedPage, { AnimatedContainer, AnimatedItem } from '../components/AnimatedPage';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { SUBJECTS } from '../constants';
import Carousel from '../components/Carousel';

// --- Icons ---
const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const HobbyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

const InfoTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-block bg-gray-800/60 border border-gray-700/80 text-gray-300 text-sm font-medium mr-2 mb-2 px-3 py-1.5 rounded-lg hover:bg-gray-700/60 hover:border-gray-600/80 hover:text-white transition-all duration-300">
    {children}
  </div>
);

const HomePage: React.FC = () => {
  const subjectsWithMarks = SUBJECTS.filter(s => s.marks && s.name !== 'IT');
  const achievementImages = [
    '/School/International Teen Video Challenge 2025 Global Spotlight Award.png',
    '/School/Ordin@trix kuriobots.png',
    '/School/Stem Circuit for SIC 2025.png',
    '/School/Inclusive Communities.pdf',
    '/School/Leadership.pdf',
    '/School/Hate Speech Online.pdf',
    '/School/Education.pdf',
    '/School/icode_qualifier_certificate_1970_01_01_05_30_00_page-0001.jpg',
    '/School/icode_participation_certificate_1970_01_01_05_30_00_page-0001.jpg',
    '/School/AI for Engineers Workshop.pdf',
  ];

  return (
    <AnimatedPage>
      <AnimatedContainer className="space-y-8">
        {/* --- Profile Section --- */}
        <AnimatedItem>
          <GlassCard className="p-8 w-full" hover="glow">
              <div className="text-center">
                  <motion.h1 
                    className="text-4xl md:text-5xl font-bold text-white"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    Navdeesh
                  </motion.h1>
                  <motion.p 
                    className="text-lg text-gray-400 mt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Age 13 &bull; Class 9
                  </motion.p>
                  <motion.p 
                    className="mt-4 text-gray-300 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                      A passionate student with a keen interest in the world of technology. I enjoy exploring artificial intelligence, building software, and diving into challenging science concepts. When I'm not coding, you'll find me lost in a good book.
                  </motion.p>
              </div>
          </GlassCard>
        </AnimatedItem>
        
        {/* --- Performance Summary --- */}
        <AnimatedItem delay={0.1}>
          <GlassCard className="p-6 sm:p-8 w-full" hover="lift">
              <motion.div 
                className="flex items-center gap-3 sm:gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 200 }}
                  >
                    <ChartBarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 shrink-0" />
                  </motion.div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Performance Summary</h2>
              </motion.div>
            <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full text-left min-w-[500px] sm:min-w-0">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="p-3 sm:p-4 text-sm font-semibold text-gray-400">Subject</th>
                            <th className="p-3 sm:p-4 text-sm font-semibold text-gray-400 text-center">Weekly Test 1</th>
                            <th className="p-3 sm:p-4 text-sm font-semibold text-gray-400 text-center">Weekly Test 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectsWithMarks.map((subject, index) => {
                          const getTotalForSubject = () => {
                            if (subject.name === 'Physics' || subject.name === 'Chemistry') return 11;
                            if (subject.name === 'Biology') return 13;
                            return 35;
                          };
                          const total = getTotalForSubject();
                          
                          return (
                            <motion.tr 
                              key={subject.path} 
                              className="border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.6 + (index * 0.1),
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                              whileHover={{ 
                                backgroundColor: 'rgba(255,255,255,0.08)',
                                transition: { duration: 0.2 }
                              }}
                            >
                                <td className="p-3 sm:p-4 font-medium text-gray-200">{subject.name}</td>
                                <motion.td 
                                  className="p-3 sm:p-4 text-gray-300 font-mono text-center"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <span className="text-white font-semibold">{subject.marks!['Weekly Test 1']}</span>
                                  <span className="text-gray-500 text-sm"> / {total}</span>
                                </motion.td>
                                <motion.td 
                                  className="p-3 sm:p-4 text-gray-300 font-mono text-center"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <span className="text-white font-semibold">{subject.marks!['Weekly Test 2']}</span>
                                  <span className="text-gray-500 text-sm"> / {total}</span>
                                </motion.td>
                            </motion.tr>
                          );
                        })}
                    </tbody>
                </table>
            </div>
          </GlassCard>
        </AnimatedItem>

        {/* --- Achievements Section --- */}
        <AnimatedItem delay={0.2}>
          <GlassCard className="p-6 sm:p-8" hover="tilt">
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <TrophyIcon className="w-8 h-8 text-gray-400 shrink-0" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Achievements</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full -mx-6 sm:-mx-8"
            >
              <Carousel 
                images={achievementImages}
                className="rounded-none sm:rounded-2xl"
              />
            </motion.div>
          </GlassCard>
        </AnimatedItem>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* --- Hobbies Section --- */}
            <AnimatedItem delay={0.3}>
              <GlassCard className="p-8" hover="scale">
                   <motion.div 
                     className="flex items-center gap-4 mb-4"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.4 }}
                   >
                      <motion.div
                        initial={{ rotate: 180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 200 }}
                      >
                        <HobbyIcon className="w-8 h-8 text-gray-400 shrink-0" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white">Hobbies</h2>
                  </motion.div>
                  <div className="flex flex-wrap">
                      {['Coding', 'Reading Tech Blogs', 'STEM Projects', 'Problem Solving', 'AI Exploration'].map((hobby, index) => (
                        <motion.div
                          key={hobby}
                          initial={{ opacity: 0, scale: 0, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.7 + (index * 0.1),
                            type: 'spring',
                            stiffness: 200
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotate: 2,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <InfoTag>{hobby}</InfoTag>
                        </motion.div>
                      ))}
                  </div>
              </GlassCard>
            </AnimatedItem>
        </div>

        {/* --- Contact Section --- */}
        <AnimatedItem delay={0.4}>
          <GlassCard className="p-8" hover="glow">
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, type: 'spring', stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <MailIcon className="w-8 h-8 text-gray-400 shrink-0" />
                  </motion.div>
                  <div>
                      <motion.h2 
                        className="text-2xl font-bold text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        Get in Touch
                      </motion.h2>
                      <motion.a 
                          href="mailto:s9233@tagoreint.org"
                          className="text-lg text-gray-300 hover:text-white transition-all duration-300 underline underline-offset-4 decoration-gray-600 hover:decoration-gray-400"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                          whileHover={{ 
                            scale: 1.05,
                            color: '#ffffff',
                            textDecorationColor: '#9ca3af',
                            transition: { duration: 0.2 }
                          }}
                      >
                          s9233@tagoreint.org
                      </motion.a>
                  </div>
              </motion.div>
          </GlassCard>
        </AnimatedItem>
      </AnimatedContainer>
    </AnimatedPage>
  );
};

export default HomePage;
