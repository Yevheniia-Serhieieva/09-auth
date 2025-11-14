import NoteList from "@/components/NoteList/NoteList";
import { Note } from "@/types/note";

const AllNotesPaage = ({ notes }: { notes: Note[] }) => {
  return (
    <div>
      <h1>All Notes</h1>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default AllNotesPaage;
