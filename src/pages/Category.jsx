import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold capitalize'>{categoryName}</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {questions.map((q) => (
          <Link key={q} to={`/category/${categoryName}/${q}`}>
            <Card className='hover:shadow-lg transition cursor-pointer'>
              <CardHeader>
                <CardTitle className='capitalize'>{q}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
