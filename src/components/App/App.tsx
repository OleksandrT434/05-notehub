import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteList from '../NoteList/NoteList';
import { useQuery, useMutation , keepPreviousData, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import NoteForm from '../NoteForm/NoteForm';
import type { Note } from '../../types/note';


interface PaginatedNotes {
  notes: Note[];
  totalPages: number;
}


import { useDebouncedCallback } from 'use-debounce';


export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setInputValue(value);
    setPage(1);
  }, 500);

  const { data, isLoading } = useQuery<PaginatedNotes>({
    queryKey: ['notes', page, inputValue],
    queryFn: () => fetchNotes(page, 12, inputValue),
    placeholderData: keepPreviousData
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  

    return (
      <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={debouncedSearch} />
        <button className={css.button} onClick={() => {setIsModalOpen(true)}}>
        Create note +
        </button>

      </header>

      {isLoading && <p>Loading notes...</p>}
      {!isLoading && notes.length === 0 && <p>No notes found.</p>}

      {!isLoading && notes.length > 0 && (
        <>
         
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              />
            )} <NoteList notes={notes} onDelete={handleDelete} />
          </>
        )}
        {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <NoteForm onClose={() => setIsModalOpen(false)} />
              </Modal>
        )}
      </div>
    );
}
