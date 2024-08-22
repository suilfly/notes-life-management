import { useCallback, useEffect, useRef } from 'react';
import './style.scoped.scss';

const img = new Image();
let cloneDom: HTMLElement;
let startOffset = {
  offsetX: 0,
  offsetY: 0,
};

function onDrageStartHandle(e: DragEvent) {
  replaceDragStyle(e);

  const draggableDom = e.target as HTMLElement;
  const root = draggableDom.closest('.type-item-wrapper');

  startOffset.offsetX = e.offsetX;
  startOffset.offsetY = e.offsetY;

  cloneDom = draggableDom.closest('.list-item').cloneNode(true) as HTMLElement;
  cloneDom.setAttribute('clone', '');
  cloneDom.style.transform = `translate3d(${e.clientX - e.offsetX}px, ${
    e.clientY - e.offsetY
  }px, 0)`;

  root.appendChild(cloneDom);
}

function replaceDragStyle(e) {
  e.dataTransfer.setDragImage(img, 0, 0);
}

function onDragOverHandle(e: DragEvent) {
  e.preventDefault();

  if (cloneDom) {
    cloneDom.style.transform = `translate3d(${
      e.clientX - startOffset.offsetX
    }px, ${e.clientY - startOffset.offsetY}px, 0)`;
  }
}

function onDragEndHandle() {
  if (cloneDom) {
    cloneDom.remove();
    cloneDom = null;
  }
}

export default function ToDoBoard({ typeList, updateHandle }) {
  const todoBoardDom = useRef<HTMLDivElement>(null);
  const onDropHandle = useCallback((e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const dropBox = target.closest('.list-item');
    const fromId = cloneDom.id;
    const toId = dropBox.id;
    cloneDom.remove();
    cloneDom = null;
    updateHandle(fromId, toId, 'after');
  }, []);

  const addDragEvent = useCallback(() => {
    document.body.addEventListener('dragstart', onDrageStartHandle);
    document.body.addEventListener('dragover', onDragOverHandle);
    document.body.addEventListener('dragend', onDragEndHandle);
    document.body.addEventListener('drop', onDropHandle);
  }, []);

  const removeDragEvent = useCallback(() => {
    document.body.removeEventListener('dragstart', onDrageStartHandle);
    document.body.removeEventListener('dragover', onDragOverHandle);
    document.body.removeEventListener('dragend', onDragEndHandle);
    document.body.removeEventListener('drop', onDropHandle);
  }, []);

  function renderContent(list) {
    if (!list) return;

    return list.map((li, index) => {
      return (
        <li className={`list-item bg-color12`} id={li.id} key={li.id}>
          <a className="task-item" href={`/${index}`}>
            <p>
              <span>{li.name}</span>
            </p>
            <div>
              <p>
                <span>{li.createdTime}</span>
              </p>
            </div>
          </a>
        </li>
      );
    });
  }

  useEffect(() => {
    img.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
    addDragEvent();
    return () => {
      removeDragEvent();
    };
  }, []);

  return (
    <div className="todo-board-wrapper" ref={todoBoardDom}>
      {typeList.map((item) => {
        return (
          <div
            id={item.id}
            key={item.id}
            className={`type-item-wrapper ${item.colorClassName}`}
          >
            <div className="bg-color13 type-container">
              <span>{item.name}</span>
              {renderContent(item?.children)}
              <p className="add-one font-color">+ new</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
