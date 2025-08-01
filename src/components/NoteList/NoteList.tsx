import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';


interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
    mutationFn: deleteNote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  if (notes.length === 0) return <p>No notes found.</p>;
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };
    return (
      <>
        <ul className={css.list}>
          {notes.map((note: Note) => (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button onClick={() => handleDelete(note.id)} className={css.button}>Delete
          </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  