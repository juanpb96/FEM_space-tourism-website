import styles from './styles/heading.module.scss';

type Variant = 'small' | 'medium' | 'large';

interface HeadingProps {
  text: string;
  variant: Variant;
}

export const Heading = ({text, variant}: HeadingProps) => {
  return (
    <h3 className={`${styles['heading']} ${styles[`heading--${variant}`]}`}>
      {text}
    </h3>
  );
};
