import { Description } from '../../components/Description/Description';
import { Heading } from '../../components/Heading/Heading';
import { InnerNavigationBar } from '../../components/InnerNavigationBar/InnerNavigationBar';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import styles from './styles/destination.module.scss';
import { DestinationDetails } from '../../components/DestinationDetails/DestinationDetails';

export const Destination = () => {
  return (
    <main className={styles['wrapper']}>
      <Subtitle
        prefix='01'
        title='Pick your destination'
      />
      <picture>
        <source srcSet='./assets/destination/image-moon.webp' type='image/webp' />
        <img src='./assets/destination/image-moon.png' alt='' />
      </picture>
      <div className={styles['info']}>
        <InnerNavigationBar />
        <div className={styles['spacer']}/>
        <Heading
          text='Moon'
          variant='medium'
        />
        <Description>
          See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.
        </Description>
        <div className={styles['details']}>
          <DestinationDetails
            title='Avg. Distance'
            value='384,400 km'
          />
          <DestinationDetails
            title='Est. Travel Time'
            value='3 days'
          />
        </div>
      </div>
    </main>
  );
};
