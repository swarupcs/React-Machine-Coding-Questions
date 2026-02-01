import Sidebar from './Sidebar';
import './MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className='layout-container'>
      <aside className='sidebar'>
        <Sidebar />
      </aside>
      <main className='layout-main'>{children}</main>
    </div>
  );
}
