import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    children?: (totalPages: number) => React.ReactNode;
  }
  

export default function NoteList({ page, children }: NoteListProps) {
    const perPage = 12;
    const queryClient = useQueryClient();
  
    const { data, isLoading, } = useQuery({
      queryKey: ['notes', page],
      queryFn: () => fetchNotes(page, perPage),
      placeholderData: keepPreviousData
    });
  
    const deleteMutation = useMutation({
      mutationFn: deleteNote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
    });
  
    if (isLoading) return <p>Loading notes...</p>;
  
    const notes = data?.notes || [];
    const totalPages = data?.totalPages || 1;
  
    if (notes.length === 0) return <p>No notes found.</p>;
  
    return (
      <>
        {totalPages > 1 && children?.(totalPages)}
        <ul className={css.list}>
          {notes.map((note: Note) => (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button type="button" className={css.button} onClick={() => deleteMutation.mutate(note.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
  
        
      </>
    );
  }
  