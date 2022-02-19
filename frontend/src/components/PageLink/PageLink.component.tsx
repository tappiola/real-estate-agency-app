import clsx from "clsx";
import './PageLink.style.scss';
import {Link} from "react-router-dom";
import React from "react";

const PageLink : React.FC<{pageNumber: number, isCurrent: boolean}> = ({pageNumber, isCurrent}) => {
    return <Link
        className={clsx('PageLink', isCurrent && 'PageLink_isCurrent')}
        to={pageNumber === 1 ? '' : `?page=${pageNumber}`}
    >{pageNumber}
    </Link>
}

export default PageLink;