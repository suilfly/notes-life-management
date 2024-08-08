export interface TextNodeObject {
  id: string;
  children?: TextNodeObject[];
  text?: string;
  attributes?: string[];
  style?: React.CSSProperties;
}
