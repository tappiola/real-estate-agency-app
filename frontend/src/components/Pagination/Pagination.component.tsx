import React from 'react';
import PageLink from '../PageLink';
import './Pagination.style.scss';

const Pagination : React.FC<{
    pages: number,
    searchParams: URLSearchParams
}> = ({ pages, searchParams }) => {
    const currentPage = Number(searchParams.get('page')) || 1;

    return (
      <div className="Pagination">
        {[...Array(pages)]
            .map((_, i) => (
              <PageLink
                key={i}
                pageNumber={i + 1}
                isCurrent={i + 1 === currentPage}
                searchParams={searchParams}
              />
            ))}
      </div>
    );
};

export default Pagination;
