import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';


interface PaginationProps {
    pageCount: number;
    setPage: (page: number) => void;
    currentPage?: number;
}



export default function Pagination({ pageCount, setPage, currentPage = 0 }: PaginationProps) {
    if (pageCount <= 1)
    return null;
  
  
    return (
      <ReactPaginate
        className={css.pagination}
        pageCount={pageCount}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={currentPage - 1}
        nextLabel="→"
        previousLabel="←"
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        activeClassName={css.active}
        renderOnZeroPageCount={null}
        
      />
    );
  }
