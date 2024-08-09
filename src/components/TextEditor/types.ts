export interface TextNodeObject {
  id: string;
  children?: TextNodeObject[];
  text?: string;
  attributes?: string[];
  style?: React.CSSProperties;
}

export interface SelectRangeObject {
  startContainer: Element;
  endContainer: Element;
  startPart: string;
  selectedPart: string;
  endPart: string;
}
