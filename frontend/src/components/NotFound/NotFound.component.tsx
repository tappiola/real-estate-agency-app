import notFound from'./404.png';
import './NotFound.style.scss';

const NotFound = () => {
    return <>
        <img className='NotFound-Image' src={notFound} alt="not found"/>
        <p className='NotFound-Title'>Page not found</p>
        </>
}

export default NotFound;