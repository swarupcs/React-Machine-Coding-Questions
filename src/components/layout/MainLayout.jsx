import Sidebar from './Sidebar';
import './MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className='layout-container'>
      <Sidebar />
      <main className='layout-main'>{children}</main>
    </div>
  );
}
