import { useParams, Link } from 'react-router-dom';
import './Category.css';

import { getQuestionsRegistry } from '../utils/registry';

export default function Category() {
  const { categoryName } = useParams();

  const allQuestions = getQuestionsRegistry();
  const questions = allQuestions
    .filter(q => q.category === categoryName)
    .map(q => q.name);

  return (
    <div className='category-container animate-fadeIn'>
      {/* Breadcrumb */}
      <div className='category-breadcrumb'>
        <Link to='/'>Home</Link>
        <span>›</span>
        <span>{categoryName}</span>
      </div>

      <h1 className='category-title'>{categoryName}</h1>

      {questions.length > 0 ? (
        <div className='questions-grid'>
          {questions.map((q) => (
            <Link key={q} to={`/category/${categoryName}/${q}`}>
              <div className='question-card'>
                <h2 className='question-title'>{q}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='category-empty'>
          <div className='category-empty-icon'>📭</div>
          <div className='category-empty-text'>
            No questions available in this category
          </div>
        </div>
      )}
    </div>
  );
}
