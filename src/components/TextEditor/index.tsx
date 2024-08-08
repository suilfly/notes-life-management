import { ChangeEvent, useEffect, useState } from 'react';
import './text-editor.scoped.scss';
import '@/assets/editor.style.scss';
import { generateRandomString } from '@/utils/index.ts';
import { TextNodeObject } from './types';

export default function TextEditor() {
  const id = generateRandomString();
  const [content, setContent] = useState([
    {
      id: generateRandomString(),
      children: [
        {
          id: generateRandomString(),
        },
      ],
    },
  ] as TextNodeObject[]);

  function initTextContent() {
    const pra = document.createElement('note-p');
    const ptext = document.createElement('note-text');
    ptext.innerText = ' ';
    pra.appendChild(ptext);
    document.getElementById(id).appendChild(pra);
  }

  function clearNodes() {
    Array.from(document.getElementsByTagName('p')).forEach((item) => {
      item.remove();
    });
  }

  useEffect(() => {
    const root = document.getElementById(id);
    initTextContent();

    document.addEventListener('selectionchange', (event) => {
      const activeElement = document.activeElement;
      const selection = getSelection();
      const focusNode = selection.focusNode;
      const ranges = selection.getRangeAt(0);
      if (typeof focusNode.nodeValue === 'string') {
        if (ranges.startContainer === ranges.endContainer) {
        } else {
        }
      }
      console.log(event, selection, selection.getRangeAt(0));
    });

    return () => {
      clearNodes();
    };
  }, []);

  return <div id={id} className="note-editor" contentEditable></div>;
}
