import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

import { getQuestionsRegistry } from '../utils/registry';

export default function Home() {
  const categories = new Set();
  const navigate = useNavigate();
  const questions = getQuestionsRegistry();

  questions.forEach(q => {
    categories.add(q.category);
  });

  return (
    <div className='home-container animate-fadeIn'>
      <div className='home-header'>
        <h1 className='home-title'>MCQ Library</h1>

        <div className='home-actions'>
          <button onClick={() => navigate('/overlapping-circles')}>
            🎨 Overlapping Circles
          </button>
          <button onClick={() => navigate('/popover')}>💬 PopOver</button>
        </div>
      </div>

      <div>
        <h2 className='home-section-title'>Categories</h2>
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
    </div>
  );
}
