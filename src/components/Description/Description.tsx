import React from 'react';
import styles from './styles/description.module.scss';

export const Description = ({children}: React.PropsWithChildren) => {
  return (
    <p className={styles['description']}>
      {children}
    </p>
  );
};
