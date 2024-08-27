export type todoChildObject = {
  name: string;
  createdTime: string;
  id: string;
};

export interface ToDoItemObject {
  id: string;
  name: string;
  colorClassName: string;
  children?: Array<todoChildObject>;
}
