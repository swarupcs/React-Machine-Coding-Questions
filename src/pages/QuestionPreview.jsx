import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const modules = import.meta.glob('../questions/*/*/App.jsx');

export default function QuestionPreview() {
  const { categoryName, questionName } = useParams();
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const modulePath = `../questions/${categoryName}/${questionName}/App.jsx`;

    if (modules[modulePath]) {
      modules[modulePath]().then((mod) => {
        setComponent(() => mod.default);
      });
    } else {
      setComponent(() => () => <h2>Not found</h2>);
    }
  }, [categoryName, questionName]);

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold capitalize'>
        {categoryName} → {questionName}
      </h1>

      <Card>
        <CardContent className='p-4'>
          {!Component ? (
            <div className='flex items-center gap-2'>
              <Loader2 className='animate-spin' />
              Loading...
            </div>
          ) : (
            <Component />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
