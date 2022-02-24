import clsx from "clsx";
import './PageLink.style.scss';
import {Link} from "react-router-dom";
import React, {useEffect} from "react";

const PageLink : React.FC<{pageNumber: number, isCurrent: boolean, searchParams: object}> = ({pageNumber, isCurrent, searchParams}) => {
    const getParams = (searchParams: any) => {
        const pageKey = 'page';
        const page = searchParams.get(pageKey) || 1;

        if(+pageNumber === 1){
            searchParams.delete(pageKey);
        } else {
            searchParams.set(pageKey, pageNumber);
        }

        return searchParams;
    }

    return <Link
        className={clsx('PageLink', isCurrent && 'PageLink_isCurrent')}
        to={'?' + getParams(searchParams).toString()}
    >{pageNumber}
    </Link>
}

export default PageLink;