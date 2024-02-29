import styles from './styles/inner-navigation-bar.module.scss';

const PAGES = ['Moon', 'Mars', 'Europa', 'Titan'];

export const InnerNavigationBar = () => {
  return (
    <nav className={styles['wrapper']}>
      <ol>
        {PAGES.map(page => (
          <li key={page}>
            {page}
          </li>
        ))}
      </ol>
    </nav>
  );
};
