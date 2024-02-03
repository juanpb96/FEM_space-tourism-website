import styles from './styles/logo.module.scss';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

export const Logo = () => {
  return (
    <div className={styles['wrapper']}>
      <VisuallyHidden>Space Tourism Website</VisuallyHidden>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="48" 
        height="48"
        viewBox="0 0 48 48"
        role="presentation"
        className={styles['image']}
      >
        <g fill="none" fillRule="evenodd">
          <circle cx="24" cy="24" r="24" fill="#FFF"/>
          <path fill="#0B0D17" d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"/>
        </g>
      </svg>
    </div>
  );
};
