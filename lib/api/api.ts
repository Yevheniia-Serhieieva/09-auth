import axios, { AxiosError } from "axios";
// import { Note } from "@/types/note";

// interface NoteListResponse {
//   notes: Note[];
//   totalPages: number;
// }

export type Tag = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

export type ApiError = AxiosError<{ error: string }>;

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

// export const getNotes = async (
//   page: number = 1,
//   perPage: number = 12,
//   search?: string,
//   tag?: string
// ): Promise<NoteListResponse> => {
//   const response = await nextServer.get<NoteListResponse>(`/notes`, {
//     params: {
//       page,
//       perPage,
//       ...(search ? { search } : {}),
//       ...(tag && tag !== "all" ? { tag } : {}),
//     },
//     headers: {
//       accept: "application/json",
//     },
//   });

//   return response.data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const response = await nextServer.get<Note>(`/notes/${id}`, {
//     headers: {
//       accept: "application/json",
//     },
//   });
//   return response.data;
// };

// export const createNote = async (note: NewNoteData) => {
//   const response = await nextServer.post<Note>(`/notes`, note, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return response.data;
// };

// export const deleteNote = async (id: string): Promise<Note> => {
//   const response = await nextServer.delete<Note>(`/notes/${id}`, {
//     headers: {
//       accept: "application/json",
//     },
//   });

//   return response.data;
// };
