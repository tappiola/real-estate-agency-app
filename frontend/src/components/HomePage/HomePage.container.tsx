import HomePage from './HomePage.component';
import { useAppSelector } from '../../redux/hooks';

const HomePageContainer = () => {
    const { isMobile } = useAppSelector(({ config }) => config);

    return <HomePage isMobile={isMobile} />;
};

export default HomePageContainer;
