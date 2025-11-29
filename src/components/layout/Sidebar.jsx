import { Link, useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const questionModules = import.meta.glob('../../questions/*/App.jsx');

export default function Sidebar() {
  const location = useLocation();

  const questionNames = Object.keys(questionModules).map((path) => {
    return path.split('/')[2];
  });

  return (
    <div className='w-64 bg-background border-r'>
      <h2 className='text-xl font-semibold p-4 border-b'>MCQ Library</h2>

      <ScrollArea className='h-[calc(100vh-60px)] px-2'>
        <ul className='space-y-1'>
          <li>
            <Link
              to='/'
              className={`block p-2 rounded hover:bg-muted ${
                location.pathname === '/' ? 'bg-muted' : ''
              }`}
            >
              🏠 Home
            </Link>
          </li>

          {questionNames.map((name) => (
            <li key={name}>
              <Link
                to={`/${name}`}
                className={`block p-2 rounded hover:bg-muted ${
                  location.pathname === `/${name}` ? 'bg-muted' : ''
                }`}
              >
                📌 {name}
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
