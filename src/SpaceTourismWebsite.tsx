import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import './styles/main.scss';

export const SpaceTourismWebsite = () => {

  useEffect(() => {
    const removeStyleAttribute = () => {
      document.body.removeAttribute('style');
    }

    window.addEventListener('load', removeStyleAttribute);
  
    return () => {
      window.removeEventListener('load', removeStyleAttribute);
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div>SpaceTourism</div>
      <Outlet />
    </MotionConfig>
  )
};
