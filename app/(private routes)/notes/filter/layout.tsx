import css from './LayoutNotes.module.css';

type SidebarNotesProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: SidebarNotesProps) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div>{children}</div>
    </div>
  );
};

export default NotesLayout;
