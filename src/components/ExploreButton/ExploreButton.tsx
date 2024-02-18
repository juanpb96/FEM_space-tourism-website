import styles from './styles/explore-button.module.scss';

interface ExploreButtonProps {
  className?: string;
}

export const ExploreButton = ({className}: ExploreButtonProps) => {
  return (
    <button type="button" className={`${styles['button-explore']} ${className}`}>
      Explore
    </button>
  );
};
