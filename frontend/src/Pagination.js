import PageLink from "./PageLink";
import {useState} from "react";
import './Pagination.style.scss';

const Pagination = ({pages, currentPage}) => {
    return <div className="Pagination">
        {[...Array(pages).keys()].map((_, i) => <PageLink key={i} pageNumber={ i + 1 } isCurrent={i + 1 === currentPage}/>)}
    </div>
}

export default Pagination;