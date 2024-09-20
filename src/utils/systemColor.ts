type systemColorType = {
  gridLineColor: string;
  toolBoxColor: string;
  RectangleStroke: string;
};

const systemColorMap = {
  dark: {
    gridLineColor: 'rgba(255,255,255,0.05)',
    toolBoxColor: 'rgba(255,255,255,0.4)',
    RectangleStroke: '#fff',
  },
  light: {
    gridLineColor: 'rgba(0,0,0,0.09)',
    toolBoxColor: 'rgba(0,0,0,0.2)',
    RectangleStroke: '#000',
  },
};

export const getSystemColors = (): systemColorType => {
  const systemMode = document.documentElement.getAttribute('data-theme');
  return systemColorMap[systemMode];
};
