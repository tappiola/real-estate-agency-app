import clsx from "clsx";
import './PageLink.style.scss';
import {Link} from "react-router-dom";

const PageLink = ({pageNumber, isCurrent}) => {
    return <Link
        className={clsx('PageLink', isCurrent && 'PageLink_isCurrent')}
        to={pageNumber === 1 ? '' : `?page=${pageNumber}`}
    >{pageNumber}
    </Link>
}

export default PageLink;