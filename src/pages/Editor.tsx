import TextEditor from '@/components/TextEditor/index.tsx';
import '@/assets/editor.scoped.scss';

export default function Editor() {
  return (
    <div className="note-editor-wrapper">
      <TextEditor />
    </div>
  );
}
