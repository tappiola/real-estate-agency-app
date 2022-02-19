import PageLink from "../PageLink";
import './Pagination.style.scss';
import React from "react";

const Pagination : React.FC<{pages: number, currentPage: number}> = ({pages, currentPage}) => {
    return <div className="Pagination">
        {Array.apply(null, Array(pages))
            .map((_, i) => <PageLink key={i} pageNumber={ i + 1 } isCurrent={i + 1 === currentPage}/>)}
    </div>
}

export default Pagination;