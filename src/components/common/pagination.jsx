import React from 'react';
import { range } from "lodash"

const Pagination = ({ totalCourse, currentPage, perPage, onPageChange }) => {
    const totalPage = Math.ceil(totalCourse / perPage)
    const pages = range(1, totalPage + 1)
    if(pages===1) return null;

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pages.map(page => (
                    <li key={page} className={page===currentPage ? "page-item active" :"page-item"}>
                        <a className="page-link" style={{cursor:"pointer"}}  onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}

            </ul>
        </nav>
    );
}

export default Pagination;