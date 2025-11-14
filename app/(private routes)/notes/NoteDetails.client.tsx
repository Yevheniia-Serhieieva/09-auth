"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import css from "./NoteDetails.module.css";
import ErrorNote from "./error";
import { fetchNoteById } from "@/lib/api/clientApi";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;
  if (isError || !note) return <ErrorNote error={error as Error} />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {note.updatedAt
            ? `Updated at: ${note.updatedAt}`
            : `Created at: ${note.createdAt}`}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
