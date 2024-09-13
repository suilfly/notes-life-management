import { useEffect, useState } from 'react';
import DragCreatingTool from '@/extensions/DragCreatingTool.js';
import './style.scoped.scss';
import * as go from 'gojs';

export default function DrawBoard() {
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

  const [diagramNav, setDiagramNav] = useState([
    {
      deselectedName: '显示网格',
      name: '隐藏网格',
      href: '#diagram-grid-icon',
      isSelected: true,
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
      'grid.visible': true,

      nodeTemplate: new go.Node('Auto', {
        minSize: new go.Size(60, 20),
        resizable: true,
      })
        .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)
        .bindTwoWay('position', 'pos', go.Point.parse, go.Point.stringify)
        // temporarily put selected nodes in Foreground layer
        .bindObject('layerName', 'isSelected', (s) => (s ? 'Foreground' : ''))
        .add(
          new go.Shape('Rectangle').bind('fill', 'color'),
          new go.TextBlock({ margin: 2 }).bind('text', 'color')
        ),
    });

    diagram.toolManager.mouseMoveTools.insertAt(
      2,
      new DragCreatingTool({
        isEnabled: true, // disabled by the checkbox
        delay: 0, // always canStart(), so PanningTool never gets the chance to run
        box: new go.Part({ layerName: 'Tool' }).add(
          new go.Shape({
            name: 'SHAPE',
            fill: null,
            stroke: 'red',
            strokeWidth: 2,
          })
        ),
        archetypeNodeData: { color: null }, // initial properties shared by all nodes
        insertPart: function (bounds) {
          // method override of DragCreatingTool.insertPart
          // use a different color each time
          this.archetypeNodeData.color = go.Brush.randomColor();
          // call the base method to do normal behavior and return its result
          return DragCreatingTool.prototype.insertPart.call(this, bounds);
        },
      })
    );
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
