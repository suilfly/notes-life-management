import { useState } from 'react';
import ToDoBoard from './ToDoBoard';
import { generateRandomString } from '@/utils/index.ts';
import { ToDoItemObject } from './types';

export default function ToDo() {
  const [todoClass, setTodoClass] = useState<Array<ToDoItemObject>>([
    {
      id: generateRandomString(),
      name: 'ToDo',
      colorClassName: 'red',
      children: [
        {
          name: '写作业写作业写作业',
          createdTime: '2024-08-15',
          id: generateRandomString(),
        },
        {
          name: '写作业写作业写作业2',
          createdTime: '2024-08-13',
          id: generateRandomString(),
        },
        {
          name: '写作业写作业写作业1',
          createdTime: '2024-08-14',
          id: generateRandomString(),
        },
      ],
    },
    {
      id: generateRandomString(),
      name: 'Ing',
      colorClassName: 'blue',
      children: [
        {
          name: '写作业写作业写作业',
          createdTime: '2024-08-15',
          id: generateRandomString(),
        },
        {
          name: '写作业写作业d写作业',
          createdTime: '2024-08-15',
          id: generateRandomString(),
        },
      ],
    },
    {
      id: generateRandomString(),
      name: 'Done',
      colorClassName: 'green',
      children: [
        {
          name: '写作业写作业写作业',
          createdTime: '2024-08-15',
          id: generateRandomString(),
        },
        {
          name: '写作业写作s业写作业',
          createdTime: '2024-08-15',
          id: generateRandomString(),
        },
      ],
    },
  ]);

  /**
   * @param fromId 被拖拽项的id
   * @param toId 放置的项的id
   * @param position 放置在前还是后，'before', 'after'
   */
  function updateList(fromId: string, toId: string, position: string) {
    if (fromId === toId) return;

    let from = {
      index: null,
      parentIndex: null,
    };
    let to = {
      index: null,
      parentIndex: null,
    };

    todoClass.forEach((type, index) => {
      if (from.index === null || from.index === -1) {
        from.index = type.children.findIndex((item) => item.id === fromId);

        from.index !== -1 && (from.parentIndex = index);
      }

      if (to.index === null || to.index === -1) {
        to.index = type.children.findIndex((item) => item.id === toId);

        to.index !== -1 && (to.parentIndex = index);
      }
    });

    const fromItem = todoClass[from.parentIndex].children.splice(
      from.index,
      1
    )[0];

    todoClass[to.parentIndex].children.splice(
      position === 'before' ? to.index : to.index + 1,
      0,
      fromItem
    );

    setTodoClass(Array.from(todoClass));
  }

  return (
    <div>
      <ToDoBoard typeList={todoClass} updateHandle={updateList} />
    </div>
  );
}
