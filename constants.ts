import React from 'react';
import type { Subject } from './types';

// --- Icon Components ---

const MathIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, [
    React.createElement('path', {
      key: 'calculator',
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6 4.5A1.5 1.5 0 017.5 3h9A1.5 1.5 0 0118 4.5v15a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 19.5v-15z"
    }),
    React.createElement('path', {
      key: 'screen',
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h2M14 19h2"
    })
  ])
);
const EnglishIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  }))
);
const GermanIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502"
  }))
);
const SocialScienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
  }))
);
const ScienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, 
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18h8"
  }), 
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 22h18"
  }),
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14 22a7 7 0 1 0 0-14h-1"
  }),
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 14h2"
  }),
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"
  }),
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
  }))
);
const PhysicsIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
  }))
);
const ChemistryIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"
  }), React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.5 2h7"
  }), React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.5 16h-5"
  }))
);
const BiologyIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, 
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 21c.5-4.5 2.5-8 7-10"
  }), 
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 18c6.218 0 10.5-3.288 11-7v-4h-4.014c-9 0-9.986 7.022-9.986 9.986V18z"
  }))
);
const ITIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
  }))
);


export const SUBJECTS: Subject[] = [
  { 
    name: 'Mathematics', 
    path: '/mathematics',
    icon: MathIcon,
    marks: { 'Weekly Test 1': 33, 'Weekly Test 2': 31 }
  },
  { 
    name: 'English', 
    path: '/english',
    icon: EnglishIcon,
    marks: { 'Weekly Test 1': 33.5, 'Weekly Test 2': 30.5 }
  },
  { 
    name: 'German', 
    path: '/german',
    icon: GermanIcon,
    marks: { 'Weekly Test 1': 31, 'Weekly Test 2': 30.5 }
  },
  { 
    name: 'Social Science', 
    path: '/social-science',
    icon: SocialScienceIcon,
    marks: { 'Weekly Test 1': 30, 'Weekly Test 2': 33.5 }
  },
  { 
    name: 'Science', 
    path: '/science',
    icon: ScienceIcon,
    marks: { 'Weekly Test 1': 35, 'Weekly Test 2': 35 },
    subSubjects: [
      { name: 'Physics', path: '/science/physics', icon: PhysicsIcon, marks: { 'Weekly Test 1': 11, 'Weekly Test 2': 11 } },
      { name: 'Chemistry', path: '/science/chemistry', icon: ChemistryIcon, marks: { 'Weekly Test 1': 11, 'Weekly Test 2': 11 } },
      { name: 'Biology', path: '/science/biology', icon: BiologyIcon, marks: { 'Weekly Test 1': 13, 'Weekly Test 2': 13 } },
    ]
  },
  { 
    name: 'IT', 
    path: '/it',
    icon: ITIcon,
  },
];