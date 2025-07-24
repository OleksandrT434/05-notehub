export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NewNoteData {
    title: string;
    content: string;
    tag: string;
  }
  
  export interface PaginatedNotes {
    notes: Note[];
    page: number;
    perPage: number;
    totalPages: number;
  }