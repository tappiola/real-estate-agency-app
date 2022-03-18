import './WishlistLoader.style.scss';
import { PlaceholderBlock, PlaceholderText } from '../Placeholder';

const WishlistLoader = () => (
  <div className="WishlistLoader-Properties">
    {[...Array(8)].map((_, i) => (
      <div className="WishlistLoader-Container" key={i}>
        <PlaceholderBlock classes={['WishlistLoader-Image']} />
        <div className="WishlistLoader-Info">
          <PlaceholderText />
          <PlaceholderText />
          <PlaceholderText />
        </div>
      </div>
    ))}
  </div>
);

export default WishlistLoader;
