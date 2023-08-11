import { useEffect } from 'react';
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
    <div>SpaceTourism</div>
  )
};
