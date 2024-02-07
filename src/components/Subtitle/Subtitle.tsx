import styles from './styles/subtitle.module.scss';

interface SubtitleProps {
  prefix?: '01' | '02' | '03';
  title: string;
}

export const Subtitle = ({prefix, title}: SubtitleProps) => {
  const withPrefix = prefix ? styles['subtitle--with-prefix'] : false;

  return (
    <h2 className={`${styles['subtitle']} ${withPrefix}`}>
      <span>{prefix}</span>
      {title}
    </h2>
  );
};
