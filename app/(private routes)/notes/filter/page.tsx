import NoteList from "@/components/NoteList/NoteList";
import { getNotes } from "@/lib/api/clientApi";
import { Note } from "@/types/note";

export default async function AllNotesPaage() {
  let notes: Note[] = [];

  try {
    const responce = await getNotes();
    notes = responce?.notes || [];
  } catch (err) {
    console.error(err);
  }
  return (
    <div>
      <h1>All Notes</h1>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
