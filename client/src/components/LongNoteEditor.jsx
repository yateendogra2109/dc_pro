// This component is deprecated - use LongNoteForm instead
import LongNoteForm from './LongNoteForm';

export default function LongNoteEditor({ onSave }) {
  return <LongNoteForm onClose={onSave} />;
}
