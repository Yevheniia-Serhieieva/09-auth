"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import Loading from "@/app/loading";
import { fetchNoteById } from "@/lib/api/clientApi";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;
  if (isError || !note) return <div>Note not found</div>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <Modal onClose={() => router.back()}>
          <h2 className={css.header}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <button className={css.backBtn} onClick={() => router.back()}>
            Back
          </button>
        </Modal>
      </div>
    </div>
  );
}
