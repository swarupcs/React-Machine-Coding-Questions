import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './QuestionPreview.css'; // <-- new CSS file
import ShadowWrapper from '../components/ShadowWrapper';
import IframeSandbox from '../components/IframeSandbox';

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
    <div className='qp-container'>
      <h1 className='qp-title'>
        {categoryName} → {questionName}
      </h1>

      <div className='qp-card'>
        <div className='qp-content'>
          <div className='qp-isolate'>
            {!Component ? (
              <div className='qp-loading'>
                <div className='qp-spinner'></div>
                Loading...
              </div>
            ) : (
              // <IframeSandbox>
                <Component />
              // </IframeSandbox>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
