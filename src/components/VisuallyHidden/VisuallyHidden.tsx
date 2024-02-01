import styles from './styles/visually-hidden.module.scss'

export const VisuallyHidden = ({children}) => {
  return (
    <div className={styles['sr-only']}>
      {children}
    </div>
  )
}
