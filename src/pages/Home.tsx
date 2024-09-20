import { getTimeArea } from '@/utils/index.ts';
import '@/assets/home.scoped.scss';
import RecentliVisitCard from '@/components/RecentlyVisitCard/index';
import bg from '@/assets/img/visit-card-bg.jpg';
import addIcon from '@/assets/img/add-page.svg';
import recentlyIcon from '@/assets/img/time.svg';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigator = useNavigate();

  function goToEditor() {
    navigator('/editor');
  }

  function goToDrawBoard() {
    navigator('/draw-board');
  }

  return (
    <div className="note-home-wrapper">
      <header>Good {getTimeArea()}</header>
      <div className="note-home-content">
        <div className="note-recently-visit-wrapper">
          <p className="tag">
            <img src={recentlyIcon} />
            <span>最近浏览</span>
          </p>
          <div className="note-recently-visit">
            <RecentliVisitCard
              title="新建页面"
              titleLogo={addIcon}
              onclickHandle={goToEditor}
            />
            <RecentliVisitCard
              title="新建画板"
              titleLogo={addIcon}
              onclickHandle={goToDrawBoard}
            />
            <RecentliVisitCard title="kanban borad" helloBg={bg} />
          </div>
        </div>
      </div>
    </div>
  );
}
