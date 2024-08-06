import TextEditor from '@/components/TextEditor/index.tsx';
import '@/assets/editor.scoped.scss';
import EditorStyleBar from '@/components/EditorStyleBar/index.tsx';

export default function Editor() {
  return (
    <div className="note-editor-wrapper">
      <EditorStyleBar />
      <TextEditor />
    </div>
  );
}
