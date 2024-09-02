import { useCallback, useEffect, useRef } from 'react';
import './style.scoped.scss';
import { todoChildObject, ToDoItemObject } from './types';

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

function replaceDragStyle(e: DragEvent) {
  e.dataTransfer.setDragImage(img, 0, 0);
}

function onDragEndHandle() {
  if (cloneDom) {
    cloneDom.remove();
    cloneDom = null;
  }
}

function setImgBeforeDrag(img: HTMLImageElement) {
  img.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
}

export default function ToDoBoard({ typeList, updateHandle }) {
  const dragHoverType = useRef('after');
  const editName = useRef('');
  const editTime = useRef('');

  const onDropHandle = useCallback((e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const dropBox = target.closest('.list-item');
    const fromId = cloneDom.id;
    const toId = dropBox.id;

    if (dropBox?.classList?.contains('drag-target')) {
      dropBox.classList.remove('drag-target', dragHoverType.current);
    }

    cloneDom.remove();
    cloneDom = null;
    updateHandle('drag', fromId, toId, dragHoverType.current);
  }, []);

  const onDragOverHandle = useCallback((e: DragEvent) => {
    e.preventDefault();
    const dragOverDom = (e.target as HTMLElement).closest(
      '.list-item'
    ) as HTMLElement;

    if (cloneDom) {
      cloneDom.style.transform = `translate3d(${
        e.clientX - startOffset.offsetX
      }px, ${e.clientY - startOffset.offsetY}px, 0)`;
    }

    if (dragOverDom) {
      if (dragOverDom.classList.contains('drag-target')) {
        dragOverDom.classList.remove('drag-target', dragHoverType.current);
      }

      const offsetTop = dragOverDom.offsetTop;
      const height = dragOverDom.clientHeight;
      const dragTop = e.clientY - startOffset.offsetY;
      if (dragTop < offsetTop + height / 3) {
        dragHoverType.current = 'before';
      } else {
        dragHoverType.current = 'after';
      }

      if (cloneDom.id !== dragOverDom.id) {
        dragOverDom.classList.add('drag-target', dragHoverType.current);
      }
    }
  }, []);

  const onDragLeaveHandle = useCallback((e: DragEvent) => {
    const leaveDom = e.target as HTMLElement;
    const rootDom = leaveDom.closest('.list-item');
    if (rootDom) {
      rootDom.classList.remove('drag-target', dragHoverType.current);
    }
  }, []);

  const addDragEvent = useCallback(() => {
    document.body.addEventListener('dragstart', onDrageStartHandle);
    document.body.addEventListener('dragover', onDragOverHandle);
    document.body.addEventListener('dragend', onDragEndHandle);
    document.body.addEventListener('drop', onDropHandle);
    document.body.addEventListener('dragleave', onDragLeaveHandle);
  }, []);

  const removeDragEvent = useCallback(() => {
    document.body.removeEventListener('dragstart', onDrageStartHandle);
    document.body.removeEventListener('dragover', onDragOverHandle);
    document.body.removeEventListener('dragend', onDragEndHandle);
    document.body.removeEventListener('drop', onDropHandle);
    document.body.removeEventListener('dragleave', onDragLeaveHandle);
  }, []);

  function editBlurHandle(id: string) {
    updateHandle('edit', {
      id,
      editName: editName.current,
      editTime: editTime.current,
    });
  }

  function saveEditName(e: React.FormEvent) {
    editName.current = (e.target as HTMLInputElement).value;
  }

  function saveEditTime(e: React.FormEvent) {
    editTime.current = (e.target as HTMLInputElement).value;
  }

  function renderTaskTemplate(id: string) {
    return (
      <div className="edit-type" onBlur={() => editBlurHandle(id)}>
        <p className="task-row">
          <svg className="icon">
            <use xlinkHref="#edit-icon"></use>
          </svg>
          <input
            autoFocus
            placeholder="Type a name"
            onBlur={(e) => e.stopPropagation()}
            onInput={saveEditName}
          />
        </p>
        <p className="task-row">
          <svg className="icon calendar-icon">
            <use xlinkHref="#calendar-icon"></use>
          </svg>
          <input placeholder="Add Deadline" onInput={saveEditTime} />
        </p>
      </div>
    );
  }

  function renderContent(list: todoChildObject[]) {
    if (!list) return;

    return list.map((li, index) => {
      return (
        <li className={`list-item bg-color12`} id={li.id} key={li.id}>
          <a
            className="task-item"
            href={`/${index}`}
            rel="noopener noreferer"
            onClick={(e) => e.preventDefault()}
          >
            {li?.name && (
              <p className="task-row">
                <span>{li.name}</span>
              </p>
            )}

            {li?.createdTime && (
              <p className="task-row">
                <span>{li.createdTime}</span>
              </p>
            )}
            {li?.template && renderTaskTemplate(li.id)}
          </a>
        </li>
      );
    });
  }

  function addNewOne(id: string) {
    updateHandle('add', id);
  }

  useEffect(() => {
    setImgBeforeDrag(img);
    addDragEvent();
    return () => {
      removeDragEvent();
    };
  }, []);

  return (
    <div className="todo-board-wrapper">
      {typeList.map((item: ToDoItemObject) => {
        return (
          <div
            id={item.id}
            key={item.id}
            className={`type-item-wrapper ${item.colorClassName}`}
          >
            <div className="bg-color13 type-container">
              <span className="task-name bg-color10">
                <i className="bg-color3"></i>
                {item.name}
              </span>
              {renderContent(item?.children)}
              <p
                className="add-one theme-font-color"
                onClick={() => addNewOne(item.id)}
              >
                + new
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
