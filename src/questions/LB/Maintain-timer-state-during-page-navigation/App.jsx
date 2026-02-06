import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Wrapper */}
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
