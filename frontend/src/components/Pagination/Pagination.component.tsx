import PageLink from "../PageLink";
import './Pagination.style.scss';
import React from "react";

const Pagination : React.FC<{pages: number, searchParams: object}> = ({pages, searchParams}) => {
    // @ts-ignore
    const { page: currentPage } = searchParams;

    return <div className="Pagination">
        {Array.apply(null, Array(pages))
            .map((_, i) => <PageLink
                key={i} pageNumber={ i + 1 } isCurrent={i + 1 === currentPage}
                searchParams={searchParams}/>)}
    </div>
}

export default Pagination;