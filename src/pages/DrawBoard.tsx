import * as go from 'gojs';
import '@/assets/draw-board.scoped.scss';
import { useEffect, useState } from 'react';

let diagram: go.Diagram;
const size = new go.Size(15, 15);
const grid = new go.Panel('Grid', { gridCellSize: size }).add(
  new go.Shape('LineH', {
    strokeWidth: 0.5,
    stroke: 'rgba(255,255,255,0.05)',
  }),
  new go.Shape('LineV', {
    strokeWidth: 0.5,
    stroke: 'rgba(255,255,255,0.05)',
  })
);

export default function DrawBoard() {
  const [diagramNav, setDiagramNav] = useState([
    {
      deselectedName: '显示网格',
      name: '隐藏网格',
      href: '#diagram-grid-icon',
      isSelected: false,
      clickHandle: (index: number) => {
        const item = diagramNav[index];
        item.isSelected = !diagramNav[index].isSelected;
        diagram.grid.visible = item.isSelected;

        setDiagramNav([...diagramNav]);
      },
    },
  ]);

  const initDiagram = () => {
    diagram = new go.Diagram('diagram-div', {
      grid,
      'grid.visible': false,
    });
  };

  const renderDiagramNav = () => {
    return diagramNav.map(
      ({ isSelected, name, deselectedName, href, clickHandle }, index) => {
        return (
          <span
            className={`icon-wrapper ${isSelected ? 'icon-selected' : ''}`}
            title={isSelected ? name : deselectedName}
            key={name}
            onClick={() => clickHandle(index)}
          >
            <svg className="diagram-nav-icon">
              <use xlinkHref={href}></use>
            </svg>
          </span>
        );
      }
    );
  };

  useEffect(() => {
    initDiagram();
    return () => {
      diagram.div = null;
    };
  }, []);

  return (
    <div className="draw-board-wrapper">
      <div className="tool-bar-wrapper">{renderDiagramNav()}</div>
      <div className="board-wrapper">
        <div className="diagram" id="diagram-div"></div>
      </div>
    </div>
  );
}
