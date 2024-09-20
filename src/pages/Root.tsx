import { Outlet } from 'react-router';
import LeftNav from '@/components/LeftNav/index';

export default function Root() {
  return (
    <div className="note-app-wrapper">
      <LeftNav />
      <Outlet />
    </div>
  );
}
