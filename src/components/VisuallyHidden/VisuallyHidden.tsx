import { PropsWithChildren } from 'react';
import styles from './styles/visually-hidden.module.scss'

export const VisuallyHidden = ({children}: PropsWithChildren) => {
  return (
    <div className={styles['sr-only']}>
      {children}
    </div>
  )
}
