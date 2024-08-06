import { useEffect, useState } from 'react';
import './text-editor.scoped.scss';
import '@/assets/editor.style.scss';
import { generateRandomString } from '@/utils/index.ts';

export default function TextEditor() {
  const id = generateRandomString();
  const [content, setContent] = useState([
    {
      id: generateRandomString(),
      children: [
        {
          id: generateRandomString(),
          text: '1',
        },
        {
          id: generateRandomString(),
          text: '34',
          attributes: ['note-bold'],
          style: {
            backgroundColor: 'rgb(251, 222, 40)',
          },
        },
      ],
    },
  ]);

  function generateTextContent() {
    content.map((p) => {
      const pra = document.createElement('note-p');
      pra.id = p.id;

      if (p.children) {
        p.children.forEach((child) => {
          const ptext = document.createElement('note-text');
          ptext.id = child.id;
          ptext.innerText = child.text;
          child.attributes &&
            child.attributes.forEach((attr) =>
              ptext.setAttribute(attr, 'true')
            );
          child.style &&
            Object.keys(child.style).forEach((key) => {
              ptext.style[key] = child.style[key];
            });
          pra.appendChild(ptext);
        });
      }
      document.getElementById(id).appendChild(pra);
    });
  }

  function clearNodes() {
    Array.from(document.getElementsByTagName('note-p')).forEach((item) => {
      item.remove();
    });
  }

  useEffect(() => {
    generateTextContent();
    return () => {
      clearNodes();
    };
  });
  return <div id={id} className="note-editor" contentEditable></div>;
}
