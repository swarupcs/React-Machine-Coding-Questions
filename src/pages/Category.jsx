import { useParams, Link } from 'react-router-dom';
import './Category.css';

// Updated glob syntax - no 'as' option needed for default imports
const modules = import.meta.glob('../questions/*/*/App.jsx');

export default function Category() {
  const { categoryName } = useParams();

  const questions = [];

  Object.keys(modules).forEach((path) => {
    const parts = path.split('/');

    const category = parts[2];
    const question = parts[3];

    if (category === categoryName) {
      questions.push(question);
    }
  });

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
