import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <main className='flex-1 p-6 overflow-auto bg-muted/30'>{children}</main>
    </div>
  );
}
