import clsx from 'clsx';
import './PageLink.style.scss';
import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';

const PageLink : React.FC<{
    pageNumber: number,
    isCurrent: boolean,
    searchParams: object
}> = ({
    pageNumber,
    isCurrent,
    searchParams
}) => {
    const adjustedParams = useMemo(() => {
        const pageKey = 'page';
        const params = new URLSearchParams(searchParams.toString());

        if (+pageNumber === 1) {
            params.delete(pageKey);
        } else {
            params.set(pageKey, pageNumber.toString());
        }

        return params;
    }, [pageNumber, searchParams]);

    return (
      <Link
        className={clsx('PageLink', isCurrent && 'PageLink_isCurrent')}
        to={`?${adjustedParams.toString()}`}
      >
        {pageNumber}
      </Link>
    );
};

export default PageLink;
