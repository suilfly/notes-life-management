import { useState } from 'react';
import ToDoBoard from './ToDoBoard';
import { generateRandomString } from '@/utils/index.ts';

export default function ToDo() {
  const [todoClass, setTodoClass] = useState([
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
      ],
    },
  ]);
  return (
    <div>
      <ToDoBoard typeList={todoClass} />
    </div>
  );
}
