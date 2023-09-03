import styles from './styles/menu.module.scss';

/* TODO:
  - Include active state for mobile and tablet
  - Check keyboard navigation
  - Validate behavior on viewport resize 
*/

export const Menu = () => {
  return (
    <nav className={styles['menu']}>
      <ol>
        <li>Home</li>
        <li>Destination</li>
        <li>Crew</li>
        <li>Technology</li>
      </ol>
    </nav>
  );
};
