import { ParallaxProvider } from 'react-scroll-parallax';
import HomePage from './HomePage.component';
import { useAppSelector } from '../../store/hooks';

const HomePageContainer = () => {
    const { isMobile } = useAppSelector(({ config }) => config);

    return (
      <ParallaxProvider>
        <HomePage isMobile={isMobile} />
      </ParallaxProvider>
    );
};

export default HomePageContainer;
