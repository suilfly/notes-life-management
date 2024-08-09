import { useEffect, useRef } from 'react';
import './text-editor.scoped.scss';
import '@/assets/editor.style.scss';
import { generateRandomString } from '@/utils/index.ts';
import { SelectRangeObject } from './types';

const id = generateRandomString();
const styleMap = new Map<string, React.CSSProperties>([
  [
    '#note-b-text',
    {
      fontWeight: 700,
    },
  ],
  [
    '#note-i-text',
    {
      fontStyle: 'italic',
    },
  ],
]);

let selectedRange: SelectRangeObject | null = null;

export default function TextEditor({ styleType }) {
  function initTextContent() {
    const pra = document.createElement('note-p');
    const ptext = document.createElement('note-text');
    ptext.innerText = ' ';
    pra.appendChild(ptext);
    document.getElementById(id).appendChild(pra);
  }

  function clearNodes() {
    Array.from(document.getElementsByTagName('note-p')).forEach((item) => {
      item.remove();
    });
  }

  useEffect(() => {
    initTextContent();

    document.addEventListener('selectionchange', () => {
      const selection = getSelection();
      const focusNode = selection.focusNode;
      const ranges = selection.getRangeAt(0);
      const nodeValue = focusNode.nodeValue;
      if (selection.type === 'Caret') {
        return;
      }
      if (!selectedRange) {
        selectedRange = {
          startContainer: null,
          endContainer: null,
          startPart: null,
          selectedPart: null,
          endPart: null,
        };
      }

      if (typeof nodeValue === 'string') {
        selectedRange.startContainer = ranges.startContainer.parentElement;
        selectedRange.endContainer = ranges.endContainer.parentElement;
        if (ranges.startContainer === ranges.endContainer) {
          selectedRange.startPart = nodeValue.slice(0, ranges.startOffset);
          selectedRange.selectedPart = nodeValue.slice(
            ranges.startOffset,
            ranges.endOffset
          );
          selectedRange.endPart = nodeValue.slice(ranges.endOffset);
        } else {
        }
      }
    });

    return () => {
      clearNodes();
    };
  }, []);

  useEffect(() => {
    if (!styleType) return;

    const style = styleMap.get(styleType);
    const startDom = selectedRange.startContainer;
    const endDom = selectedRange.endContainer;

    if (startDom === endDom) {
      const repaceDOms = [
        selectedRange.startPart,
        selectedRange.selectedPart,
        selectedRange.endPart,
      ].map((text, index) => {
        const dom = document.createElement('note-text');
        dom.innerText = text;
        if (index === 1) {
          Object.keys(style).forEach((key) => {
            dom.style[key] = style[key];
          });
        }
        return dom;
      });

      startDom.replaceWith(...repaceDOms);
    }
  }, [styleType]);

  return <div id={id} className="note-editor" contentEditable></div>;
}
