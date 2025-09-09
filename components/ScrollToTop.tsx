import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle immediate scroll reset for instant navigation
    const handleScrollReset = () => {
      // First, immediately reset scroll without animation for instant feedback
      window.scrollTo(0, 0);
      
      // Then apply smooth scrolling after a brief delay to ensure page is rendered
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 50);
    };

    // Small delay to ensure DOM is ready and animations don't conflict
    const timeoutId = setTimeout(handleScrollReset, 10);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
