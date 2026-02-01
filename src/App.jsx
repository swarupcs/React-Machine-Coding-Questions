import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import QuestionPreview from './pages/QuestionPreview';
import OverLappingCircleApp from './questions/Frontend-Masters/Overlapping-Circle/App';
import PopOverApp from './questions/Frontend-Masters/Popover/App';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main app routes with layout */}
        <Route
          path='/*'
          element={
            <MainLayout>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/category/:categoryName' element={<Category />} />
                <Route
                  path='/category/:categoryName/:questionName'
                  element={<QuestionPreview />}
                />
              </Routes>
            </MainLayout>
          }
        />

        {/* Standalone routes without layout */}
        <Route path='/overlapping-circles' element={<OverLappingCircleApp />} />
        <Route path='/popover' element={<PopOverApp />} />
      </Routes>
    </BrowserRouter>
  );
}
