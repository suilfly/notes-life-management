export interface NavObject {
  name: string;
  icon: string;
  path?: string;
}

export type LeftNavProps = {
  width?: string;
  content?: NavObject[];
  onClickMenu?: () => void;
  isRouteNav?: boolean;
};
