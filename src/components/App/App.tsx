import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteList from '../NoteList/NoteList';

import { useDebouncedCallback } from 'use-debounce';


export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputUse = useDebouncedCallback(
    (newImputSearch: string) =>  setInputValue(newImputSearch) ,
    500);

    return (
      <div className={css.app}>
        <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleInputUse} />
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
  
        <NoteList page={page} setPage={setPage} search={inputValue}>
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
