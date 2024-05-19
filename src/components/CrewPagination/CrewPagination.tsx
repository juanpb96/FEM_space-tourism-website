import styles from './styles/crew-pagination.module.scss';

export const CrewPagination = () => {
  return (
    <ul className={styles['wrapper']}>
      <li className={styles['active']}></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};
