import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const modules = import.meta.glob('../questions/*/*/App.jsx');

export default function Home() {
  const categories = new Set();

  Object.keys(modules).forEach((path) => {
    const parts = path.split('/');
    const category = parts[2]; // akshay-saini, roadside-coder, etc.
    categories.add(category);
  });

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Categories</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...categories].map((cat) => (
          <Link key={cat} to={`/category/${cat}`}>
            <Card className='hover:shadow-lg transition cursor-pointer'>
              <CardHeader>
                <CardTitle className='capitalize'>{cat}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
