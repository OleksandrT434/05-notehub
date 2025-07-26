import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NewNoteData} from '../types/note';

export interface PaginatedNotes {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

const baseURL = 'https://notehub-public.goit.study/api'
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL,
  headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
  },
});

export async function fetchNotes(page: number = 1, perPage: number = 12, search: string, sortBy?: 'created' | 'updated'): Promise<PaginatedNotes> {
  const params: Record<string, string | number> = { page, perPage };

  if (search && search.trim()) {
    params.search = search.trim();
  }
  if (sortBy) {
    params.sortBy = sortBy;
  }
  const response:AxiosResponse<PaginatedNotes> = await api.get('/notes', { params });
  return response.data;
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post('/notes', noteData);
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}
