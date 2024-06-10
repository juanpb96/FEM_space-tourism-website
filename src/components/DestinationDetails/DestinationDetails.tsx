import styles from './styles/destination-details.module.scss';

interface DestinationDetailsProps {
  title: string;
  value: string;
}

// TODO: Move this component within Destination folder - Issue #50
export const DestinationDetails = ({ title, value }: DestinationDetailsProps) => {
  return (
    <section className={styles['wrapper']}>
      <h4>{title}</h4>
      <p>{value}</p>
    </section>
  );
};
