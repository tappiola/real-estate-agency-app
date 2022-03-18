import './PropertyLoader.style.scss';
import { PlaceholderBlock, PlaceholderText } from '../Placeholder';

const PropertyLoader = () => (
  <div className="PropertyLoader-Container">
    <PlaceholderText classes={['PropertyLoader-Navigate']} />
    <div className="PropertyLoader-Preview">
      <PlaceholderBlock />
      <PlaceholderBlock />
      <PlaceholderBlock />
    </div>
    <div className="PropertyLoader-Info">
      <div className="PropertyLoader-Text">
        <PlaceholderText />
        <PlaceholderText />
        <PlaceholderText />
      </div>
      <PlaceholderBlock classes={['PropertyLoader-Image']} />
    </div>
  </div>
);

export default PropertyLoader;
