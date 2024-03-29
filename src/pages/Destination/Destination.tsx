import { Description } from '../../components/Description/Description';
import { DestinationDetails } from '../../components/DestinationDetails/DestinationDetails';
import { Heading } from '../../components/Heading/Heading';
import { InnerNavigationBar } from '../../components/InnerNavigationBar/InnerNavigationBar';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { useDestination } from './hooks/useDestination';
import styles from './styles/destination.module.scss';

export const Destination = () => {
  const { destinations, details, setActiveDestination } = useDestination();  
  const {
    name,
    images,
    description,
    distance,
    travel,
  } = details;
  const pages = destinations.map(destination => destination.name);

  return (
    <main className={styles['wrapper']}>
      <Subtitle
        prefix='01'
        title='Pick your destination'
      />
      <picture>
        <source srcSet={images.webp} type='image/webp' />
        <img src={images.png} alt='' />
      </picture>
      <div className={styles['info']}>
        <InnerNavigationBar pages={pages} setActivePage={setActiveDestination} />
        <div className={styles['spacer']}/>
        <Heading
          text={name}
          variant='medium'
        />
        <Description>
          {description}
        </Description>
        <div className={styles['details']}>
          <DestinationDetails
            title='Avg. Distance'
            value={distance}
          />
          <DestinationDetails
            title='Est. Travel Time'
            value={travel}
          />
        </div>
      </div>
    </main>
  );
};
