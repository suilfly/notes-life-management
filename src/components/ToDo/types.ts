export type todoChildObject = {
  name?: string;
  createdTime?: string;
  id: string;
  template?: boolean;
};

export interface ToDoItemObject {
  id: string;
  name: string;
  colorClassName: string;
  children?: todoChildObject[];
}

export type editParameter = {
  id: string;
  editName?: string;
  editTime?: string;
};
