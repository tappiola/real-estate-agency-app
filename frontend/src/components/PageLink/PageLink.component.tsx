import clsx from "clsx";
import './PageLink.style.scss';
import {Link} from "react-router-dom";
import React from "react";
import {FilterParams} from "../../types";

const PageLink : React.FC<{pageNumber: number, isCurrent: boolean, searchParams: object}> = ({pageNumber, isCurrent, searchParams}) => {
    const getParams = (searchParams: FilterParams) => {
        const pageKey = 'page';
        const params = new URLSearchParams(searchParams.toString());

        if(+pageNumber === 1){
            params.delete(pageKey);
        } else {
            params.set(pageKey, pageNumber.toString());
        }

        return params;
    }

    return <Link
        className={clsx('PageLink', isCurrent && 'PageLink_isCurrent')}
        to={'?' + getParams(searchParams).toString()}
    >{pageNumber}
    </Link>
}

export default PageLink;