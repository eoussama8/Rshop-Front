import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}