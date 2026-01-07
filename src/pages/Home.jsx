import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const modules = import.meta.glob('../questions/*/*/App.jsx');

export default function Home() {
  const categories = new Set();

  const navigate = useNavigate();

  Object.keys(modules).forEach((path) => {
    const parts = path.split('/');
    const category = parts[2];
    categories.add(category);
  });

  return (
    <div className='home-container'>
      <div>
        <button onClick={() => navigate('/overlapping-circles')}>
          Overlapping Circles
        </button>
      </div>

      <div>
        <button onClick={() => navigate('/pop-over')}>
          PopOver
        </button>
      </div>
      <h1 className='home-title'>Categories</h1>

      <div className='home-grid'>
        {[...categories].map((cat) => (
          <Link key={cat} to={`/category/${cat}`}>
            <div className='home-card'>
              <h2 className='home-card-title'>{cat}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
