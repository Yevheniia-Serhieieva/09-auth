import { User } from "@/types/user";
import { NewNoteData, nextServer } from "./api";
import { Note } from "@/types/note";

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username: string;
};

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const { data: updatedUser } = await nextServer.patch<User>(
    "/users/me",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return updatedUser;
};

export const getNotes = async (
  page: number = 1,
  perPage: number = 12,
  search?: string,
  tag?: string
): Promise<NoteListResponse> => {
  const response = await nextServer.get<NoteListResponse>(`/notes`, {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag && tag !== "all" ? { tag } : {}),
    },
    headers: {
      accept: "application/json",
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};

export const createNote = async (note: NewNoteData) => {
  const response = await nextServer.post<Note>(`/notes`, note, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
    },
  });

  return response.data;
};
