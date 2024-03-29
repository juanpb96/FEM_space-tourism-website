import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Header } from './components/Header/Header';
import './styles/main.scss';

export const SpaceTourismWebsite = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [location.pathname, navigate]);
  

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
      <Header />
      <Outlet />
    </MotionConfig>
  )
};
