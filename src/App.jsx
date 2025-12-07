import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import QuestionPreview from './pages/QuestionPreview';
import OverLappingCircleApp from './questions/Frontend-Masters/Overlapping-Circle/App';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/category/:categoryName' element={<Category />} />

          <Route
            path='/category/:categoryName/:questionName'
            element={<QuestionPreview />}
          />
          <Route
            path='/overlapping-circles'
            element={<OverLappingCircleApp/>}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
