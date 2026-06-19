import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

export default function MainLayout({ children }) {
  const location = useLocation();
  // Question preview pages need full-height IDE layout (no padding, no scroll)
  const isPreview = /\/category\/.+\/.+/.test(location.pathname);

  return (
    <div className='layout-container'>
      <aside className='sidebar'>
        <Sidebar />
      </aside>
      <main className={`layout-main ${isPreview ? 'layout-main--ide' : 'layout-main--page'}`}>
        {children}
      </main>
    </div>
  );
}
