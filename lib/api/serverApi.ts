import { cookies } from "next/headers";
import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { AxiosError } from "axios";
import { NoteListResponse } from "./clientApi";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerNoteById = async (id: string): Promise<Note | null> => {
  const cookieStore = await cookies();

  try {
    const { data } = await nextServer.get<Note>(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
        Accept: "application/json",
      },
    });
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response?.status === 404 ? null : Promise.reject(err);
    }
    throw err;
  }
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
