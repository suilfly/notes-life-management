import TextEditor from '@/components/TextEditor/index.tsx';
import '@/assets/editor.scoped.scss';
import EditorStyleBar from '@/components/EditorStyleBar/index.tsx';
import { useState } from 'react';

export default function Editor() {
  const [styleType, setStyleType] = useState('');
  function onClickEditorButtonHandle(type: string) {
    setStyleType(type);
  }
  return (
    <div className="note-editor-wrapper">
      <EditorStyleBar clickButtonHandle={onClickEditorButtonHandle} />
      <TextEditor styleType={styleType} />
    </div>
  );
}
