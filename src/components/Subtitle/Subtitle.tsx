import styles from './styles/subtitle.module.scss';

interface SubtitleProps {
  prefix?: '01' | '02' | '03';
  title: string;
}

export const Subtitle = ({prefix, title}: SubtitleProps) => {
  return (
    <h2 className={styles['subtitle']}>
      {prefix && <span>{prefix}</span>}
      {title}
    </h2>
  );
};
