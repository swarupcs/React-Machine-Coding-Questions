import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';

// Updated glob syntax - no 'as' option needed for default imports
const modules = import.meta.glob('../../questions/*/*/App.jsx');

export default function Sidebar() {
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState(null);

  // Build categories: { "akshay-saini": ["accordion", "todo-list", ...] }
  const categories = {};

  Object.keys(modules).forEach((path) => {
    // Example path:
    // "../../questions/akshay-saini/accordion/App.jsx"
    const parts = path.split('/');

    const category = parts[3]; // akshay-saini
    const question = parts[4]; // accordion

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push(question);
  });

  const toggle = (cat) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  return (
    <div className='sidebar'>
      <h2 className='sidebar-title'>MCQ Library</h2>

      <ul className='sidebar-list'>
        {/* Home */}
        <li>
          <Link
            to='/'
            className={
              location.pathname === '/' ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            🏠 Home
          </Link>
        </li>

        {/* Categories */}
        {Object.keys(categories).map((cat) => (
          <li key={cat}>
            {/* Category toggle row */}
            <div className='sidebar-category' onClick={() => toggle(cat)}>
              <span>{openCategory === cat ? '▼' : '▶'}</span>
              <span className='category-name'>{cat}</span>
            </div>

            {/* Show questions inside this category */}
            {openCategory === cat && (
              <ul className='question-sublist'>
                {categories[cat].map((question) => (
                  <li key={question}>
                    <Link
                      to={`/category/${cat}/${question}`}
                      className={
                        location.pathname === `/category/${cat}/${question}`
                          ? 'sidebar-sublink active'
                          : 'sidebar-sublink'
                      }
                    >
                      • {question}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
