import notFound from './404.png';
import './NotFound.style.scss';

const NotFound = () => (
  <div className="NotFound-Container">
    <img className="NotFound-Image" src={notFound} alt="not found" />
    <p className="NotFound-Title">Page not found</p>
  </div>
);

export default NotFound;
