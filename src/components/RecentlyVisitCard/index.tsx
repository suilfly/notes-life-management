import { RecentlyVisitCardObject } from './types';
import logo from '@/assets/img/clipping_yellow.svg';
import './index.scoped.scss';

export default function RecentliVisitCard(config: RecentlyVisitCardObject) {
  const {
    width = '144px',
    height = '144px',
    helloBg,
    titleLogo = logo,
    title,
    onclickHandle,
  } = config;
  return (
    <div
      className="note-visit-card"
      style={{
        width,
        height,
      }}
      onClick={() => onclickHandle()}
    >
      <div className="card-top-wrapper">
        {helloBg ? (
          <img className="top-bg" src={helloBg} />
        ) : (
          <div className="top-bg-holder"></div>
        )}
      </div>
      <div className="card-info-wrapper">
        <img className="info-logo" src={titleLogo} />
        <div className="info-title">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
}
