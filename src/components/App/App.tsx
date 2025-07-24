import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteList from '../NoteList/NoteList';


export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
  
        <NoteList page={page} setPage={setPage}>
          {(totalPages) => (
            <Pagination
              currentPage={page}
              pageCount={totalPages}
              setPage={setPage}
            />
          )}
        </NoteList>
  
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    );
  }
