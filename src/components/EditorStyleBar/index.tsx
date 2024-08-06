import './style.scoped.scss';

const iconList = [
  '#note-b-text',
  '#note-i-text',
  '#note-s-text',
  '#note-u-text',
  '#note-text-color',
];

export default function EditorStyleBar() {
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
          <span key={item} className="note-icon-wrapper">
            <svg className="note-icon-symbol" aria-hidden="true">
              <use xlinkHref={item}></use>
            </svg>
          </span>
        );
      })}
    </div>
  );
}
