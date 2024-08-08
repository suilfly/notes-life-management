import './style.scoped.scss';

export default function EditorStyleBar() {
  const iconList = [
    {
      id: '#note-b-text',
      callback: () => {
        getCursorSelection();
      },
    },
    {
      id: '#note-i-text',
      callback: getCursorSelection,
    },
    {
      id: '#note-s-text',
      callback: getCursorSelection,
    },
    {
      id: '#note-u-text',
      callback: getCursorSelection,
    },
    {
      id: '#note-text-color',
      callback: getCursorSelection,
    },
  ];

  function getCursorSelection() {
    const selection = window.getSelection();
    console.log(selection.toString());
  }

  return (
    <div
      className="note-editor-bar-wrapper"
      style={
        {
          '--note-font-color': 'blue',
        } as React.CSSProperties
      }
    >
      {iconList.map((item) => {
        return (
          <span
            key={item.id}
            className="note-icon-wrapper"
            onClick={item.callback}
          >
            <svg className="note-icon-symbol" aria-hidden="true">
              <use xlinkHref={item.id}></use>
            </svg>
          </span>
        );
      })}
    </div>
  );
}
